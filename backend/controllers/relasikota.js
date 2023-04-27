const db = require('../db/index')
const Relasi_KoTA = require('../models').Relasi_KoTA;


module.exports = {
  async getAllRelasiKoTA(req, res) {
    try {
        const relasi_KoTA = await Relasi_KoTA.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['NIM', 'ASC']
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
  
  async getRelasiKoTAById(req, res) {
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
        returning:false
    }
    try {
        await Relasi_KoTA.create(data,options)
        const selectRelasiKoTA = await Relasi_KoTA.findOne({
            where: {
               data
            },
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).send({
            message:'add new Relasi_KoTA berhasil',
            data: selectRelasiKoTA
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
    // const { id } = req.params
    // const { id_KoTA, NIP, role, urutan} = req.body

    // try {
    //   const relasi_KoTA = await Relasi_KoTA.findOne({
    //     where: {
    //       id_relasi : id
    //     },
    //     attributes: {
    //       exclude:['id']
    //     }
    //   })

    //   if (!relasi_KoTA) {
    //     return res.status(404).send({
    //       message:'Data relasi_KoTA tidak ditemukan'
    //     })
    //   }

    //   const updateQuery = `UPDATE "Relasi_KoTA" SET "id_KoTA" = $1, "NIP" = $2, "role"=$3,
    //                        "urutan"=$4, "isKetua"=$5 
    //                        WHERE "id_relasi"= $6 RETURNING *`

    //   const paramsQuery = [ id_KoTA, NIP, role, urutan, id]

    //   const result = await db.query(updateQuery, paramsQuery)

    //   if (Object.keys(result).length > 0) {
    //     return res.status(200).send({
    //       message: `Update data relasi_KoTA dengan id relasi_KoTA ${id} berhasil`,
    //       data: result.rows
    //     })
    //   } 
    // } catch (error) {
    //   return res.status(400).send({
    //     message: error.message
    //   })
    // }
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