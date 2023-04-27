const db = require('../db/index')
const Koordinator = require('../models').Koordinator;


module.exports = {
  async getAllKoordinator(req, res) {
    try {
        const koordinator = await Koordinator.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['id_koor', 'ASC']
            ]
        })
        
        if (koordinator.length == 0) {
            return res.status(400).send({
                message:'Data koordinator tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data koordinator berhasil',
            data: koordinator
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  
  async getKoordinatorById(req, res) {
    const { id } = req.params

    try {
      const koordinator = await Koordinator.findOne({
        where: {
          id_koor: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!koordinator) {
        return res.status(404).send({
          message:'Data koordinator tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data koordinator dengan id ${id} berhasil`,
        data: koordinator
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
 
  async addKoordinator(req, res) {
    const data = req.body
    const options = {
        fields: ['id_koor','id_user','id_prodi','nama_koordinator','tahun_ajaran'],
        returning:false
    }
    try {
        await Koordinator.create(data,options)
        const selectKoordinator = await Koordinator.findOne({
            where: {
                id_koor: req.body.id_koor,
            },
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).send({
            message:'add new Koordinator berhasil',
            data: selectKoordinator
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateKoordinator(req, res) {
    const { id } = req.params
    const { id_koor, id_user, id_prodi, nama_koordinator, tahun_ajaran } = req.body

    try {
      const koordinator = await Koordinator.findOne({
        where: {
          id_koor: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!koordinator) {
        return res.status(404).send({
          message:'Data koordinator tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Koordinator" SET "id_koor" = $1, "id_user" = $2, "id_prodi"=$3,
                           "nama_koordinator"=$4, "tahun_ajaran"=$5 
                           WHERE "id_koor"= $6 RETURNING *`

      const paramsQuery = [ id_koor, id_user, id_prodi, nama_koordinator, tahun_ajaran, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data koordinator dengan id koordinator ${id} berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  
  async deleteKoordinator(req, res) {
    const { id } = req.params
   
    try {
      const koordinator = await Koordinator.findOne({
        where: {
          id_koor: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!koordinator) {
        return res.status(404).send({
          message:'Data koordinator tidak ditemukan'
        })
      }

      await Koordinator.destroy({
        where: {
          id_koordinator:id
        }
      })
   
      return res.status(200).send({
        message:`Data koordinator dengan id ${id} berhasil dihapus`
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },



};