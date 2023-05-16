const db = require('../db/index')
const moment = require('moment-timezone');
const path = require('path');
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
  
  async doSignature(req, res) {
    const { id } = req.params
    const { img_ttd } = req.files

    const now = moment();

    const formattedDate = now.format('YYYY-MM-DD');
    // Format time for file
    const formattedTime = now.format('HHmmss');
    // Format time for saving to database
    const formattedTimeFull = now.format('HH:mm:ss');
    
    const fullDatetime = formattedDate + " " + formattedTimeFull

    try {
      const relasi_KoTA = await Relasi_KoTA.findOne({
        where: {
          id_relasi: id
        },
        attributes:{
          exclude:['createdAt','updatedAt']
        }
      })

      if (!relasi_KoTA) {
        return res.status(404).send({
          message:'Data relasi kota tidak ditemukan'
        })
      }

      const imagePath = formattedDate + "-" + formattedTime + '-' + img_ttd.name

      const updateQuery = `UPDATE "Relasi_KoTA" SET "status" = true, "img_ttd" = $1, "tgl_ttd"=$2
                           WHERE "id_relasi"= $3 RETURNING *`

      const paramsQuery = [ imagePath, fullDatetime, id ]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
      
        img_ttd.mv(path.resolve('./uploads/img_ttd/', formattedDate + '-' + formattedTime + '-' + img_ttd.name))
        
        return res.status(200).send({
          message: `Do signature berhasil`,
          data: result.rows
        })
      } 

    } catch (error) {
      return res.status(400).send({
        message:error.message
      })
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