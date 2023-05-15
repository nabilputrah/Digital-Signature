const db = require('../db/index')


const path = require('path');
const Laporan = require('../models').Laporan;
const Dokumen = require('../models').Dokumen;
const crypto = require('crypto');

const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta');


const now = moment();

const formattedDate = now.format('YYYY-MM-DD');
// Format time for file
// const formattedTime = now.format('HHmmss');
// Format time for saving to database
const formattedTimeFull = now.format('HH:mm:ss');

 const fullDatetime = formattedDate + " " + formattedTimeFull

module.exports = {

  async addDokumen(req, res) {
    const { dokumen_laporan } = req.files
    
    const options = {
      fields: ['id_dokumen','id_laporan','dokumen_laporan', 'version', 'tgl_unggah'],
      returning:true   
    }

    try {
      const dokumen = await Dokumen.create({
        id_dokumen:'Laporan_20204072021_Final',
        id_laporan:'Laporan_20204072021',
        dokumen_laporan: dokumen_laporan.data,
        version: 'v1',
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