const db = require('../db/index')
const SecretKey = require('../models').Secret_Key;


module.exports = {
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



};