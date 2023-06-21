const db = require('../db/index')
const Yudisium = require('../models').Yudisium;


module.exports = {

  async getAllYudisium(req, res) {
    try {
        const yudisium = await Yudisium.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['id_yudisium', 'ASC']
            ]
        })
        
        if (yudisium.length == 0) {
            return res.status(400).send({
                message:'Data yudisium tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data yudisium berhasil',
            data: yudisium
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  
  async getYudisiumById(req, res) {
    const { id } = req.params

    try {
      const yudisium = await Yudisium.findOne({
        where: {
          id_yudisium: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!yudisium) {
        return res.status(404).send({
          message:'Data yudisium tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data yudisium dengan id ${id} berhasil`,
        data: yudisium
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  async getYudisiumByIdKoor(req, res) {
    const { id } = req.params

    try {
      const yudisium = await Yudisium.findAll({
        where: {
          Koordinator_id_user: id
        },
        attributes: {
          exclude:['id']
        },
        order: [
          ['id_yudisium', 'ASC']
        ]
      })

      if (!yudisium) {
        return res.status(404).send({
          message:'Data yudisium tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data yudisium dengan id Koor ${id} berhasil`,
        data: yudisium
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
 
  async addYudisium(req, res) {
    const data = req.body
    const options = {
        fields: ['id_yudisium','nama_yudisium','tgl_yudisium','Koordinator_id_user'],
        returning:false
    }
    try {
        await Yudisium.create(data,options)
        const selectYudisium = await Yudisium.findOne({
            where: {
                id_yudisium: req.body.id_yudisium,
            },
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).send({
            message:'add new yudisium berhasil',
            data: selectYudisium
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateYudisium(req, res) {
    const { id } = req.params
    const { id_yudisium,  nama_yudisium, tgl_yudisium, Koordinator_id_user } = req.body

    try {
      const yudisium = await Yudisium.findOne({
        where: {
          id_yudisium: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!yudisium) {
        return res.status(404).send({
          message:'Data yudisium tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Yudisium" SET "id_yudisium" = $1, "nama_yudisium"=$2, "tgl_yudisium"=$3,
                           "Koordinator_id_user"=$4
                           WHERE "id_yudisium"= $5 RETURNING *`

      const paramsQuery = [ id_yudisium, nama_yudisium, tgl_yudisium,Koordinator_id_user, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data yudisium dengan id yudisium ${id} berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  
  async deleteYudisium(req, res) {
    const { id } = req.params
   
    try {
      const yudisium = await Yudisium.findOne({
        where: {
          id_yudisium: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!yudisium) {
        return res.status(404).send({
          message:'Data yudisium tidak ditemukan'
        })
      }

      await Yudisium.destroy({
        where: {
          id_yudisium:id
        }
      })
   
      return res.status(200).send({
        message:`Data yudisium dengan id ${id} berhasil dihapus`
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },



};