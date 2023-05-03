var express = require('express');
var router = express.Router();
const path = require('path');

const userController = require('../controllers').user;
const dosenController = require('../controllers').dosen;
const jurusanController = require('../controllers').jurusan;
const prodiController = require('../controllers').prodi;
const koordinatorController = require('../controllers').koordinator;
const koTAController = require('../controllers').kota;
const mahasiswaController = require('../controllers').mahasiswa;
const relasiController = require('../controllers').relasi_kota;
const laporanController = require('../controllers').laporan;
const secretController = require('../controllers').secret_key;

const { verifyTokenAndRole } = require('../controllers/user')

// waktu indonesia 



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Exercise upload file. */
router.post('/api/upload', (req, res) => {
  // Log the files to the console
  try {
    const { image } = req.files
    console.log(image)
    // image.mv(__dirname + '/upload/' + image.name)
    image.mv(path.resolve('./uploads/', Date.now() + '-' + image.name))

    return res.status(200).send({
      data: image.name
    })
  
  } catch (error) {
    return res.status(400).send({
      message : 'upload image file failed'
    })
  }

  
});


/* Endpoint User Controller */ 
router.post('/api/signup', userController.signUpUser)
router.post('/api/login', userController.loginUser)

router.get('/api/user',verifyTokenAndRole, userController.getAllUser)
router.get('/api/user/:id', userController.getUserById)
router.post('/api/user', userController.addUser)
router.put('/api/user/:id',userController.updateUser)
router.delete('/api/user/:id', userController.deleteUser);
router.put('/api/user/change-password/:id',userController.changeUserPassword)

/* Endpoint Dosen Controller */ 
router.get('/api/dosen', dosenController.getAllDosen)
router.post('/api/dosen', dosenController.addDosen)
router.get('/api/dosen/:id', dosenController.getDosenByNIP)
router.put('/api/dosen/:id',dosenController.updateDosen)
router.delete('/api/dosen/:id', dosenController.deleteDosen);

/* Endpoint Jurusan Controller*/
router.get('/api/jurusan', jurusanController.getAllJurusan)
router.get('/api/jurusan/:id', jurusanController.getJurusanById)
router.post('/api/jurusan', jurusanController.addJurusan)
router.put('/api/jurusan/:id',jurusanController.updateJurusan)
router.delete('/api/jurusan/:id', jurusanController.deleteJurusan)

/* Endpoint Prodi Controller*/
router.get('/api/prodi', prodiController.getAllProdi)
router.get('/api/prodi/:id', prodiController.getProdiById)
router.post('/api/prodi', prodiController.addProdi)
router.put('/api/prodi/:id',prodiController.updateProdi)
router.delete('/api/prodi/:id', prodiController.deleteProdi)

/* Endpoint Koordinator Controller*/
router.get('/api/koordinator', koordinatorController.getAllKoordinator)
router.get('/api/koordinator/:id', koordinatorController.getKoordinatorById)
router.post('/api/koordinator', koordinatorController.addKoordinator)
router.put('/api/koordinator/:id',koordinatorController.updateKoordinator)
router.delete('/api/koordinator/:id', koordinatorController.deleteKoordinator)

/* Endpoint KoTA Controller*/
router.get('/api/KoTA', koTAController.getAllKoTA)
router.get('/api/KoTA/:id', koTAController.getKoTAById)
router.post('/api/KoTA', koTAController.addKoTA)
router.put('/api/KoTA/:id',koTAController.updateKoTA)
router.delete('/api/KoTA/:id', koTAController.deleteKoTA)

/* Endpoint Mahasiswa Controller*/
router.get('/api/mahasiswa', mahasiswaController.getAllMahasiswa)
router.get('/api/mahasiswa/:id', mahasiswaController.getMahasiswaById)
router.post('/api/mahasiswa', mahasiswaController.addMahasiswa)
router.put('/api/mahasiswa/:id',mahasiswaController.updateMahasiswa)
router.delete('/api/mahasiswa/:id', mahasiswaController.deleteMahasiswa)

/* Endpoint Relasi Controller*/
router.get('/api/relasi', relasiController.getAllRelasiKoTA)
router.get('/api/relasi/:id', relasiController.getRelasiKoTAById)
router.post('/api/relasi', relasiController.addRelasiKoTA)
router.put('/api/relasi/:id',relasiController.updateRelasiKoTA)
router.delete('/api/relasi/:id', relasiController.deleteRelasiKoTA)
router.put('/api/relasi/doSignature/:id', relasiController.doSignature)

/* Endpoint Laporan Controller*/
router.get('/api/laporan', laporanController.getAllLaporan)
router.get('/api/laporan/:id', laporanController.getLaporanById)
router.post('/api/laporan', laporanController.addLaporan)
// router.put('/api/laporan/:id',laporanController.updateLaporan)
router.delete('/api/laporan/:id', laporanController.deleteLaporan)
// router.put('/api/laporan/doSignature/:id', laporanController.doSignature)

/* Endpoint Prodi Controller*/
router.get('/api/secret', secretController.getAllSecretKey)
router.get('/api/secret/:id', secretController.getSecretKeyById)
router.post('/api/secret', secretController.addSecretKey)
router.put('/api/secret/:id',secretController.updateSecretKey)
router.delete('/api/secret/:id', secretController.deleteSecretKey)

module.exports = router;
