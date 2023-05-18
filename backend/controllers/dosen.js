const { sequelize } = require('../models');
const csv = require('csv-parser');
const fs = require('fs');

const bcrypt = require('bcrypt');
const db = require('../db/index')
const Dosen = require('../models').Dosen;
const User = require('../models').User;
// const { Op } = require("sequelize");

module.exports = {
  getAllDosen(req, res) {
    return Dosen
      .findAll({
        attributes: { 
            exclude: ['createdAt', 'updatedAt','id']
           },
        order:[
          ['NIP','ASC']
        ]
      })
      .then((dosen) => {
        if(Object.keys(dosen).length == 0){
          return res.status(400).send({
            message:'data dosen tidak ada'
          })
        }
        return res.status(200).send({
          message:`Get all dosen success`,
          data:dosen
        })
      })
      .catch((error) => { res.status(400).send({
        message:error,
      }); });
  },

  async getDosenByNIP(req, res) {
    try {
      const dosen = await Dosen.findOne({
        where: {
          NIP: req.params.id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!dosen) {
        return res.status(404).send({
          message: 'data dosen tidak ditemukan'
        })
      }

      return res.status(200).send({
        message: `Get data dosen by NIP ${req.params.id} success`,
        data: dosen
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async addDosen(req, res) {
    const data = req.body
    const options = {
        fields: ['NIP','id_user','nama','email'],
        returning:false
    }
    try {
        await Dosen.create(data,options)
        const selectDosen = await Dosen.findOne({
            where: {
                NIP: req.body.NIP,
            },
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).send({
            message:'add new Dosen berhasil',
            data: selectDosen
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateDosen(req, res) {
    const { id } = req.params
    const { NIP, nama, email } = req.body

    try {
      const dosen = await Dosen.findByPk(id)

      if (!dosen) {
        return res.status(404).send({
          message:'Data dosen tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Dosen" SET "NIP" = $1,  nama = $2, email = $3
                           WHERE "NIP" = $4 RETURNING *`

      const paramsQuery = [NIP, nama, email, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data dosen dengan NIP berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  async deleteDosen(req, res) {
    const { id } = req.params

    try {
      const dosen = await Dosen.findByPk(id)

      if (!dosen) {
        return res.status(404).send({
          message: 'Data dosen tidak ditemukan'
        })
      }

      // await dosen.destroy()
      await User.destroy({
        where: {
          id_user: dosen.id_user
        },
        attributes:{
          exclude: ['id']
        }
      })


      return res.status(200).send({
        message: `Data dosen dengan NIP ${id} berhasil dihapus`,
        id_user:dosen.id_user
       
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async importAllDosenWithUser(req,res) {
    fs.createReadStream('./CSV/DataDosen.tsv')
    .pipe(csv({
      separator: '\t'
    }))
    .on('data', async (row) => {
      try {
        let user = ''
        const password = "Dosen" + row.NIP.substring(0, 4) + row.NIP.substring(row.NIP.length - 4)
        const hashPassword = await bcrypt.hash(password, 10)

        const optionsUser = {
          fields: ['username', 'password', 'role'],
          returning: false
        }

        await User.create({
          username: row.NIP,
          password: hashPassword,
          role: 'Dosen'
        }, optionsUser)

         user = await User.findOne({
          where: {
            username: row.NIP
          },
          attributes: {
            exclude: ['id','createdAt','updatedAt']
          }
        })
        // Menggunakan method insertOrUpdate untuk menghindari duplikasi data
        await Dosen.upsert({
          NIP: row.NIP,
          id_user:user.id_user,
          nama: row.nama,
          email: row.email,
        });
      
      } catch (err) {
        console.error(err);
      }
    })
    .on('end', () => {
      return res.status(200).send({
        message: 'data berhasil diimpor ke database '
      })
    });
  },
  

  // async updateDosen(req, res) {
  //   const { id } = req.params
  //   const { NIP } = req.body
  //   try {
  //     const dosen = await Dosen.findOne({
  //       where: {
  //         NIP: id
  //       },
  //       attributes: {
  //         exclude: ['id']
  //       }
  //     })

  //     // kondisi jika data dosen dicari tidak ada
  //     if (!dosen) {
  //       return res.status(404).send({
  //         message:'data dosen tidak ditemukan'
  //       })
  //     }

  //     // cek param NIP dengan body NIP
  //     if (NIP && NIP !== dosen.NIP)  {
  //       const dosenWithNewNIP = await Dosen.findOne({
  //         where: {
  //           NIP : NIP
  //         }
  //       })
  //       // cek jika ganti NIP tetapi NIP sudah digunakan oleh dosen lain
  //       if (dosenWithNewNIP) {
  //         return res.status(400).send({
  //           message:'NIP sudah digunakan'
  //         })
        
  //       // Jika NIP yang akan dirubah belum digunakan dosen lain
  //       } else {
         
  //         await Dosen.destroy({
  //           where: {
  //             NIP: id
  //           }
  //         })
       
  //         const createNewDosen = await Dosen.create(req.body)

  //         return res.status(200).send({
  //           message: `update data dosen dengan mengubah NIP`,
  //           data: createNewDosen
  //         })
  //       }
  //     }

  //     const updateDosen = await dosen.update(req.body)
  //     return res.status(200).send({
  //       message:'update data dosen berhasil',
  //       data: updateDosen
  //     })
  //   } catch (error) {
  //     return res.status(400).send({
  //       message: error.message
  //     })
  //   }
  // },
 


};