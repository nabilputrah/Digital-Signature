const db = require('../db/index')
const SecretKey = require('../models').Secret_Key;
const sss = require('shamirs-secret-sharing')

const nodemailer = require('nodemailer');

require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_USERNAME,
    pass: process.env.AUTH_PASSWORD
  }
});


module.exports = {

  async sendShareKeyToDosen(req, res){
    const { id_laporan, Dosen_id_user, role, KoTA_id_user} = req.body

    try {
      const id_KoTA = id_laporan.substr(8);

      const selectQuery = `SELECT D."nama", D."email", R."id_relasi" FROM "Relasi_KoTA" as R 
                            JOIN "Dosen" as D ON D."id_user" = R."Dosen_id_user"
                            WHERE R."Dosen_id_user" = $1
                            AND R."role" = $2
                            AND R."KoTA_id_user" = $3
                           `
      const paramsQuery =[Dosen_id_user,role,KoTA_id_user]

      const resultRelasi = await db.query(selectQuery,paramsQuery)

      const id_relasi = id_laporan + "_secretkey_" + resultRelasi.rows[0].id_relasi
      const namaDosen = resultRelasi.rows[0].nama
      const emailDosen = resultRelasi.rows[0].email
      
      // Get Secret key by ID
      const selectQueryShare = `SELECT S."secret_key" FROM "Secret_Key" as S 
            WHERE S."id_secret" = $1
            `
      const paramsQueryShare =[id_relasi]

      const resultRelasiShare = await db.query(selectQueryShare,paramsQueryShare)
      // console.log(resultRelasiShare.rows[0].secret_key)
      const shareKey =  resultRelasiShare.rows[0].secret_key
      const formattedNamaKoTA = 'KoTA ' + id_laporan.substr(12, 3)

      
      if (Object.keys(resultRelasiShare).length > 0) {
        res.render('emailShareKey', {role:role, id_KoTA:id_KoTA, username: namaDosen , formattedUKoTA:formattedNamaKoTA , ShareKey:shareKey  }, function (err, renderedHtml) {
          if (err) {
            console.log(err);
          } else {
            const mailOptions = {
              from: 'hello@example.com',
              to: emailDosen,
              subject: 'Share Key Tanda Tangan Laporan Tugas Akhir' + formattedNamaKoTA,
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
  async getOneShareKey(req, res) {
    const { id_laporan, NIP, role} = req.body

    try {
      // Get Id Relasi by NIP and role
      const id_KoTA = id_laporan.substr(8);
      const selectQuery = `SELECT R."id_relasi" FROM "Relasi_KoTA" as R 
                          WHERE R."NIP" = $1
                          AND R."role" = $2
                          AND R."id_KoTA" = $3
                          `
      const paramsQuery =[NIP,role, id_KoTA]

      const resultRelasi = await db.query(selectQuery,paramsQuery)

      const id_relasi = id_laporan + "_secretkey_" + resultRelasi.rows[0].id_relasi
      // Get Secret key by ID
      const selectQueryShare = `SELECT S."secret_key" FROM "Secret_Key" as S 
                          WHERE S."id_secret" = $1
                          `
      const paramsQueryShare =[id_relasi]

      const resultRelasiShare = await db.query(selectQueryShare,paramsQueryShare)
      console.log(resultRelasiShare.rows[0].secret_key)
      return res.status(200).send({
        message: 'sukses',
        data: resultRelasiShare.rows[0].secret_key
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  async createShareKey(req, res) {
    const { id_laporan } = req.body

    try {
      const selectQuery = `SELECT  L."KoTA_id_user", L."private_key" FROM "Laporan" as L 
                          WHERE L."id_laporan" = $1`
      const paramsQuery = [id_laporan]

      const resultGetPrivateKey = await db.query(selectQuery, paramsQuery)
      const KoTA_id_user = resultGetPrivateKey.rows[0].KoTA_id_user
      const privateKey = resultGetPrivateKey.rows[0].private_key
      
      // if (Object.keys(resultGetPrivateKey).length > 0) {
      //   return res.status(200).send({
      //     message: 'sukses',
      //     data: resultGetPrivateKey.rows[0]
      //   })
      // } 

      const selectQueryRelasi = `SELECT R."id_relasi",R."Dosen_id_user" FROM "Relasi_KoTA" as R WHERE R."KoTA_id_user" = $1
                                `
      const paramsQueryRelasi = [KoTA_id_user]                          
      const resultGetDosen = await db.query(selectQueryRelasi,paramsQueryRelasi)

      const jumlahRelasi = resultGetDosen.rows.length
      const dataDosen = resultGetDosen.rows

      const secret = Buffer.from(privateKey)
      const shares = sss.split(secret, { shares: jumlahRelasi, threshold: jumlahRelasi })

      console.log(shares)

      dataDosen.forEach(async (item, index) => {
        const options = {
          fields: ['id_secret','Laporan_id_laporan','Dosen_id_user','secret_key'],
          returning:true
        }

        const secret_key = await SecretKey.create({
          id_secret: id_laporan + "_secretkey_" + item.id_relasi,
          Laporan_id_laporan: id_laporan,
          Dosen_id_user: item.Dosen_id_user,
          secret_key: shares[index].toString('hex')
        },options)

      });

      return res.status(200).send({
        message: 'sukses'
      })

                       
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  async getAllSecretKey(req, res) {
    try {
        const secret_key = await SecretKey.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['id_secret', 'ASC']
            ]
        })
        
        if (secret_key.length == 0) {
            return res.status(400).send({
                message:'Data secret_key tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data secret_key berhasil',
            data: secret_key
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  
  async getSecretKeyById(req, res) {
    const { id } = req.params

    try {
      const secret_key = await SecretKey.findOne({
        where: {
          id_secret: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!secret_key) {
        return res.status(404).send({
          message:'Data secret_key tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data secret_key dengan id ${id} berhasil`,
        data: secret_key
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
 
  async addSecretKey(req, res) {
    const data = req.body
    const options = {
        fields: ['id_secret','id_laporan','NIP','secret_key'],
        returning:true
    }
    try {
        const secret_key = await SecretKey.create(data,options)
        // const selectSecretKey = await SecretKey.findOne({
        //     where: {
        //         id_secret: req.body.id_secret,
        //     },
        //     attributes: {
        //         exclude: ['id']
        //     }
        // })
        return res.status(200).send({
            message:'add new secret_key berhasil',
            data: secret_key
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateSecretKey(req, res) {
    const { id } = req.params
    const { id_secret, id_laporan, NIP, secret_key, } = req.body

    try {
      const secret_key = await SecretKey.findOne({
        where: {
          id_secret: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!secret_key) {
        return res.status(404).send({
          message:'Data secret_key tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Secret_Key" SET "id_secret" = $1, "id_laporan" = $2, "NIP"= $3,
                           "secret_key" = $4 WHERE "id_secret"= $5 RETURNING *`

      const paramsQuery = [ id_secret, id_laporan, NIP, secret_key, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data secret_key dengan id secret_key ${id} berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  
  async deleteSecretKey(req, res) {
    const { id } = req.params
   
    try {
      const secret_key = await SecretKey.findOne({
        where: {
          id_secret: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!secret_key) {
        return res.status(404).send({
          message:'Data secret_key tidak ditemukan'
        })
      }

      await SecretKey.destroy({
        where: {
          id_secret:id
        }
      })
   
      return res.status(200).send({
        message:`Data secret_key dengan id ${id} berhasil dihapus`
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  async deleteSecretKeyByIDLaporan(req, res) {
    const { id } = req.params
   
    try {
      const secret_key = await SecretKey.findAll({
        where: {
          Laporan_id_laporan: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!secret_key) {
        return res.status(404).send({
          message:'Data secret_key tidak ditemukan'
        })
      }

      await SecretKey.destroy({
        where: {
          Laporan_id_laporan:id
        }
      })
   
      return res.status(200).send({
        message:`Data secret_key dengan id laporan ${id} berhasil dihapus`
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },



};