const User = require('../models').User;
const Dosen = require('../models').Dosen;
const KoTA = require('../models').KoTA;
const Koordinator = require('../models').Koordinator;
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/index')

// const NodeRSA = require('node-rsa');


const secret ='secret'



module.exports = {

  verifyTokenAndRoleKoordinator(req, res, next) {
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
    
    const { username, nama, email} = req.body
    const password = "Dosen" + username.substring(0, 4) +username.substring(username.length - 4)
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

  async signUpUserKoorD4(req, res) {
    const { username, nama, tahun_ajaran} = req.body
    const password = tahun_ajaran.substring(0, 4) + username + tahun_ajaran.substring(tahun_ajaran.length - 4)
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
        role: 'Koordinator'
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

      // insert data Koor 

      const optionsKoor = {
        fields:['id_koor', 'id_user', 'id_prodi', 'nama_koordinator', 'tahun_ajaran'],
        returning: true
      }

      const koordinator = await Koordinator.create({
        id_koor: username,
        id_user: user.id_user,
        id_prodi: 'PRD001',
        nama_koordinator: nama,
        tahun_ajaran: tahun_ajaran
      }, optionsKoor)

      return res.status(200).send({
        message: 'add koordinator d4 with user success',
        data: koordinator
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async signUpUserKoTA(req, res) {
    
    
    const { username, nama_KoTA, tahun_ajaran, id_prodi, jumlah_pembimbing, jumlah_penguji } = req.body

    const password = "KoTA"+ username + jumlah_pembimbing + jumlah_penguji
    const hashPasword = await bcrypt.hash(password, 10)
    
    const optionsUser = {
      fields: ['username', 'password', 'role'],
      returning: false
    }

    try {
      await User.create({
        username: username,
        password: hashPasword,
        role: 'KoTA'
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

       // insert data KoTA 

       const optionsKoTA = {
        fields:['id_KoTA', 'id_prodi', 'id_user','tahun_ajaran','nama_KoTA','jumlah_pembimbing','jumlah_penguji'],
        returning: true
      }

       const kota = await KoTA.create({
        id_KoTA: username,
        id_prodi: id_prodi,
        id_user: user.id_user,
        tahun_ajaran: tahun_ajaran,
        nama_KoTA: nama_KoTA,
        jumlah_pembimbing: jumlah_pembimbing,
        jumlah_penguji: jumlah_penguji
      }, optionsKoTA)

      // / insert laporan

      // const optionsLaporan = {
      //   fields:['id_laporan', 'id_KoTA', 'private_key', 'public_key'],
      //   returning: true
      // }

      // const laporan = await Laporan.create({
      //   id_laporan: 'Laporan_' + username,
      //   id_KoTA: username,
      //   privateKey: privateKey,
      //   publicKey: publicKey

      // }, optionsLaporan)


      return res.status(200).send({
        message: 'add KoTA with user success',
        data: kota
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
  async checkValidPassword(req, res) {
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

      return res.status(200).send({
        message:'Password Sesuai',
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
      const selectQuery = `SELECT u."id_user", k."nama_koordinator", k."id_koor", k."tahun_ajaran", p."nama_prodi", p."id_prodi"
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
  async getDosenWithUser(req, res) {
    const { id } = req.params

    try {
      const selectQuery = ` SELECT u."id_user", u."password", d."nama", d."NIP", d."email"  
                            FROM "User" as u
                            JOIN "Dosen" as d ON
                            d."id_user" = u."id_user"
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
  async getKoTAWithUser(req, res) {
    const { id } = req.params

    try {
      const selectQuery = ` SELECT u."id_user", u."password", k."nama_KoTA", k."tahun_ajaran",k."id_KoTA" 
                            FROM "User" as u
                            JOIN "KoTA" as k ON
                            k."id_user" = u."id_user"
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
          exclude: ['id','createdAt','updatedAt']
        }
      })

      if (!user) {
        return res.status(404).send({
          message: 'data tidak ditemukan'
        })
      }
      const currentPassword = req.body.currentPassword

      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if (!isMatch) {
        return res.status(400).send({
          message: 'current password salah'
        })
      }

      const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10)
      await User.update({
       password: hashedNewPassword
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