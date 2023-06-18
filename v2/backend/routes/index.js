var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs')



// const pdfjs = requi('pdfjs-dist/build/pdf');
// const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry');

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const userController = require('../controllers').user;
const dosenController = require('../controllers').dosen;
const jurusanController = require('../controllers').jurusan;
const jabatanController = require('../controllers').jabatan;
const prodiController = require('../controllers').prodi;
const koordinatorController = require('../controllers').koordinator;
const koTAController = require('../controllers').kota;
const mahasiswaController = require('../controllers').mahasiswa;
const relasiController = require('../controllers').relasi_kota;
const laporanController = require('../controllers').laporan;
const secretController = require('../controllers').secret_key;
const dokumenController = require('../controllers').dokumen;

const { verifyTokenAndRoleKoordinator } = require('../controllers/user');


// waktu indonesia 

router.get('/pdf', (req, res) => {
  const filePath = path.resolve('./uploads/img_ttd/','2023-05-02-235405-12040-38521-1-PB.pdf');
  console.log(filePath)
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
    const chunksize = (end-start) + 1;
    const file = fs.createReadStream(filePath, {start, end});
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'application/pdf',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'application/pdf',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', andika:'andika' });
});

router.get('/pdf', (req, res) => {
  // Menampilkan file PDF pada halaman HTML
  res.send(`
    <html>
      <body>
        <iframe src="/uploads/img_ttd/2023-05-02-235405-Andika_4034.pdf" width="100%" height="100%" type='application/pdf'>
      </body>
    </html>
  `);
});



/* Endpoint User Controller */ 
router.post('/api/signupuser/koordinatord4', userController.signUpUserKoorD4)
router.post('/api/signupuser/koordinatord3', userController.signUpUserKoorD3)
router.post('/api/signupuser/dosen', userController.signUpUserDosen)
router.post('/api/signupuser/kota', userController.signUpUserKoTA)
router.post('/api/signup', userController.signUpUser)
router.post('/api/login', userController.loginUser)
router.post('/api/checkCurrentPassword', userController.checkValidPassword)
router.post('/api/forgotPassword', userController.forgotPassword)
router.get('/api/getkoordata/:id',verifyTokenAndRoleKoordinator, userController.getKoordinatorWithProdi)
router.get('/api/getdosendata/:id',userController.getDosenWithUser)
router.get('/api/getkotadata/:id',userController.getKoTAWithUser)
router.get('/api/user',verifyTokenAndRoleKoordinator, userController.getAllUser)
router.get('/api/user/:id', userController.getUserById)
router.post('/api/user', userController.addUser)
router.put('/api/user/:id',userController.updateUser)
router.delete('/api/user/:id', userController.deleteUser);
router.put('/api/user/change-password/:id',userController.changeUserPassword)

/* Endpoint Dosen Controller */ 
router.get('/api/dosen', dosenController.getAllDosen)
router.post('/api/dosen', dosenController.addDosen)
router.get('/api/dosen/:id', dosenController.getDosenByNIP)
router.get('/api/checkkajurkaprodi', dosenController.checkIsExistKaprodiKajur)
router.put('/api/dosen/:id',dosenController.updateDosen)
router.delete('/api/dosen/:id', dosenController.deleteDosen);
router.post('/api/dosenimport/', dosenController.importAllDosenWithUser)
router.post('/api/dosen/sendemail/:id', dosenController.sendEmailAccountDosen)

/* Endpoint Jurusan Controller*/
router.get('/api/jurusan', jurusanController.getAllJurusan)
router.get('/api/jurusan/:id', jurusanController.getJurusanById)
router.post('/api/jurusan', jurusanController.addJurusan)
router.put('/api/jurusan/:id',jurusanController.updateJurusan)
router.delete('/api/jurusan/:id', jurusanController.deleteJurusan)

/* Endpoint Jabatan Controller*/
router.get('/api/jabatan', jabatanController.getAllJabatan)
router.get('/api/jabatan/:id', jabatanController.getJabatanById)
router.post('/api/jabatan', jabatanController.addJabatan)
router.put('/api/jabatan/:id',jabatanController.updateJabatan)
router.delete('/api/jabatan/:id', jabatanController.deleteJabatan)

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
router.get('/api/KoTA/Prodi/:id', koTAController.getAllKoTAByIdProdi)
router.post('/api/KoTA', koTAController.addKoTA)
router.put('/api/KoTA/:id',koTAController.updateKoTA)
router.delete('/api/KoTA/:id', koTAController.deleteKoTA)
router.delete('/api/KoTAwithLaporan/:id', koTAController.deleteKoTAWithLaporan)

/* Endpoint Mahasiswa Controller*/
router.get('/api/mahasiswa/:prodi_koordinator', mahasiswaController.getAllMahasiswa)

