const db = require('../db/index')
// const moment = require('moment-timezone');
const path = require('path');
const Laporan = require('../models').Laporan;
const crypto = require('crypto');
// moment.tz.setDefault('Asia/Jakarta');


// const now = moment();

// const formattedDate = now.format('YYYY-MM-DD');
// // Format time for file
// const formattedTime = now.format('HHmmss');
// // Format time for saving to database
// const formattedTimeFull = now.format('HH:mm:ss');

//  const fullDatetime = formattedDate + " " + formattedTimeFull

module.exports = {
  async deleteDokumen(req, res) {
    try {
      const laporan = await Laporan.update({
        dokumen_laporan: null,
        tgl_unggah:null
      }, {
        where: {
          id_laporan:req.params.id
        }
      })

      if (!laporan) {
        return res.status(400).send({
          message: 'gagal delete'
        })
      }

      return res.status(200).send({
        message:'delete dokumen sukses',
        data: laporan
      })
    } catch (error) {
      return res.status(400).send({
        message:error.message
      })
    }
  },

  async openDokumen(req,res) {

    const id_dokumen = req.params.id

    const id_laporan = id_dokumen.substring(0, id_dokumen.lastIndexOf('_'));
    const laporan = await Laporan.findOne({
      where:{
        id_laporan: id_laporan
      }, attributes: {
        exclude: ['id','createdAt','updatedAt']
      }
    })

    if (!laporan) {
      return res.status(404).send({
        message:'Lporan tida ada'
      })
    }

    res.set({
      'Content-Type': 'application/pdf'
    });


    if(id_dokumen.includes('Final')){
      res.send(laporan.dokumen_laporan_final)
    } else {
      res.send(laporan.dokumen_laporan)
    }

  },

  async addDokumen(req, res) {
    const moment = require('moment-timezone');
    moment.tz.setDefault('Asia/Jakarta');


    const now = moment();

    const formattedDate = now.format('YYYY-MM-DD');

    const formattedTimeFull = now.format('HH:mm:ss');

    const fullDatetime = formattedDate + " " + formattedTimeFull
    const { dokumen_laporan } = req.files

    if (dokumen_laporan.mimetype !== 'application/pdf') {
      return res.send({
        message: 'File harus berupa PDF'
      });
    }

    try {
      const laporan = await Laporan.update({
        dokumen_laporan: dokumen_laporan.data,
        tgl_unggah:fullDatetime
      }, {
        where: {
          id_laporan:req.body.id_laporan
        }
      })

      if (!laporan) {
        return res.status(400).send({
          message: 'gagal input'
        })
      }

      return res.status(200).send({
        message:'add dokumen sukses',
        data: laporan
      })
    } catch (error) {
      return res.status(400).send({
        message:error.message
      })
    }
  },

  async getAllLaporan(req, res) {
    try {
        const laporan = await Laporan.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','id']
            },
            order: [
                ['id_laporan', 'ASC']
            ]
        })
        
        if (laporan.length == 0) {
            return res.status(400).send({
                message:'Data laporan tidak ada'
            })
        }

        return res.status(200).send({
            message:'Get all data laporan berhasil',
            data: laporan
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
   

  },
  
  async getLaporanById(req, res) {
    const { id } = req.params

    try {
      const laporan = await Laporan.findOne({
        where: {
          id_laporan: id
        },
        attributes: {
          exclude:['id','createdAt','updatedAt']
        }
      })

      if (!laporan) {
        return res.status(404).send({
          message:'Data laporan tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data laporan dengan id ${id} berhasil`,
        data: laporan
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
  async getLaporanByKoTA(req, res) {
    const { id } = req.params

    try {
      const laporan = await Laporan.findOne({
        where: {
          KoTA_id_user: id
        },
        attributes: {
          exclude:['id','createdAt','updatedAt','public_key','private_key']
        }
      })

      if (!laporan) {
        return res.status(404).send({
          message:'Data laporan tidak ditemukan'
        })
      }

      return res.status(200).send({
        message:`Get data laporan dengan id ${id} berhasil`,
        data: laporan
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
 
 
  async addLaporan(req, res) {

    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },  
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });
    const data = {
        id_laporan : 'Laporan_' +req.body.id_laporan,
        KoTA_id_user: req.body.KoTA_id_user,
        private_key: privateKey,
        public_key: publicKey,
    }
    const options = {
        fields: ['id_laporan','KoTA_id_user','private_key','public_key',
                ],
        returning:false
    }
    try {
        const relasi = await Laporan.create(data, options)
        if (relasi) {
            // dokumen_laporan.mv(path.resolve('./uploads/laporan_ta/', formattedDate + '-' + formattedTime + '-' + dokumen_laporan.name))
            // if (lembar_pengesahan){
            //   lembar_pengesahan.mv(path.resolve('./uploads/lembar_pengesahan/', formattedDate + '-' + formattedTime + '-' + lembar_pengesahan.name))
 
            // }
                   }
        return res.status(200).send({
            message:'add new Laporan berhasil',
            data: relasi
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async getStatusCanTTD(req, res){
    const {  id } = req.params;

    try {   
        // Get Status Laporan Final
        const id_laporan = "Laporan_"+id
        const selectQueryDocFinal = ` SELECT D."id_dokumen" FROM "Dokumen" as D
                              WHERE D."id_laporan" = $1 
                              AND D."id_dokumen" LIKE '%Final%'
                              `
        const paramsQueryDocFinal = [id_laporan]
   
        const resultQueryDocFinal = await db.query(selectQueryDocFinal, paramsQueryDocFinal)

        let statusLaporan = true
        if (resultQueryDocFinal.rows.length == 0){
          statusLaporan = false
        }

        return res.status(200).send({
          statusLaporan : statusLaporan
        })

    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async getStatusKajur(req, res){
    const {  id } = req.params;

    try {
        const selectQuery = ` SELECT R."status" FROM "Relasi_KoTA" as R
                              WHERE R."id_KoTA" = $1 AND 
                              R."role" = 'Kajur'
                              `
        const paramsQuery = [id]
   
        const resultQuery = await db.query(selectQuery, paramsQuery)

        const statusTTDKajur = resultQuery.rows[0].status
   
        // Get Status Laporan Final
        const id_laporan = "Laporan_"+id
        const selectQueryDocFinal = ` SELECT D."id_dokumen" FROM "Dokumen" as D
                              WHERE D."id_laporan" = $1 
                              AND D."id_dokumen" LIKE '%Final%'
                              `
        const paramsQueryDocFinal = [id_laporan]
   
        const resultQueryDocFinal = await db.query(selectQueryDocFinal, paramsQueryDocFinal)

        let statusLaporan = true
        if (resultQueryDocFinal.rows.length == 0){
          statusLaporan = false
        }

        if ((statusLaporan == false) && (statusTTDKajur == true)){
          return res.status(200).send({
                data: false,
                statusTTDKajur : statusTTDKajur,
                statusLaporan : statusLaporan
          })
        } else {
          return res.status(200).send({
                data: true,
                statusTTDKajur : statusTTDKajur,
                statusLaporan : statusLaporan
          })
        }

    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

//   },
  async deleteLaporan(req, res) {
    const { id } = req.params
   
    try {
      const laporan = await Laporan.findOne({
        where: {
          id_laporan: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!laporan) {
        return res.status(404).send({
          message:'Data laporan tidak ditemukan'
        })
      }

      await Laporan.destroy({
        where: {
          id_laporan:id
        }
      })
   
      return res.status(200).send({
        message:`Data laporan dengan id ${id} berhasil dihapus`
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async updateIdKoTALaporan(req, res) {
    const { id } = req.params
    const { KoTA_id_user } =  req.body
    try {
       // update mahasiswa kota to null  
    const updateLaporan = await Laporan.update({
      KoTA_id_user : KoTA_id_user,
      lembar_pengesahan:null
      }, {
        where: {
          id_laporan: id
      
        }
      }
    )

      return res.status(200).send({
        message: 'update id kota pada laporan berhasil',
        data: updateLaporan
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },

  async updateLembarPengesahan(req, res) {
    const { id } = req.params
    const { lembar_pengesahan } = req.files

    try {
        const laporan = await Laporan.findOne({
          where:{
            id_laporan: id
          },
          attributes: {
            exclude:['id','createdAt','updatedAt']
          }
        })

        if (!laporan) {
          return res.status(404).send({
            message: 'data laporan tidak ditemukan'
          })
        }

        const update = await Laporan.update({
            lembar_pengesahan : lembar_pengesahan.data
            },{
              where:{
                id_laporan: id
              }
            }
          )

        return res.status(200).send({
          message: 'update lembar pengesahan sukses',
          data: update
        })

    } catch (error) {
        return res.status(400).send({
          message : error.message
        })
    }

  },
  async checkLembarPengesahan(req, res){
    const { id } = req.params

    try {
      const laporan = await Laporan.findOne({
          where:{
            id_laporan: id
          },
          attributes: {
            exclude:['id','createdAt','updatedAt']
          }
        })

        if (!laporan) {
          return res.status(404).send({
            message: 'data laporan tidak ditemukan'
          })
        }

        if (laporan.lembar_pengesahan === null) {
          return res.status(200).send({
            message: 'lembar pengesahaan tidak ada'
          })
        }

        return res.status(200).send({
          message:'lembar pengesahan ada'
        })

        // res.set({
        //   'Content-Type': 'application/pdf'
        // });
    
        // return res.send(
        //  laporan.lembar_pengesahan
        // )
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
    
  },


  async getLembarPengesahan(req,res) {
    
    const { id } = req.params

    try {
      const laporan = await Laporan.findOne({
          where:{
            id_laporan: id
          },
          attributes: {
            exclude:['id','createdAt','updatedAt']
          }
        })

        if (!laporan) {
          return res.status(404).send({
            message: 'data laporan tidak ditemukan'
          })
        }

        if (laporan.lembar_pengesahan === null) {
          return res.status(400).send({
            message: 'lembar pengesahaan tidak ada'
          })
        }

        res.set({
          'Content-Type': 'application/pdf'
        });
    
        return res.send(
         laporan.lembar_pengesahan
        )
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
    

  },

  async updateLaporan(req, res) {
    const { id } = req.params
    const { judul_TA, tgl_disetujui, tgl_disidangkan } = req.body


    try {
       
    const updateLaporan = await Laporan.update({
      judul_TA : judul_TA,
      tgl_disetujui: tgl_disetujui,
      tgl_disidangkan: tgl_disidangkan
      }, {
        where: {
          KoTA_id_user: id
        }
      }
    )

      return res.status(200).send({
        message: 'update laporan berhasil',
        data: updateLaporan
      })
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  }



};