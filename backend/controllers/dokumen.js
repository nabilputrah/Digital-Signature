const db = require('../db/index')
const { Op } = require('sequelize');

const path = require('path');
const Laporan = require('../models').Laporan;
const Dokumen = require('../models').Dokumen;
const crypto = require('crypto');



module.exports = {

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