const db = require('../db/index')
const Jabatan = require('../models').Jabatan;


module.exports = {
  async getAllJabatan(req, res) {
    try {
        const jabatan = await Jabatan.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['id_jabatan', 'ASC']
            ]
        })
        
        if (jabatan.length == 0) {
            return res.status(400).send({
                message:'Data jabatan tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data jabatan berhasil',
            data: jabatan
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  
  async getJabatanById(req, res) {
    const { id } = req.params

    try {
      const jabatan = await Jabatan.findOne({
        where: {
          id_jabatan: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!jabatan) {
        return res.status(404).send({
          message:'Data jabatan tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data jabatan dengan id ${id} berhasil`,
        data: jabatan
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
  async addJabatan(req, res) {
    const data = req.body
    const options = {
        fields: ['id_jabatan','Dosen_id_user','nama_jabatan'],
        returning:false
    }
    try {
        await Jabatan.create(data,options)
        const selectJabatan = await Jabatan.findOne({
            where: {
                id_jabatan: req.body.id_jabatan,
            },
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).send({
            message:'add new Jabatan berhasil',
            data: selectJabatan
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateJabatan(req, res) {
    const { id } = req.params
    const { id_jabatan, Dosen_id_user, nama_jabatan, } = req.body

    try {
      const jabatan = await Jabatan.findOne({
        where: {
          id_jabatan: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!jabatan) {
        return res.status(404).send({
          message:'Data jabatan tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Jabatan" SET "id_jabatan" = $1, "Dosen_id_user" = $2, "nama_jabatan"=$3
                           WHERE "id_jabatan"= $4 RETURNING *`

      const paramsQuery = [ id_jabatan, Dosen_id_user, nama_jabatan, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data jabatan dengan id jabatan berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

 
  async deleteJabatan(req, res) {
    const { id } = req.params

    try {
      const jabatan = await Jabatan.findOne({
        where: {
          id_jabatan: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!jabatan) {
        return res.status(404).send({
          message:'Data jabatan tidak ditemukan'
        })
      }

      await Jabatan.destroy({
        where: {
          id_jabatan:id
        }
      })
   
      return res.status(200).send({
        message:`Data jabatan dengan id ${id} berhasil dihapus`,
        data: jabatan
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },



};