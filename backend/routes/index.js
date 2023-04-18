var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;
const dosenController = require('../controllers').dosen;
const jurusanController = require('../controllers').jurusan;
const prodiController = require('../controllers').prodi;
const koordinatorController = require('../controllers').koordinator;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Endpoint User Controller */ 
router.get('/api/user', userController.getAllUser)
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

// router.get('/api/classroom/:id', classroomController.getById);
// router.post('/api/classroom', classroomController.add);

// router.delete('/api/classroom/:id', classroomController.delete);

module.exports = router;
