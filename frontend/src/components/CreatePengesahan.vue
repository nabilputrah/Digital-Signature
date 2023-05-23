<template>
  <div>
    <div id="pdf-content"
    style="width: 459pt; position: relative;"
      >
      <img src="../assets/logo-polban-81.png" alt="Background Image" class="background-image">
      <div style="text-align: center;margin-top: 79pt;margin-left: 18pt;">
        <strong style="font-size: 13px;line-height: 0.47cm;word-spacing: 0.01cm;">
          <p v-html="laporan.judul_TA"></p>
        </strong>
        <br>
        <p class="text-size">Oleh:</p>
        <br>
        <br>
        <v-row dense class="text-size" style="width: 50%;margin-left: auto;margin-right: auto;">
          <v-col>
            <v-row dense v-for="mahasiswa in Anggota" :key="mahasiswa.NIM">
              <v-col cols="8">
                <p style="text-align: left;">
                  <b>{{ mahasiswa.nama }}</b>
                </p>
              </v-col>
              <v-col cols="4">
                <p>
                  <b>NIM {{ mahasiswa.NIM }}</b>
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <br>
        <br>
        <p class="text-size">Menyetujui</p>
        <br>
        <p class="text-size">Bandung {{ this.laporan.tgl_disetujui }}</p>
        <br>
        <v-row class="text-size" style="width: 80%;margin-left: auto;margin-right: auto;">
          <v-col >
            <p>Pembimbing 1,</p>
            <img width="160px" height="110px" src="../assets/TTD.png">
            <p>{{ Pembimbing[0].nama }}</p>
          </v-col>
          <v-col cols="1">
          </v-col>
          <v-col >
            <p>Pembimbing 2,</p>
            <img width="160px" height="110px" src="../assets/TTD.png">
            <p>{{ Pembimbing[1].nama }}</p>
          </v-col>
        </v-row>
        <v-row dense class="text-size" style="width: 80%;margin-left: auto;margin-right: auto;">
          <v-col >
            <p>NIP {{ Pembimbing[0].NIP }}</p>
            <br>
          </v-col>
          <v-col cols="1">
          </v-col>
          <v-col >
            <p>NIP {{ Pembimbing[1].NIP }}</p>
            <br>
          </v-col>
        </v-row>
        <v-row class="text-size" style="width: 80%;margin-left: auto;margin-right: auto;">
          <v-col >
            <p>Ketua Jurusan Teknik Komputer dan Infomatika,</p>
            <img width="160px" height="110px" src="../assets/TTD.png">
            <p>{{ Kajur.nama }}</p>
          </v-col>
          <v-col cols="1">
          </v-col>
          <v-col >
            <p>Ketua Program Studi D3 Teknik Informatika,</p>
            <img width="160px" height="110px" src="../assets/TTD.png">
            <p>{{ Kaprodi.nama }}</p>
          </v-col>
        </v-row>
        <v-row dense class="text-size" style="width: 80%;margin-left: auto;margin-right: auto;">
          <v-col >
            <p>NIP {{ Kajur.NIP }}</p>
            <br>
          </v-col>
          <v-col cols="1">
          </v-col>
          <v-col >
            <p>NIP {{ Kaprodi.NIP }}</p>
            <br>
          </v-col>
        </v-row>
        <br>
        <p>i</p>
      </div>
    </div>
    <button @click="generatePDF">Generate PDF</button>
  </div>
</template>
      
<script>
import jsPDF from 'jspdf';
import { format, parseISO } from 'date-fns';
import idLocale from 'date-fns/locale/id';
import axios from 'axios'

