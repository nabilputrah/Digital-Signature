const db = require('../db/index')
const KoTA = require('../models').KoTA;


module.exports = {
  async getAllKoTA(req, res) {
    try {
        const kota = await KoTA.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['id_KoTA', 'ASC']
            ]
        })
        
        if (kota.length == 0) {
            return res.status(400).send({
                message:'Data KoTA tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data KoTA berhasil',
            data: kota
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  
  async getKoTAById(req, res) {
    const { id } = req.params

    try {
      const kota = await KoTA.findOne({
        where: {
          id_KoTA: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!kota) {
        return res.status(404).send({
          message:'Data KoTA tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data KoTA dengan id ${id} berhasil`,
        data: KoTA
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
 
  async addKoTA(req, res) {
    const data = req.body
    const options = {
        fields: ['id_KoTA', 'id_prodi', 'id_user', 'tahun_ajaran', 'nama_KoTA', 'jumlah_pembimbing', 'jumlah_penguji'],
        returning:false
    }
    try {
        await KoTA.create(data,options)
        const selectKoTA = await KoTA.findOne({
            where: {
                id_KoTA: req.body.id_KoTA,
            },
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).send({
            message:'add new KoTA berhasil',
            data: selectKoTA
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateKoTA(req, res) {
    // fields: ['id_KoTA', 'id_prodi', 'id_user', 'tahun_ajaran', 'nama_KoTA', 'jumlah_pembimbing', 'jumlah_penguji']
    const { id } = req.params
    const { id_KoTA, id_prodi, id_user, tahun_ajaran, nama_KoTA, jumlah_pembimbing, jumlah_penguji } = req.body

    try {
      const kota = await KoTA.findOne({
        where: {
          id_KoTA: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!kota) {
        return res.status(404).send({
          message:'Data KoTA tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "KoTA" SET "id_KoTA" = $1, "id_prodi" = $2, "id_user"=$3,
                           "tahun_ajaran"=$4, "nama_KoTA"=$5, "jumlah_pembimbing"=$6, "jumlah_penguji"=$7 
                           WHERE "id_KoTA"= $8 RETURNING *`

      const paramsQuery = [ id_KoTA, id_prodi, id_user, tahun_ajaran, nama_KoTA, jumlah_pembimbing, jumlah_penguji, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data KoTA dengan id KoTA ${id} berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  
  async deleteKoTA(req, res) {
    const { id } = req.params
   
    try {
      const kota = await KoTA.findOne({
        where: {
          id_KoTA: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!kota) {
        return res.status(404).send({
          message:'Data KoTA tidak ditemukan'
        })
      }

      await KoTA.destroy({
        where: {
          id_KoTA:id
        }
      })
   
      return res.status(200).send({
        message:`Data KoTA dengan id ${id} berhasil dihapus`
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },



};