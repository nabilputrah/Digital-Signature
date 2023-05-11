const db = require('../db/index')
const Mahasiswa = require('../models').Mahasiswa;
const csv = require('csv-parser');
const fs = require('fs');

module.exports = {
  async getAllMahasiswaByKoTA(req, res) {
    const {id} = req.params
    try {
        const mahasiswa = await Mahasiswa.findAll({
            where:{
              id_KoTA: id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['NIM', 'ASC']
            ]
        })
        
        if (mahasiswa.length == 0) {
            return res.status(400).send({
                message:'Data mahasiswa tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data mahasiswa berhasil',
            data: mahasiswa
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   
  },
  async getAllMahasiswa(req, res) {
    try {
        const mahasiswa = await Mahasiswa.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['NIM', 'ASC']
            ]
        })
        
        if (mahasiswa.length == 0) {
            return res.status(400).send({
                message:'Data mahasiswa tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data mahasiswa berhasil',
            data: mahasiswa
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   
  },
  async getAllMahasiswaNullKoTAD4(req, res) {
    try {
        const mahasiswa = await Mahasiswa.findAll({
            where:{
              id_KoTA:null,
              id_prodi:'PRD001'
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['NIM', 'ASC']
            ]
        })
        
        if (mahasiswa.length == 0) {
            return res.status(400).send({
                message:'Data mahasiswa tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data mahasiswa berhasil',
            data: mahasiswa
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  async getAllMahasiswaNullKoTAD3(req, res) {
    try {
        const mahasiswa = await Mahasiswa.findAll({
            where:{
              id_KoTA:null,
              id_prodi:'PRD002'
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['NIM', 'ASC']
            ]
        })
        
        if (mahasiswa.length == 0) {
            return res.status(400).send({
                message:'Data mahasiswa tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data mahasiswa berhasil',
            data: mahasiswa
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  
  async getMahasiswaById(req, res) {
    const { id } = req.params

    try {
      const mahasiswa = await Mahasiswa.findOne({
        where: {
          NIM: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!mahasiswa) {
        return res.status(404).send({
          message:'Data mahasiswa tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data mahasiswa dengan id ${id} berhasil`,
        data: mahasiswa
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
 
  async addMahasiswa(req, res) {
    const data = req.body
    const options = {
        fields: ['NIM','id_KoTA','id_prodi','nama','email','isKetua'],
        returning:false
    }
    try {
        await Mahasiswa.create(data,options)
        const selectMahasiswa = await Mahasiswa.findOne({
            where: {
                NIM: req.body.NIM,
            },
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).send({
            message:'add new Mahasiswa berhasil',
            data: selectMahasiswa
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateMahasiswa(req, res) {
    const { id } = req.params
    const { NIM, id_KoTA, nama, email, isKetua} = req.body

    try {
      const mahasiswa = await Mahasiswa.findOne({
        where: {
          NIM: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!mahasiswa) {
        return res.status(404).send({
          message:'Data mahasiswa tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Mahasiswa" SET "NIM" = $1, "id_KoTA" = $2, "nama"=$3,
                           "email"=$4, "isKetua"=$5 
                           WHERE "NIM"= $6 RETURNING *`

      const paramsQuery = [ NIM, id_KoTA, nama, email, isKetua, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data mahasiswa dengan id mahasiswa ${id} berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  async updateMahasiswaStatusKoTA(req, res) {
    const { id } = req.params
    const { id_KoTA, isKetua} = req.body

    try {
      const mahasiswa = await Mahasiswa.findOne({
        where: {
          NIM: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!mahasiswa) {
        return res.status(404).send({
          message:'Data mahasiswa tidak ditemukan'
        })
      }

      const updateQuery = `UPDATE "Mahasiswa" SET "id_KoTA" = $1,"isKetua"=$2 
                           WHERE "NIM"= $3 RETURNING *`

      const paramsQuery = [ id_KoTA, isKetua, id]

      const result = await db.query(updateQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `Update data mahasiswa status dan id KoTA dengan id mahasiswa ${id} berhasil`,
          data: result.rows
        })
      } 
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  
  async deleteMahasiswa(req, res) {
    const { id } = req.params
   
    try {
      const mahasiswa = await Mahasiswa.findOne({
        where: {
          NIM: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!mahasiswa) {
        return res.status(404).send({
          message:'Data mahasiswa tidak ditemukan'
        })
      }

      await Mahasiswa.destroy({
        where: {
          NIM:id
        }
      })
   
      return res.status(200).send({
        message:`Data mahasiswa dengan id ${id} berhasil dihapus`
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async importMahasiswaD4(req,res) {
    fs.createReadStream('./CSV/D4Mahasiswa.csv')
    .pipe(csv())
    .on('data', async (row) => {
      try {
        // Menggunakan method insertOrUpdate untuk menghindari duplikasi data
        await Mahasiswa.upsert({
          NIM: row.nim,
          nama: row.nama,
          email: row.email,
          id_KoTA: null,
          id_prodi:row.id_prodi,
          isKetua: false
        });
      
      } catch (err) {
        console.error(err);
      }
    })
    .on('end', () => {
      return res.status(200).send({
        message: 'data berhasil diimpor ke database '
      })
    });
  },

  async importMahasiswaD3(req,res) {
    fs.createReadStream('./CSV/D3Mahasiswa.csv')
    .pipe(csv())
    .on('data', async (row) => {
      try {
        // Menggunakan method insertOrUpdate untuk menghindari duplikasi data
        await Mahasiswa.upsert({
          NIM: row.nim,
          nama: row.nama,
          email: row.email,
          id_KoTA: null,
          id_prodi:row.id_prodi,
          isKetua: false
        });
      
      } catch (err) {
        console.error(err);
      }
    })
    .on('end', () => {
      return res.status(200).send({
        message: 'data berhasil diimpor ke database '
      })
    });
  },



};