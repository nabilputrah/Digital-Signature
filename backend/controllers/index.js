const user = require('./user');
const dosen = require('./dosen');
const jurusan = require('./jurusan');
const prodi = require('./prodi');
const koordinator = require('./koordinator');
const kota = require('./kota');
const mahasiswa = require('./mahasiswa');
const relasi_kota = require('./relasikota');
const laporan = require('./laporan');
const secret_key = require('./secretkey');

module.exports = {
  user,
  dosen,
  jurusan,
  prodi,
  koordinator,
  kota,
  mahasiswa,
  relasi_kota,
  laporan,
  secret_key
};
