const db = require('../db/index')
const Jurusan = require('../models').Jurusan;


module.exports = {
  async getAllJurusan(req, res) {
    try {
        const jurusan = await Jurusan.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['id_jurusan', 'ASC']
            ]
        })
        
        if (jurusan.length == 0) {
            return res.status(400).send({
                message:'Data jurusan tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data jurusan berhasil',
            data: jurusan
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  
  async getJurusanById(req, res) {
    const { id } = req.params

    try {
      const jurusan = await Jurusan.findOne({
        where: {
          id_jurusan: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!jurusan) {
        return res.status(404).send({
          message:'Data jurusan tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data jurusan dengan id ${id} berhasil`,
        data: jurusan
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
  async addJurusan(req, res) {
    const data = req.body
    const options = {
        fields: ['id_jurusan','NIP','nama_jurusan'],
        returning:false
    }
    try {
        await Jurusan.create(data,options)
        const selectJurusan = await Jurusan.findOne({
            where: {
                id_jurusan: req.body.id_jurusan,
            },
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).send({
            message:'add new Dosen berhasil',
            data: selectJurusan
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateJurusan(req, res) {
    const { id } = req.params
    const { id_jurusan, NIP, nama_jurusan, } = req.body

    try {
      const jurusan = await Jurusan.findOne({
        where: {
          id_jurusan: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!jurusan) {
        return res.status(404).send({
          message:'Data jurusan tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Jurusan" SET "id_jurusan" = $1, "NIP" = $2, "nama_jurusan"=$3
                           WHERE "id_jurusan"= $4 RETURNING *`

      const paramsQuery = [ id_jurusan, NIP, nama_jurusan, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data jurusan dengan id jurusan berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

 
  async deleteJurusan(req, res) {
    const { id } = req.params

    try {
      const jurusan = await Jurusan.findOne({
        where: {
          id_jurusan: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!jurusan) {
        return res.status(404).send({
          message:'Data jurusan tidak ditemukan'
        })
      }

      await Jurusan.destroy({
        where: {
          id_jurusan:id
        }
      })
   
      return res.status(200).send({
        message:`Data jurusan dengan id ${id} berhasil dihapus`,
        data: jurusan
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },



};