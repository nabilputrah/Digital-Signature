const User = require('../models').User;
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

      if (decoded.user.role !=='Dosen') {

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