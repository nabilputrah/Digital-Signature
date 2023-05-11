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
  //  const { lembar_pengesahan } = req.files 
  //  const dokumenLaporanPath = formattedDate + "-" + formattedTime + '-' + dokumen_laporan.name
  //  const lembarPengesahanPath = formattedDate + "-" + formattedTime + '-' + lembar_pengesahan.name
//  
    const data = {
        id_laporan : 'Laporan_' +req.body.id_laporan,
        id_KoTA: req.body.id_KoTA,
        judul_TA: req.body.judul_TA,
        // dokumen_laporan: dokumenLaporanPath,
        // lembar_pengesahan: lembarPengesahanPath,
        digital_signature: req.body.digital_signature,
        tgl_disetujui: req.body.tgl_disetujui,
        tgl_disidangkan: req.body.tgl_disidangkan,
        // version: req.body.version,
        private_key: privateKey,
        public_key: publicKey,
    }
    const options = {
        fields: ['id_laporan','id_KoTA','judul_TA',
                 'lembar_pengesahan','digital_signature','tgl_disetujui','tgl_disidangkan',
                 ,'private_key','public_key',
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

//   async updateLaporan(req, res) {
//     const { id } = req.params
//     const { id_KoTA, NIP, role, urutan} = req.body

//     try {
//       const laporan = await Laporan.findOne({
//         where: {
//           id_laporan : id
//         },
//         attributes: {
//           exclude:['id']
//         }
//       })

//       if (!laporan) {
//         return res.status(404).send({
//           message:'Data laporan tidak ditemukan'
//         })
//       }

//       const updateQuery = `UPDATE "Laporan" SET "id_KoTA" = $1, "NIP" = $2, "role"=$3,
//                            "urutan"=$4, "isKetua"=$5 
//                            WHERE "id_laporan"= $6 RETURNING *`

//       const paramsQuery = [ id_KoTA, NIP, role, urutan, id]

//       const result = await db.query(updateQuery, paramsQuery)

//       if (Object.keys(result).length > 0) {
//         return res.status(200).send({
//           message: `Update data laporan dengan id laporan ${id} berhasil`,
//           data: result.rows
//         })
//       } 
//     } catch (error) {
//       return res.status(400).send({
//         message: error.message
//       })
//     }
//   },
  
//   async doSignature(req, res) {
//     const { id } = req.params
//     const { img_ttd } = req.files

//     const now = moment();

//     // const formattedDate = now.format('YYYY-MM-DD');
//     // // Format time for file
//     // const formattedTime = now.format('HHmmss');
//     // // Format time for saving to database
//     // const formattedTimeFull = now.format('HH:mm:ss');
    
//     // const fullDatetime = formattedDate + " " + formattedTimeFull

//     try {
//       const laporan = await Laporan.findOne({
//         where: {
//           id_laporan: id
//         },
//         attributes:{
//           exclude:['createdAt','updatedAt']
//         }
//       })

//       if (!laporan) {
//         return res.status(404).send({
//           message:'Data relasi kota tidak ditemukan'
//         })
//       }

//       const imagePath = formattedDate + "-" + formattedTime + '-' + img_ttd.name

//       const updateQuery = `UPDATE "Laporan" SET "status" = true, "img_ttd" = $1, "tgl_ttd"=$2
//                            WHERE "id_laporan"= $3 RETURNING *`

//       const paramsQuery = [ imagePath, fullDatetime, id ]

//       const result = await db.query(updateQuery, paramsQuery)

//       if (Object.keys(result).length > 0) {
      
//         img_ttd.mv(path.resolve('./uploads/img_ttd/', formattedDate + '-' + formattedTime + '-' + img_ttd.name))
        
//         return res.status(200).send({
//           message: `Do signature berhasil`,
//           data: result.rows
//         })
//       } 

//     } catch (error) {
//       return res.status(400).send({
//         message:error.message
//       })
//     }
   
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
    const { id_KoTA } =  req.body
    try {
       // update mahasiswa kota to null  
    const updateLaporan = await Laporan.update({
      id_KoTA : id_KoTA,
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
  }



};