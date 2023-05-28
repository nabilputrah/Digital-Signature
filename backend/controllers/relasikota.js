const db = require('../db/index')
const moment = require('moment-timezone');
const path = require('path');
const fs = require("fs");
const Relasi_KoTA = require('../models').Relasi_KoTA;


moment.tz.setDefault('Asia/Jakarta');

module.exports = {
  async getAllRelasiKoTAByPemKoTA(req, res) {
    const { id } = req.params
    try {
       const updateQuery = `SELECT r."id_KoTA", r."NIP", r."role", r."role", r."urutan", d."nama"
                            FROM "Relasi_KoTA" as r
                            JOIN "Dosen" as d ON d."NIP" = r."NIP"
                            WHERE r."id_KoTA" = $1 AND r."role" = 'Pembimbing' 
                            ORDER BY r."urutan" ASC `

      const paramsQuery = [ id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Tampil succes`,
          data: result.rows
        })
      } 
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   
},

  async getRelasiPerKoTA(req, res) {
    const { id } = req.params

    try {
      const selectQuery = `SELECT r."NIP",r."tgl_ttd",r."role", r."status", r."urutan", d."nama" FROM "Relasi_KoTA" as r
                              JOIN "Dosen" as d ON d."NIP" = r."NIP" 
                              WHERE r."id_KoTA" = $1 
                              ORDER BY r."role" ASC
                          `
      const paramsQuery = [id]

      const result = await db.query(selectQuery,paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Tampil succes`,
          data: result.rows
        })
      } 
    } catch (error) {
      
    }
  },

  async getAllRelasiKoTAByPenKoTA(req, res) {
    const { id } = req.params
    try {
       const updateQuery = `SELECT r."id_KoTA", r."NIP", r."role", r."role", r."urutan", d."nama"
                            FROM "Relasi_KoTA" as r
                            JOIN "Dosen" as d ON d."NIP" = r."NIP"
                            WHERE r."id_KoTA" = $1 AND r."role" = 'Penguji' 
                            ORDER BY r."urutan" ASC `

      const paramsQuery = [ id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Tampil succes`,
          data: result.rows
        })
      } 
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   
},
  async getAllRelasiKoTA(req, res) {
    try {
        const relasi_KoTA = await Relasi_KoTA.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['id_relasi', 'ASC']
            ]
        })
        
        if (relasi_KoTA.length == 0) {
            return res.status(400).send({
                message:'Data relasi_KoTA tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data relasi_KoTA berhasil',
            data: relasi_KoTA
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },

  async getAllRelasiByNIP(req, res) {
    const { id } = req.params

    try {
      const selectQuery = `SELECT r.role, r.urutan, r.status, l."judul_TA", l."id_KoTA",r."NIP" FROM "Relasi_KoTA" as r
                          JOIN "Laporan" as l
                          ON r."id_KoTA" = l."id_KoTA"
                          WHERE r."NIP" = $1`
      const paramsQuery = [id]

      const result = await db.query(selectQuery,paramsQuery)

      
      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Tampil succes`,
          data: result.rows
        })
      } 
  
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  
  async getRelasiKoTAById(req, res) {
    const { id } = req.params

    try {
      const relasi_KoTA = await Relasi_KoTA.findOne({
        where: {
          id_relasi: id
        },
        attributes: {
          exclude:['id','createdAt','updatedAt']
        }
      })

      if (!relasi_KoTA) {
        return res.status(404).send({
          message:'Data relasi_KoTA tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data relasi_KoTA dengan id ${id} berhasil`,
        data: relasi_KoTA
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
 
  async addRelasiKoTA(req, res) {
    const data = req.body
    const options = {
        fields: ['id_KoTA','NIP','role','urutan'],
        returning:true
    }
    try {
        const relasi = await Relasi_KoTA.create(data,options)
        return res.status(200).send({
            message:'add new Relasi_KoTA berhasil',
            data: relasi
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateRelasiKoTA(req, res) {
    const { id } = req.params
    const { id_KoTA, NIP, role, urutan} = req.body

    try {
      const relasi_KoTA = await Relasi_KoTA.findOne({
        where: {
          id_relasi : id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!relasi_KoTA) {
        return res.status(404).send({
          message:'Data relasi_KoTA tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Relasi_KoTA" SET "id_KoTA" = $1, "NIP" = $2, "role"=$3,
                           "urutan"=$4, "isKetua"=$5 
                           WHERE "id_relasi"= $6 RETURNING *`

      const paramsQuery = [ id_KoTA, NIP, role, urutan, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data relasi_KoTA dengan id relasi_KoTA ${id} berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  // async doSignatureDosen(req, res){
  //   const  { img_ttd } = req.files
  //   const  { NIP, role, id_KoTA} = req.body

  //   const now = moment()
  //   const formattedDate = now.format('YYYY-MM-DD')
  //   const formattedTimeFull = now.format('HH:mm:ss')
  //   const fullDatetime = formattedDate + " " + formattedTimeFull

  //   const base64Image = img_ttd.toString('base64');

  //   try {
  //     const relasi  = await Relasi_KoTA.findOne({
  //       where: {
  //         NIP: NIP,
  //         role: role,
  //         id_KoTA: id_KoTA
  //       },
  //       attributes:{
  //         exclude:['createdAt','updatedAt','id']
  //       }
  //     })

  //     if(!relasi) {
  //       return res.status(404).send({
  //         message: 'data relasi tidak ditemukan'
  //       })
  //     }
      

  //     const updateQuery = `UPDATE "Relasi_KoTA" SET "status" = true, "img_ttd" = $1, "tgl_ttd"=$2
  //                          WHERE "id_relasi"= $3 RETURNING *
  //                         `
  //     const paramsQuery = [base64Image, fullDatetime, relasi.id_relasi]

  //     const resultQuery = await db.query(updateQuery, paramsQuery)

  //     if (Object.keys(resultQuery).length > 0) {
  
  //         return res.status(200).send({
  //           message: `Do signature berhasil`,
  //           data: resultQuery.rows
  //         })
  //       } 

  //   } catch (error) {
  //     return res.status(400).send({
  //       message: error.message
  //     })
  //   }
  // },

  async doSignatureDosen(req, res){
    const  { img_ttd } = req.files
    const  { NIP, role, id_KoTA} = req.body

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Tidak ada file yang diunggah" });
    }

    const now = moment()
    const formattedDate = now.format('YYYY-MM-DD')
    const formattedTimeFull = now.format('HH:mm:ss')
    // const formattedTimeNotFull = now.format('HH:mm:ss')
    const fullDatetime = formattedDate + " " + formattedTimeFull

    const urlImage = './uploads/img_ttd/' + id_KoTA +'/' + role + '_' + NIP + path.extname(img_ttd.name)
    // const base64Image = img_ttd.toString('base64');

    try {
      const relasi  = await Relasi_KoTA.findOne({
        where: {
          NIP: NIP,
          role: role,
          id_KoTA: id_KoTA
        },
        attributes:{
          exclude:['createdAt','updatedAt','id']
        }
      })

      if(!relasi) {
        return res.status(404).send({
          message: 'data relasi tidak ditemukan'
        })
      }
      
      const uploadDir = path.resolve('./uploads/img_ttd/' + id_KoTA +'/')
  // Membuat direktori jika belum ada
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      img_ttd.mv(path.resolve('./uploads/img_ttd/' + id_KoTA +'/', role + '_' + NIP + path.extname(img_ttd.name)))
    

      const updateQuery = `UPDATE "Relasi_KoTA" SET "status" = true, "img_ttd" = $1, "tgl_ttd"=$2
                           WHERE "id_relasi"= $3 RETURNING *
                          `
      const paramsQuery = [urlImage, fullDatetime, relasi.id_relasi]

      const resultQuery = await db.query(updateQuery, paramsQuery)

      if (Object.keys(resultQuery).length > 0) {
               return res.status(200).send({
            message: `Do signature berhasil`,
            data: resultQuery.rows
          })
        } 

    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async getAccessTTD(req, res){
    const {  role, id_KoTA } = req.params;

    try {
      if (role==='Kaprodi') {
         const selectQuery = ` SELECT R."status" FROM "Relasi_KoTA" as R
                               WHERE R."id_KoTA" = $1 AND 
                               (R."role" = 'Pembimbing' OR R."role"= 'Penguji' ) AND
                               R."status" = false 
                              `
                            
         const paramsQuery = [id_KoTA]
   
         const resultQuery = await db.query(selectQuery, paramsQuery)
   
         if (Object.keys(resultQuery).length > 0) {

              return res.status(200).send({
                message: `Get data false untuk kaprodi ttd berhasil`,
                data: resultQuery.rows.length
          })
        } 
      }

      else if (role==='Kajur') {
        //  const selectQuery = ` SELECT R."status" FROM "Relasi_KoTA" as R
        //                        WHERE R."id_KoTA" = $1 AND 
        //                        R."role" = 'Kaprodi' AND
        //                        R."status" = false
        //                       `

        const selectQuery = ` SELECT R."status" FROM "Relasi_KoTA" as R
                               WHERE R."id_KoTA" = $1 AND 
                               (R."role" = 'Pembimbing' OR R."role"= 'Penguji' OR R."role" = 'Kaprodi') AND
                               R."status" = false 
                              `
                            
         const paramsQuery = [id_KoTA]
   
         const resultQuery = await db.query(selectQuery, paramsQuery)
   
         if (Object.keys(resultQuery).length > 0) {

              return res.status(200).send({
                message: `Get data false untuk kajur ttd berhasil`,
                data: resultQuery.rows.length
          })
        } 
      }
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async getTglTTDRelasi(req, res) {
    const { NIP, role, id_KoTA } = req.params;
  
    try {
      const relasi = await Relasi_KoTA.findOne({
        where: {
          NIP: NIP,
          role: role,
          id_KoTA: id_KoTA
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id']
        }
      });
  
      if (!relasi) {
        return res.status(404).send({
          message: 'Data relasi tidak ditemukan'
        });
      }
      
      return res.status(200).send({
        message:'get tgl ttd berhasil',
        data: relasi.tgl_ttd
      })

    } catch (error) {
      return res.status(400).send({
        message: error.message
      });
    }
  },

  async getGambarTTDRelasi(req, res) {
    const { NIP, role, id_KoTA } = req.params;
  
    try {
      const relasi = await Relasi_KoTA.findOne({
        where: {
          NIP: NIP,
          role: role,
          id_KoTA: id_KoTA
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id']
        }
      });
  
      if (!relasi) {
        return res.status(404).send({
          message: 'Data relasi tidak ditemukan'
        });
      }
      
      const imagePath = path.resolve(relasi.img_ttd)
      res.sendFile(imagePath)
      
    } catch (error) {
      return res.status(200).send({
        data:'no image',
        message: error.message
      });
    }
  },

  async deleteRelasiKoTA(req, res) {
    const { id } = req.params
   
    try {
      const relasi_KoTA = await Relasi_KoTA.findOne({
        where: {
          id_relasi: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!relasi_KoTA) {
        return res.status(404).send({
          message:'Data relasi_KoTA tidak ditemukan'
        })
      }

      await Relasi_KoTA.destroy({
        where: {
          id_relasi:id
        }
      })
   
      return res.status(200).send({
        message:`Data relasi_KoTA dengan id ${id} berhasil dihapus`
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },



};