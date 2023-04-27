const db = require('../db/index')
const Prodi = require('../models').Prodi;


module.exports = {
  async getAllProdi(req, res) {
    try {
        const prodi = await Prodi.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['id_prodi', 'ASC']
            ]
        })
        
        if (prodi.length == 0) {
            return res.status(400).send({
                message:'Data prodi tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data prodi berhasil',
            data: prodi
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  
  async getProdiById(req, res) {
    const { id } = req.params

    try {
      const prodi = await Prodi.findOne({
        where: {
          id_prodi: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!prodi) {
        return res.status(404).send({
          message:'Data prodi tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data prodi dengan id ${id} berhasil`,
        data: prodi
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
 
  async addProdi(req, res) {
    const data = req.body
    const options = {
        fields: ['id_prodi','NIP','nama_prodi'],
        returning:false
    }
    try {
        await Prodi.create(data,options)
        const selectProdi = await Prodi.findOne({
            where: {
                id_prodi: req.body.id_prodi,
            },
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).send({
            message:'add new prodi berhasil',
            data: selectProdi
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateProdi(req, res) {
    const { id } = req.params
    const { id_prodi, NIP, nama_prodi, } = req.body

    try {
      const prodi = await Prodi.findOne({
        where: {
          id_prodi: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!prodi) {
        return res.status(404).send({
          message:'Data prodi tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Prodi" SET "id_prodi" = $1, "NIP" = $2, "nama_prodi"=$3
                           WHERE "id_prodi"= $4 RETURNING *`

      const paramsQuery = [ id_prodi, NIP, nama_prodi, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data prodi dengan id prodi ${id} berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  
  async deleteProdi(req, res) {
    const { id } = req.params
   
    try {
      const prodi = await Prodi.findOne({
        where: {
          id_prodi: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!prodi) {
        return res.status(404).send({
          message:'Data prodi tidak ditemukan'
        })
      }

      await Prodi.destroy({
        where: {
          id_prodi:id
        }
      })
   
      return res.status(200).send({
        message:`Data prodi dengan id ${id} berhasil dihapus`
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },



};