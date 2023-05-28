const sss = require('shamirs-secret-sharing')
const db = require('../db/index')
const { Op } = require('sequelize');
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib')
const fs = require('fs')

const path = require('path');
const Laporan = require('../models').Laporan;
const Dokumen = require('../models').Dokumen;
const SecretKey = require('../models').Secret_Key;
const crypto = require('crypto');



module.exports = {

  async mergePDF(req, res) {
    const moment = require('moment-timezone');
    moment.tz.setDefault('Asia/Jakarta');
    const now = moment();
    const formattedDate = now.format('YYYY-MM-DD');
    const formattedTimeFull = now.format('HH:mm:ss');
    const fullDatetime = formattedDate + " " + formattedTimeFull

    const  { id_laporan, id_dokumen,version } = req.body

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
                            WHERE S."id_laporan" = $1
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
      const selectQueryPublicKey = ` SELECT L."public_key" FROM "Laporan" as L 
                                    WHERE L."id_laporan" = $1 
                                    `
      const paramsQueryPublicKey = [id_laporan]

      const resultPublicKey = await db.query(selectQueryPublicKey,paramsQueryPublicKey)

      const PublicKey = resultPublicKey.rows[0].public_key

      // Get id KoTA
      const id_KoTA = id_laporan.substring(8);;

      // Proses Simpan Atribut ke pdf
      // Set Judul TA
      doc.setTitle('Judul Dokumen PDF');
      // Set Author
      doc.setAuthor(id_KoTA);
      // Set Subject
      doc.setSubject(PublicKey);


      const mergedBytes = await doc.save();
      const dokumenKu = Buffer.from(mergedBytes)

      // Proses Encrypted Menggunakan PrivateKey
      // Hashing dokumen
      let HashDoc = ''
      const hashSum = crypto.createHash('sha256');
      HashDoc = hashSum.update(dokumenKu).digest('hex');  

      // Encrypt Menjadi Digital Signature
      const digitalSignature = crypto.privateEncrypt(recoveredPrivateKey,HashDoc)

      await Laporan.update({
        digital_signature : digitalSignature
        },{
          where:{
            id_laporan: id_laporan
          }
        }
      )
      
      // Decrypt untuk Validasi
      // Decrypt untuk Validasi
      // Decrypt untuk Validasi
      // const decrypted = crypto.publicDecrypt(PublicKey,digitalSignature)
      // console.log('ini nilai hash  =' + HashDoc)
      // console.log('ini data decrypted: ' + decrypted.toString())


      const options = {
        fields: ['id_dokumen','id_laporan','dokumen_laporan', 'version', 'tgl_unggah'],
        returning:true   
      }

      const dokumen = await Dokumen.create({
        id_dokumen:id_dokumen,
        id_laporan:id_laporan,
        dokumen_laporan: dokumenKu,
        version: version,
        tgl_unggah:fullDatetime
      }, options)

      if (!dokumen) {
        return res.status(400).send({
          message: 'gagal input'
        })
      }

      return res.status(200).send({
        message:'add dokumen sukses',
        data: dokumen,
        file:mergedBytes,
        // sharekey:constructPrivateKey,
        // publicKey: PublicKey,
        digitalSignature :digitalSignature
        // result :Hasil
      })
      
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
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
    const { id_dokumen, id_laporan, version} = req.body
    
    const options = {
      fields: ['id_dokumen','id_laporan','dokumen_laporan', 'version', 'tgl_unggah'],
      returning:true   
    }

    try {
      const dokumen = await Dokumen.create({
        id_dokumen:id_dokumen,
        id_laporan:id_laporan,
        dokumen_laporan: dokumen_laporan.data,
        version: version,
        tgl_unggah:fullDatetime
      }, options)

      if (!dokumen) {
        return res.status(400).send({
          message: 'gagal input'
        })
      }

      return res.status(200).send({
        message:'add dokumen sukses',
        data: dokumen
      })
    } catch (error) {
      return res.status(400).send({
        message:error.message
      })
    }
  }, 
  // async getAllDokumen(req, res) {
  //   try {
  //       const dokumen = await Dokumen.findAll({
  //           attributes: {
  //               exclude: ['createdAt', 'updatedAt','id']
  //           },
  //           order: [
  //               ['id_dokumen', 'ASC']
  //           ]
  //       })
        
  //       if (dokumen.length == 0) {
  //           return res.status(400).send({
  //               message:'Data laporan tidak ada'
  //           })
  //       }

  //       return res.set('application/pdf').send({
  //           message:'Get all data dokumen berhasil',
  //           data: dokumen
  //       })
  //   } catch (error) {
  //       return res.status(400).send({
  //           message: error.message
  //       })
  //   }
   

  // },

  async getDokumenByID(req,res) {
    const dokumen = await Dokumen.findByPk(req.params.id);

    if (!dokumen) {
      return res.status(404).json({ message: 'Dokumen not found' });
    }

    res.set({
      'Content-Type': 'application/pdf'
    });

    res.send(dokumen.dokumen_laporan)

  },

  async getAllDokumenByIdLaporan(req, res){ 
    const { id } = req.params 

    try {
      const dokumen = await Dokumen.findAll({
        where: {
          id_laporan : id
        },
        attributes:{
          exclude:['id', 'createdAt', 'updatedAt','dokumen_laporan']
        },
        order:[
          ['id_dokumen', 'ASC']
        ]
      })

      if (dokumen.length == 0) {
        return res.status(400).send({
            message:'Data dokumen tidak ada'
        })
      }

      return res.status(200).send({
          message:'Get all data dokumen by id laporan berhasil',
          data: dokumen
    })
    } catch (error) {
      return res.status(400).send({
        message:  error.message
      })
    }
  },
  async getDokumenVersionByKoTA(req, res){ 
    const { id } = req.params
    
    try {
      
      const selectMaxQuery = `SELECT MAX(CAST(SUBSTRING(version, 2) AS INTEGER)) AS max_version FROM "Dokumen"
                              WHERE "id_laporan" = $1`

      const paramsQuery = [id]

      const result = await db.query(selectMaxQuery, paramsQuery)

      if (Object.keys(result).length > 0) {
        return res.status(200).send({
          message: `get`,
          data: result.rows[0].max_version
        })
      
      } 

    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  },
   
   
 
  
  async deleteDokumen(req, res) {
    const { id } = req.params
   
    try {
      const dokumen = await Dokumen.findOne({
        where: {
          id_dokumen: id
        },
        attributes: {
          exclude:['id']
        }
      })

      if (!dokumen) {
        return res.status(404).send({
          message:'Data dokumen tidak ditemukan'
        })
      }

      await Dokumen.destroy({
        where: {
          id_dokumen:id
        }
      })
   
      return res.status(200).send({
        message:`Data dokumen dengan id ${id} berhasil dihapus`
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
          id_KoTA: id
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