router.get('/api/mahasiswakota/:id', mahasiswaController.getAllMahasiswaByKoTA)
router.get('/api/mahasiswa/nullkotad4', mahasiswaController.getAllMahasiswaNullKoTAD4)
router.get('/api/mahasiswa/nullkotad3', mahasiswaController.getAllMahasiswaNullKoTAD3)
router.get('/api/mahasiswa/:id', mahasiswaController.getMahasiswaById)
router.get('/api/mahasiswa/checkunique/NIM/:id', mahasiswaController.checkUniqueNIM)
router.post('/api/mahasiswa', mahasiswaController.addMahasiswa)
router.put('/api/mahasiswa/:id',mahasiswaController.updateMahasiswa)
router.put('/api/mahasiswaWithoutIsKetua/:id',mahasiswaController.updateMahasiswaWithoutIsKetua)
router.delete('/api/mahasiswa/:id', mahasiswaController.deleteMahasiswa)
router.post('/api/mahasiswad4import/', mahasiswaController.importMahasiswaD4)
router.post('/api/mahasiswad3import/', mahasiswaController.importMahasiswaD3)

router.post('/api/mahasiswa/sendemail/:id', mahasiswaController.sendEmailtoKoTA)

router.put('/api/mahasiswastatus/:id',mahasiswaController.updateMahasiswaStatusKoTA)

/* Endpoint Relasi Controller*/
router.get('/api/relasi', relasiController.getAllRelasiKoTA)
router.get('/api/relasi/KoTA/:id', relasiController.getRelasiPerKoTA)
router.get('/api/relasibykota/pembimbing/:id', relasiController.getAllRelasiKoTAByPemKoTA)
router.get('/api/relasibykota/penguji/:id', relasiController.getAllRelasiKoTAByPenKoTA)
router.get('/api/relasibynip/:id', relasiController.getAllRelasiByNIP)
router.get('/api/relasi/:id', relasiController.getRelasiKoTAById)
router.get('/api/tglttd/relasi/:NIP/:role/:id_KoTA', relasiController.getTglTTDRelasi)
router.post('/api/relasi', relasiController.addRelasiKoTA)
router.put('/api/relasi/:id',relasiController.updateRelasiKoTA)
router.delete('/api/relasi/:id', relasiController.deleteRelasiKoTA)
// router.put('/api/relasi/doSignature/:id', relasiController.doSignature)
router.post('/api/relasi/doSignature/', relasiController.doSignatureDosen)
router.get('/api/relasi/gambarttd/:NIP/:role/:id_KoTA', relasiController.getGambarTTDRelasi)
router.get('/api/relasi/accessttd/:role/:id_KoTA', relasiController.getAccessTTD)
router.delete('/api/relasi/deletettd/:id', relasiController.deleteImageTTDRelasiKoTA)

/* Endpoint Laporan Controller*/
router.put('/api/laporan/addDokumen', laporanController.addDokumen)
router.get('/api/laporan/openDokumen/:id', laporanController.openDokumen)
router.put('/api/laporan/deleteDokumen/:id', laporanController.deleteDokumen)
router.get('/api/laporan', laporanController.getAllLaporan)
router.get('/api/laporan/:id', laporanController.getLaporanById)
router.get('/api/laporankota/:id', laporanController.getLaporanByKoTA)
router.get('/api/lembarpengesahan/:id', laporanController.getLembarPengesahan)
router.get('/api/ceklembarpengesahan/:id', laporanController.checkLembarPengesahan)
router.post('/api/laporan', laporanController.addLaporan)
router.put('/api/laporan/:id',laporanController.updateLaporan)
router.put('/api/laporanidkota/:id',laporanController.updateIdKoTALaporan)
router.put('/api/lembarpengesahan/:id',laporanController.updateLembarPengesahan)
router.delete('/api/laporan/:id', laporanController.deleteLaporan)
router.get('/api/getstatuskajur/:id', laporanController.getStatusKajur)
router.get('/api/getstatuscanTTD/:id', laporanController.getStatusCanTTD)
// router.put('/api/laporan/doSignature/:id', laporanController.doSignature)

/* Endpoint Prodi Controller*/
router.get('/api/secret', secretController.getAllSecretKey)
router.get('/api/secret/:id', secretController.getSecretKeyById)
router.post('/api/secret', secretController.addSecretKey)
router.post('/api/sharekey', secretController.createShareKey)
router.post('/api/getonesharekey', secretController.getOneShareKey)
router.put('/api/secret/:id',secretController.updateSecretKey)
router.delete('/api/secret/:id', secretController.deleteSecretKey)
router.delete('/api/secretidlaporan/:id', secretController.deleteSecretKeyByIDLaporan)
router.post('/api/secret/sendemail/', secretController.sendShareKeyToDosen)

/* Endpoint Dokumen Controller*/
router.post('/api/dokumen', dokumenController.addDokumen)
// router.get('/api/dokumen', dokumenController.getAllDokumen)
router.get('/api/dokumen/:id', dokumenController.getDokumenByID)
router.delete('/api/dokumen/:id', dokumenController.deleteDokumen)
router.get('/api/dokumenlaporan/:id/', dokumenController.getAllDokumenByIdLaporan)
router.get('/api/dokumenversion/:id/', dokumenController.getDokumenVersionByKoTA)
router.post('/api/dokumen/merge/', dokumenController.mergePDF)
router.post('/api/dokumen/validate/', dokumenController.validateDocument)
module.exports = router;