export default {
  data: () => ({
      dataFromToken: '',
      Judul_TA: '<p>PENGEMBANGAN SISTEM <em>MULTI-USER DIGITAL</em></p><p><em>SIGNATURE</em> UNTUK LAPORAN TUGAS AKHIR&nbsp;</p><p>DENGAN METODE<em> SECRET</em></p><p><em>SHARING SCHEME</em></p>',
      kota:'',
      laporan:'',
      pembimbingKoTA:[],

      Anggota : [
        {nama:'Andika Yudha Riyanto', NIM:'191524034'},
        {nama:'Nabil Putra Hadiyani', NIM:'191524053'}
      ],

      Pembimbing : [
        {nama:'Djoko Cahyo Utomo L., S.Kom., M.MT.', NIP:'197201061999031001', TTD:''},
        {nama:'Muhammad Rizqi Sholahuddin, S.Si., M.T.', NIP:'197201061999031123', TTD:''},
        {nama:'Muhammad Rizqi Sholahuddin, S.Si., M.T.', NIP:'197201061999031002', TTD:''},
      ],

      Kaprodi : {
        nama:'Djoko Cahyo Utomo L., S.Kom., M.MT.', NIP:'197201061999031555', TTD:'',
      },

      Kajur : {
        nama:'Djoko Cahyo Utomo L., S.Kom., M.MT.', NIP:'197201061999031999', TTD:'',
      },

      tanggal_disetujui: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),

  mounted () {
     const token = localStorage.getItem('token');

      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.dataFromToken= payload.user;
      }
    this.initialize()
  },

  methods: {
    async initialize () {

    try {
        const response = await axios.get(`http://localhost:3000/api/getkotadata/${this.dataFromToken.id_user}`)
        this.kota = response.data.data[0]
        console.log(this.kota)
        const id_kota = response.data.data[0].id_KoTA

        const responseListLaporan = await axios.get('http://localhost:3000/api/laporankota/' +id_kota)
        this.laporan = responseListLaporan.data.data
        console.log(this.laporan)

        const responsePembimbing = await axios.get('http://localhost:3000/api/relasibykota/pembimbing/'+ this.laporan.id_KoTA)
        this.Pembimbing = responsePembimbing.data.data
        console.log(this.Pembimbing)

        const responseRelasi = await axios.get('http://localhost:3000/api/relasi/KoTA/' + id_kota)
        this.Pengampu = responseRelasi.data.data
        console.log(this.Pengampu)

        // const responseKajur = await axios.get('http://localhost:3000/api/jurusan')
        // this.Kajur = responseKajur.data.data[0]
        // const DataKajur = await axios.get('http://localhost:3000/api/dosen/'+ this.Kajur.NIP,)
        // console.log(DataKajur.data.data)
        // this.Kajur = DataKajur.data.data

        this.convertDateDisetujui()
        // this.convertDateDisidangkan()

      } catch (error) {
        console.error(error.message);
      }
    },

    convertDateDisetujui() {
      const date = new Date(this.laporan.tgl_disetujui);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      this.laporan.tgl_disetujui = year + '-' + month + '-' + day;
      const parsedDate = parseISO(this.laporan.tgl_disetujui);
      const formatted = format(parsedDate, 'd MMMM yyyy', { locale: idLocale });
      this.laporan.tgl_disetujui = formatted
     
    },

    generatePDF() {
      const doc = new jsPDF('p', 'pt', [612, 792]);
      

      const htmlContent = document.getElementById('pdf-content');
      // const xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(htmlContent) * doc.internal.getFontSize() / 2);
      // Menyesuaikan ukuran teks
      doc.html(htmlContent, {
        callback: () => {
          doc.save('report.pdf');
        },
        x: 0, // Mengatur margin kiri (4 cm = 0 pt)
        y: 0, // Mengatur margin atas (4 cm = 0 pt)
      });

    },
  },
};
</script>

<style>
.background-image {
  position: absolute;
  top: 0;
  /* left: 0; */
  width: 80%;
  height: 100%;
  margin-left: 12%;
  /* object-fit: cover; */
  z-index: -1; /* Untuk memposisikan gambar di belakang konten lain */
}
.columnName{
  width: 70%;
  display: inline-block;
}

.text-size{
  font-size: 11px;
}

.columnNIM{
  float: left;
}

.column {
  background-color: red;
  margin-left: auto;
  margin-right: auto;
  float: left;
  width: 30%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
