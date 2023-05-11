const db = require('../db/index')
const { Op } = require("sequelize");
const KoTA = require('../models').KoTA;
const User = require('../models').User;
const Mahasiswa = require('../models').Mahasiswa;
const Laporan = require('../models').Laporan;



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
        data: kota
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
      const laporan = await Laporan.findOne({
        where: {
          id_KoTA: id
        },
        attributes: {
          exclude: ['id']
        }
      })

      
      if (!laporan) {
        return res.status(404).send({
          message:'Data Laporan tidak ditemukan'
        })
      }
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
    const id_user = kota.id_user
    const id_laporan = laporan.id_laporan
    // select mahasiswa

    const selectQuery = ` SELECT m."NIM", k."id_user" FROM "Mahasiswa" as m
                        JOIN "KoTA" as k ON m."id_KoTA" = k."id_KoTA" WHERE k."id_user" = $1`
    const paramsQuery = [id_user]
    const result = await db.query(selectQuery, paramsQuery)

    const nimArray = result.rows.map((item)=>{
      return item.NIM;
    })
    

    // update mahasiswa kota to null  
    const update = await Mahasiswa.update({
      id_KoTA : null,
      isKetua : false
      }, {
        where: {
          id_KoTA: id,
          NIM: nimArray
        }
      }
    )
    // update mahasiswa kota to null  
    const updateLaporan = await Laporan.update({
      id_KoTA : null,
      }, {
        where: {
          id_laporan: id_laporan
      
        }
      }
    )

      await KoTA.destroy({
        where: {
          id_KoTA:id
        }
      })

      
    await User.destroy({
      where: {
        id_user: id_user
      }
    })

      
   
      return res.status(200).send({
        message:`Data KoTA dengan id ${id} berhasil dihapus`,
        data: update, updateLaporan,
        id_laporan: id_laporan
        
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },



};