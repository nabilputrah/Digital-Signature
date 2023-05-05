const User = require('../models').User;
const Dosen = require('../models').Dosen;
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/index')
const secret ='secret'



module.exports = {

  verifyTokenAndRole(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
  
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: err.message });
      }

      if (decoded.user.role !=='Koordinator') {

        return res.status(403).send({ message: 'Anda tidak memiliki akses ke endpoint ini.' });
      }
      // req.userId = decoded.id;
      next();
    })
  },
  async signUpUser(req, res) {
    const { username, password, role } = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    const options = {
      fields: ['username', 'password','role'],
      returning:false
    }
    try {
      await User.create({
        username: username,
        password: hashPassword,
        role: role
      }, options)

      const user = await User.findOne({
        where: {
          username: username
        },
        attributes: {
          exclude: ['id','createdAt','updatedAt']
        }
      })

      if (user) {
        return res.status(200).send({
          message: 'signUp new user success',
          data: user
        })
      }
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async signUpUserDosen(req, res) {
    const { username, nama, password, email} = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    const optionsUser = {
      fields: ['username', 'password', 'role'],
      returning: false
    }

    try {
      // insert user 
      await User.create({
        username: username,
        password: hashPassword,
        role: 'Dosen'
      }, optionsUser)

      // select id_user from table user

      const user = await User.findOne({
        where: {
          username: username
        },
        attributes: {
          exclude: ['id','createdAt','updatedAt']
        }
      })

      // insert data dosen 

      const optionsDosen = {
        fields:['NIP', 'id_user', 'nama', 'email'],
        returning: true
      }

      const dosen = await Dosen.create({
        NIP: username,
        id_user: user.id_user,
        nama: nama,
        email: email
      }, optionsDosen)

      return res.status(200).send({
        message: 'add dosen with user success',
        data: dosen
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async loginUser(req, res) {
    const { username, password } = req.body
    
    try {
      const user = await User.findOne({
        where:{
          username
        },
        attributes:{
          exclude:['id','createdAt','updatedAt']
        }
      })

      if (!user) {
        return res.status(404).send({
          message:'Invalid username or password'
        })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return res.status(400).send({
          message: 'Invalid Password'
        })
      }

      const token = jwt.sign({ user }, secret)

      return res.status(200).send({
        message:'Login berhasil',
        token: token
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async getKoordinatorWithProdi(req, res) {
    const { id } = req.params

    try {
      const selectQuery = `SELECT u."id_user", k."nama_koordinator", k."tahun_ajaran", p."nama_prodi"
                           FROM "User" as u
                           JOIN "Koordinator" as k 
                              ON k."id_user" = u."id_user"
                           JOIN "Prodi" as p
                              ON p."id_prodi" = k."id_prodi"
                           WHERE u."id_user" = $1`
      const paramsQuery = [id]
      const result = await db.query(selectQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Get data success`,
          data: result.rows
        })
      }   
      
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },


  // async updateMahasiswa(req, res) {
  //   const { id } = req.params
  //   const { NIM, id_KoTA, nama, email, isKetua} = req.body

  //   try {
  //     const mahasiswa = await Mahasiswa.findOne({
  //       where: {
  //         NIM: id
  //       },
  //       attributes: {
  //         exclude:['id']
  //       }
  //     })

  //     if (!mahasiswa) {
  //       return res.status(404).send({
  //         message:'Data mahasiswa tidak ditemukan'
  //       })
  //     }

  //     const updateQuery = `UPDATE "Mahasiswa" SET "NIM" = $1, "id_KoTA" = $2, "nama"=$3,
  //                          "email"=$4, "isKetua"=$5 
  //                          WHERE "NIM"= $6 RETURNING *`

  //     const paramsQuery = [ NIM, id_KoTA, nama, email, isKetua, id]

  //     const result = await db.query(updateQuery, paramsQuery)

  //     if (Object.keys(result).length > 0) {
  //       return res.status(200).send({
  //         message: `Update data mahasiswa dengan id mahasiswa ${id} berhasil`,
  //         data: result.rows
  //       })
  //     } 
  //   } catch (error) {
  //     return res.status(400).send({
  //       message: error.message
  //     })
  //   }
  // },
  getAllUser(req, res) {
    return User
      .findAll({
        attributes: { 
            exclude: ['createdAt', 'updatedAt','id']
           },
        order:[
          ['id_user','ASC']
        ]
      })
      .then((user) => {
        if(Object.keys(user).length == 0){
          return res.status(400).send({
            message:'data user tidak ada'
          })
        }
        return res.status(200).send({
          message:`Get all user success`,
          data:user
        })
      })
      .catch((error) => { res.status(400).send({
        message:error,
      }); });
  },

  async getUserById(req, res) {
    try{
      const user = await User.findAll({
        attributes:{
          exclude: ['createdAt', 'updatedAt','id']
        },
        where:{
          id_user:req.params.id
        }
      })
      if (user.length === 0){
        return res.status(404).send({
          message:'data tidak ditemukan',
        })
        
      }
      return res.status(200).send({
        message:'success',
        data: user
      })
    }
      catch(error){
        return res.status(400).send({
          message:error.message
        })
    }
  },

  async addUser(req,res) {
    const data = req.body
    const options = {
      fields: ['username', 'password','role'],
      returning:false
    }
    try {
      await User.create(data,options)
      const selectUser = await User.findOne({
        where: {
          username: req.body.username
         },
         attributes: {
           exclude:['id']
         } 
      })
      return res.status(200).send({
        message:"add new user success",
        data: selectUser
  
      })
    } catch (error) {
      return res.status(400).send({
        message:error.message
      })
    }
  },
 
  async updateUser(req, res) {
    try {
      const user = await User.findOne({
        where:{
          id_user: req.params.id
        },
        attributes:{
          exclude:['id']
        }
      })
      if (user.length == 0) {
        return res.status(404).send({
          message:'data tidak ditemukan'
        })
      }

      const findUniqueUsername = await User.findAll({
        where: {
          id_user: {
             [Op.not]: req.params.id
            },
          username: req.body.username,
        },
        attributes:{
          exclude:['id']
        }
      });
      console.log(findUniqueUsername.length);
      //case ketika ubah role saja 
      if ((user.username == req.body.username) && (user.id_user==req.params.id)) {
        const updateUser = await User.update({
        role:req.body.role
      },{
        where: {
          id_user: req.params.id
        }
      })
        return res.status(200).send({
          message:'update data berhasil',
          data:updateUser
        })
      }

      //case ketika ubah username dan role
      else if ((user.username != req.body.username) && (user.id_user==req.params.id) && (findUniqueUsername.length < 1)) {
        const updateUser = await User.update({
        username:req.body.username,
        role:req.body.role
      },{
        where: {
          id_user: req.params.id
        }
      })
        return res.status(200).send({
          message:'update data berhasil',
          data:updateUser
        })
      }
      else {
        return res.status(400).send({
          message:'username sudah digunakan'
        })
      }
      
    } catch (error) {
      return res.status(400).send({
        message:error.message
      })
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOne({
        where: {
          id_user: req.params.id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!user){
        return res.status(404).send({
          message:'data tidak ditemukan'
        })
      }
      await User.destroy({
        where: {
          id_user: req.params.id
        },
        attributes:{
          exclude: ['id']
        }
      })

     
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
     return res.status(200).send({
        message: `data berhasil dihapus denga id user ${req.params.id}`
      })
  },

  async changeUserPassword(req, res) {
    try {
      const user = await User.findOne({
        where: {
          id_user: req.params.id
        },
        attributes: {
          exclude: ['id']
        }
      })

      if (!user) {
        return res.status(404).send({
          message: 'data tidak ditemukan'
        })
      }

      if (user.password != req.body.currentPassword) {
        return res.status(400).send({
          message: 'current password salah'
        })
      }
      await User.update({
       password: req.body.newPassword
      },{
        where: {
          id_user: req.params.id
        }
      })
      return res.status(200).send({
        message:'password berhasil diubah'
      })
    } catch (error) {
      return res.status(400).send({
        message:error.message
      })
    }
  }


};