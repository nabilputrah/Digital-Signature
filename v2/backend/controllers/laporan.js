const sss = require('shamirs-secret-sharing')
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib')
const cheerio = require('cheerio');
const db = require('../db/index')
// const moment = require('moment-timezone');
const path = require('path');
const Laporan = require('../models').Laporan;
const crypto = require('crypto');
const dokumen = require('./dokumen');
// moment.tz.setDefault('Asia/Jakarta');


// const now = moment();

// const formattedDate = now.format('YYYY-MM-DD');
// // Format time for file
// const formattedTime = now.format('HHmmss');
// // Format time for saving to database
// const formattedTimeFull = now.format('HH:mm:ss');

//  const fullDatetime = formattedDate + " " + formattedTimeFull

module.exports = {
  async validateDocument(req, res) {
    const documentUploaded = await PDFDocument.load(req.files.cover.data)

    try {

      // const fileBuffer = fs.readFileSync('./pdf/Laporan_20224022023_Final (12).pdf');
      const fileBuffer1 = req.files.cover.data
      const hashSum2 = crypto.createHash('sha256');
      hashSum2.update(fileBuffer1);
  
      const hex = hashSum2.digest('hex');

      if (!documentUploaded.getAuthor()){
        return res.status(200).send({
          message : 'tidak ada id_kota',
          valid : false
        })
      }

      if (!documentUploaded.getTitle()){
        return res.status(200).send({
          message : 'tidak ada judul',
          valid : false
        })
      }

      if (!documentUploaded.getSubject()){
        return res.status(200).send({
          message : 'tidak ada public_key',
          valid : false
        })
      }

      console.log("Hasil Hashing: " + hex)

      const selectUser = `SELECT K."id_user"  FROM "KoTA" as K
                          Where K."id_KoTA" = $1
                          `
      const paramsUser = [documentUploaded.getAuthor()]

      const resultUser = await db.query(selectUser,paramsUser)

      const id_user = resultUser.rows[0].id_user

      const selectQuery = ` SELECT L."digital_signature" FROM "Laporan" as L
                            WHERE L."KoTA_id_user" = $1
                          `
      const paramsQuery = [id_user]

      const result = await db.query(selectQuery,paramsQuery)

      const digital_signature = result.rows[0].digital_signature
      console.log("Digital Signature: " + digital_signature)

      const decrypted = crypto.publicDecrypt(documentUploaded.getSubject(),digital_signature)
      if (hex == decrypted){
        return res.status(200).send({
          message : 'dokumen valid',
          id_KoTA : documentUploaded.getAuthor(),
          id_user : id_user,
          judul : documentUploaded.getTitle(),
          valid : true
        })
      } else if ((documentUploaded.getAuthor() && documentUploaded.getSubject() && documentUploaded.getTitle()) && (hex != decrypted)){
        return res.status(200).send({
          message : 'dokumen tidak valid',
          valid : false
        })
      }

    } catch (error) {
      return res.status(200).send({
        message : 'dokumen tidak valid',
        valid : false
      })
    }
  }, 
  
  
  async mergePDF(req, res) {
    const moment = require('moment-timezone');
    moment.tz.setDefault('Asia/Jakarta');
    const now = moment();
    const formattedDate = now.format('YYYY-MM-DD');
    const formattedTimeFull = now.format('HH:mm:ss');
    const fullDatetime = formattedDate + " " + formattedTimeFull

    const  { id_laporan } = req.body

    try {
          // const cover = await PDFDocument.load(fs.readFileSync('./pdf/KoTA108LaporanTA.pdf'));
        // const content = await PDFDocument.load(fs.readFileSync('./pdf/contoh3.pdf'));
        const cover = await PDFDocument.load(req.files.cover.data);
        const content = await PDFDocument.load(req.files.content.data);

        const doc = await PDFDocument.create();

        const coverPages = await doc.copyPages(cover, [0]); // Menyalin halaman pertama dari dokumen pertama
        for (const page of coverPages) {
          doc.addPage(page);
        }

        const contentPages = await doc.copyPages(content, [0, 1]); // Mengambil halaman ke-2 dan ke-3 dari dokumen kedua
        for (const page of contentPages) {
          doc.addPage(page);
        }

        const contentPages1 = await doc.copyPages(cover, cover.getPageIndices())
        for (const page of contentPages1) {
        
          doc.addPage(page)

        }

        doc.removePage(3)
        doc.removePage(3)
        doc.removePage(3)


      // Query get sharekey dan combine menjadi private key
      const selectQuery = ` SELECT S."secret_key" FROM "Secret_Key" as S
                            WHERE S."Laporan_id_laporan" = $1
                          `
      const paramsQuery = [id_laporan]

      const result = await db.query(selectQuery,paramsQuery)

      const allShareKey = result.rows

      const newArray = allShareKey.map((item) => {
        return item.secret_key.toString('hex');
      });

      const recoveredPrivateKey = sss.combine(newArray.map(share => Buffer.from(share, 'hex')))

      const constructPrivateKey = recoveredPrivateKey.toString()

      // Quesy Get Public Key
      const selectQueryPublicKey = ` SELECT L."public_key", L."private_key" FROM "Laporan" as L 
                                    WHERE L."id_laporan" = $1 
                                    `
      const paramsQueryPublicKey = [id_laporan]

      const resultPublicKey = await db.query(selectQueryPublicKey,paramsQueryPublicKey)

      const PublicKey = resultPublicKey.rows[0].public_key
      const PrivateKeyBaru = resultPublicKey.rows[0].private_key

      // Get id KoTA
      const id_KoTA = id_laporan.substring(8);;

      const selectQueryJudul = `SELECT L."judul_TA" FROM "Laporan" as L 
                                  WHERE L."id_laporan" = $1`

      const paramsQueryJudul = [id_laporan]

      const resultJudul = await db.query(selectQueryJudul, paramsQueryJudul)

      const judul_TA = resultJudul.rows[0].judul_TA

      const $ = cheerio.load(judul_TA);
      const JudulTA = $.root().text();

      // Proses Simpan Atribut ke pdf
      // Set Judul TA
      doc.setTitle(JudulTA);
      // Set Author
      doc.setAuthor(id_KoTA);
      // Set Subject
      doc.setSubject(PublicKey);


      const mergedBytes = await doc.save();
      const dokumenKu = Buffer.from(mergedBytes)

      // const options = {
      //   fields: ['id_dokumen','id_laporan','dokumen_laporan', 'version', 'tgl_unggah'],
      //   returning:true   
      // }

      // const dokumen = await Dokumen.create({
      //   id_dokumen:id_dokumen,
      //   id_laporan:id_laporan,
      //   dokumen_laporan: dokumenKu,
      //   version: version,
      //   tgl_unggah:fullDatetime
      // }, options)

      const laporan = await Laporan.update({
        dokumen_laporan_final:dokumenKu,
        tgl_finalisasi:fullDatetime
      },{
        where:{
          id_laporan:id_laporan
        }
      })



      if (!laporan) {
        return res.status(400).send({
          message: 'gagal input'
        })
      }

      // Proses Encrypted Menggunakan PrivateKey
      // Hashing dokumen
      const hashSum2 = crypto.createHash('sha256');
      hashSum2.update(dokumenKu);
  
      const hex = hashSum2.digest('hex');

      const digitalSignature = crypto.privateEncrypt(recoveredPrivateKey,hex)

      await Laporan.update({
        digital_signature : digitalSignature
        },{
          where:{
            id_laporan: id_laporan
          }
        }
      )


      return res.status(200).send({
        message:'add dokumen sukses',
        file:mergedBytes,
        hash : hex,
        digitalSignature :digitalSignature
      })
      
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
    
  },
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
        const selectQueryDocFinal = ` SELECT L."dokumen_laporan_final" FROM "Laporan" as L
                                WHERE L."id_laporan" = $1 
                                AND L."dokumen_laporan_final" IS  NULL
                              `
        const paramsQueryDocFinal = [id_laporan]
   
        const resultQueryDocFinal = await db.query(selectQueryDocFinal, paramsQueryDocFinal)

        let statusLaporan = true
        if (resultQueryDocFinal.rows.length == 1){
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
                              WHERE R."KoTA_id_user" = $1 AND 
                              R."role" = 'Kajur'
                              `
        const paramsQuery = [id]
   
        const resultQuery = await db.query(selectQuery, paramsQuery)

        const statusTTDKajur = resultQuery.rows[0].status
   
        // Get Status Laporan Final
        const selectQueryDocFinal = ` SELECT L."dokumen_laporan_final" FROM "Laporan" as L
                                WHERE L."KoTA_id_user" = $1 
                                AND L."dokumen_laporan_final" IS  NULL
                                `
        const paramsQueryDocFinal = [id]
   
        const resultQueryDocFinal = await db.query(selectQueryDocFinal, paramsQueryDocFinal)

        let statusLaporan = true
        if (resultQueryDocFinal.rows.length == 1){
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
  },

  async getDokumenFinalByID(req,res) {
    const laporan = await Laporan.findByPk(req.params.id);

    if (!laporan) {
      return res.status(404).json({ message: 'Dokumen not found' });
    }

    res.set({
      'Content-Type': 'application/pdf'
    });

    res.send(laporan.dokumen_laporan_final)

  },

};