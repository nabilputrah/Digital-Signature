const db = require('../db/index')
const nodemailer = require('nodemailer');
// var express = require('express');
// var app = express();
const Mahasiswa = require('../models').Mahasiswa;
const csv = require('csv-parser');
const fs = require('fs');

require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_USERNAME,
    pass: process.env.AUTH_PASSWORD
  }
});

const XlsxPopulate = require('xlsx-populate');

module.exports = {
  async sendEmailtoKoTA(req, res){
    const { id } = req.params

    try {
      const selectQuery = `SELECT m."email",m."id_KoTA", k."jumlah_pembimbing", k."jumlah_penguji" FROM "Mahasiswa" as m
                        JOIN "KoTA" as k ON m."id_KoTA" = k."id_KoTA"
                        WHERE m."id_KoTA" = $1 AND m."isKetua" = true` 
      const paramsQuery = [id]

      const result = await db.query(selectQuery,paramsQuery)
      const dataKoTA = result.rows[0]
      const formattedNamaKoTA = 'KoTA ' + dataKoTA.id_KoTA.substr(4, 3)
      const FormattedPassword = 'KoTA' + dataKoTA.id_KoTA + dataKoTA.jumlah_pembimbing + dataKoTA.jumlah_penguji




      
      if (Object.keys(result).length > 0) {
        res.render('emailAccountKota', { formattedUsername: formattedNamaKoTA, username: dataKoTA.id_KoTA, password: FormattedPassword }, function (err, renderedHtml) {
          if (err) {
            console.log(err);
          } else {
            const mailOptions = {
              from: 'hello@example.com',
              to: dataKoTA.email,
              subject: 'Cek Notifikasi',
              html: renderedHtml
            };
        
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                return res.status(200).send({
                  message:'Email terkirim' + info.response
                })
             
              }
            });
          }
        });
        
      } 
      
    } catch (error) {
       return res.status(400).send({
          message: error.message
       })
    }
  },

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

  async checkUniqueNIM(req, res) {
    return Mahasiswa
      .findAll({
        attributes: { 
          exclude: ['createdAt', 'updatedAt']
         },
         where : {
          NIM : req.params.id
         }
      })
      .then((mhs) => {
        if (Object.keys(mhs).length == 0) {
          return res.status(200).send({
            message: 'NIM mahasiswa tidak ditemukan',
            jumlah : mhs.length
          });
        }
        return res.status(200).send({
          message:'Get mahasiswa  by NIM success',
          data : mhs,
          jumlah : mhs.length
        });
      })
      .catch((error) => res.status(400).send(error));
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
  async updateMahasiswaWithoutIsKetua(req, res) {
    const { id } = req.params
    const { NIM, id_KoTA, nama, email} = req.body

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
                           "email"=$4 
                           WHERE "NIM"= $5 RETURNING *`

      const paramsQuery = [ NIM, id_KoTA, nama, email, id]

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

  // async importMahasiswaD4(req,res) {
  //   fs.createReadStream('./CSV/D4Mahasiswa.csv')
  //   .pipe(csv())
  //   .on('data', async (row) => {
  //     try {
  //       // Menggunakan method insertOrUpdate untuk menghindari duplikasi data
  //       await Mahasiswa.upsert({
  //         NIM: row.nim,
  //         nama: row.nama,
  //         email: row.email,
  //         id_KoTA: null,
  //         id_prodi:row.id_prodi,
  //         isKetua: false
  //       });
      
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   })
  //   .on('end', () => {
  //     return res.status(200).send({
  //       message: 'data berhasil diimpor ke database '
  //     })
  //   });
  // },

  async importMahasiswaD4(req, res) {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({
          message: 'File not found'
        });
      }
  
      const file = req.files.file;
  
      // const filePath = `CSV/${file.name}`;
  
      // await file.mv(filePath);
  
      const workbook = await XlsxPopulate.fromDataAsync(file.data);
      const sheet = workbook.sheet(0); 
  
      const data = sheet.usedRange().value();
      for (const row of data) {
        try {
          // Menggunakan method insertOrUpdate untuk menghindari duplikasi data
          await Mahasiswa.upsert({
            NIM: row[0],
            nama: row[1],
            email: row[2],
            id_KoTA: null,
            id_prodi: row[3],
            isKetua: false
          });
        } catch (err) {
          console.error(err);
        }
      }
  
      res.status(200).json({
        message: 'Data berhasil diimpor ke database'
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Terjadi kesalahan dalam membaca file Excel'
      });
    }
  },
  async importMahasiswaD3(req, res) {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({
          message: 'File not found'
        });
      }
  
      const file = req.files.file;
  
      // const filePath = `CSV/${file.name}`;
  
      // await file.mv(filePath);
  
      const workbook = await XlsxPopulate.fromDataAsync(file.data);
      const sheet = workbook.sheet(0); 
  
      const data = sheet.usedRange().value();
      for (const row of data) {
        try {
          // Menggunakan method insertOrUpdate untuk menghindari duplikasi data
          await Mahasiswa.upsert({
            NIM: row[0],
            nama: row[1],
            email: row[2],
            id_KoTA: null,
            id_prodi: row[3],
            isKetua: false
          });
        } catch (err) {
          console.error(err);
        }
      }
  
      res.status(200).json({
        message: 'Data berhasil diimpor ke database'
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Terjadi kesalahan dalam membaca file Excel'
      });
    }
  },

  // async importMahasiswaD3(req,res) {
  //   fs.createReadStream('./CSV/D3Mahasiswa.csv')
  //   .pipe(csv())
  //   .on('data', async (row) => {
  //     try {
  //       // Menggunakan method insertOrUpdate untuk menghindari duplikasi data
  //       await Mahasiswa.upsert({
  //         NIM: row.nim.toString(),
  //         nama: row.nama.toString(),
  //         email: row.email.toString(),
  //         id_KoTA: null,
  //         id_prodi:row.id_prodi.toString(),
  //         isKetua: false
  //       });
      
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   })
  //   .on('end', () => {
  //     return res.status(200).send({
  //       message: 'data berhasil diimpor ke database '
  //     })
  //   });
  // },



};