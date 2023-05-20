const { sequelize } = require('../models');
const csv = require('csv-parser');
const XlsxPopulate = require('xlsx-populate');
const fs = require('fs');
const nodemailer = require('nodemailer');


const bcrypt = require('bcrypt');
const db = require('../db/index')
const Dosen = require('../models').Dosen;
const User = require('../models').User;

require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_USERNAME,
    pass: process.env.AUTH_PASSWORD
  }
});
// const { Op } = require("sequelize");

module.exports = {

  async sendEmailAccountDosen(req, res){
    const { id } = req.params

    try {
      const selectQuery = `SELECT D."NIP", D."nama", D."email" FROM "Dosen" as D
                          WHERE D."NIP" = $1
                          ` 
      const paramsQuery = [id]

      const result = await db.query(selectQuery,paramsQuery)
      const dataKoTA = result.rows[0]
      const namaDosen = dataKoTA.nama
      const usernameDosen = dataKoTA.NIP
      const emailDosen = dataKoTA.email
      const passwordDosen = "Dosen" + usernameDosen.substring(0, 4) + usernameDosen.substring(usernameDosen.length - 4)

      if (Object.keys(result).length > 0) {
        res.render('emailAccountDosen', { nama: namaDosen, username: usernameDosen, password: passwordDosen }, function (err, renderedHtml) {
          if (err) {
            console.log(err);
          } else {
            const mailOptions = {
              from: 'hello@example.com',
              to: emailDosen,
              subject: 'Akun D-SIGN JTK Polban',
              html: renderedHtml
            };
        
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                return res.status(200).send({
                  message:'Email terkirim' + info.response
                })
             
              }
            });
          }
        });
        
      } 
      
    } catch (error) {
       return res.status(400).send({
          message: error.message
       })
    }
  },
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

  async importAllDosenWithUser(req, res) {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({
          message: 'File tidak ditemukan'
        });
      }
  
      const file = req.files.file;
  
      const workbook = await XlsxPopulate.fromDataAsync(file.data);
      const sheet = workbook.sheet(0);
  
      const data = sheet.usedRange().value();
  
      for (const row of data) {
        try {
          const password = "Dosen" + row[0].substring(0, 4) + row[0].substring(row[0].length - 4);
          const hashPassword = await bcrypt.hash(password, 10);
  
          const optionsUser = {
            fields: ['username', 'password', 'role'],
            returning: false
          };
  
          const createdUser = await User.create({
            username: row[0],
            password: hashPassword,
            role: 'Dosen'
          }, optionsUser);
  
          const user = await User.findOne({
            where: {
              username: row[0]
            },
            attributes: ['id_user']
          });
  
          await Dosen.upsert({
            NIP: row[0],
            id_user: user.id_user,
            nama: row[1],
            email: row[2]
          });
        } catch (err) {
          console.error(err);
        }
      }
  
      res.status(200).json({
        message: 'Data berhasil diimpor ke database'
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Terjadi kesalahan dalam membaca file Excel'
      });
    }
  }
  
  

  // async importAllDosenWithUser(req,res) {
  //   fs.createReadStream('./CSV/DataDosen.tsv')
  //   .pipe(csv({
  //     separator: '\t'
  //   }))
  //   .on('data', async (row) => {
  //     try {
  //       let user = ''
  //       const password = "Dosen" + row.NIP.substring(0, 4) + row.NIP.substring(row.NIP.length - 4)
  //       const hashPassword = await bcrypt.hash(password, 10)

  //       const optionsUser = {
  //         fields: ['username', 'password', 'role'],
  //         returning: false
  //       }

  //       await User.create({
  //         username: row.NIP,
  //         password: hashPassword,
  //         role: 'Dosen'
  //       }, optionsUser)

  //        user = await User.findOne({
  //         where: {
  //           username: row.NIP
  //         },
  //         attributes: {
  //           exclude: ['id','createdAt','updatedAt']
  //         }
  //       })
  //       // Menggunakan method insertOrUpdate untuk menghindari duplikasi data
  //       await Dosen.upsert({
  //         NIP: row.NIP,
  //         id_user:user.id_user,
  //         nama: row.nama,
  //         email: row.email,
  //       });
      
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   })
  //   .on('end', () => {
  //     return res.status(200).send({
  //       message: 'data berhasil diimpor ke database '
  //     })
  //   });
  // },
  

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