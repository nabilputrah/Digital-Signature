<template>
  <div>


    <!-- End HTML Lembar Pengesahan Halaman 2 -->
    <!-- End HTML Lembar Pengesahan Halaman 2 -->
    <div 
      :hidden="true"
    >
      <div id="pdf-content"
      style="width: 450pt; position: relative;"
        >
        <img src="../assets/logo-polban-82.png" class="background-image">
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
              <p>Ketua Program Studi {{ Prodi }} Teknik Informatika,</p>
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
          <br>
          <p class="text-size">i</p>
        </div>
      </div>
    </div>

    <!-- Start HTML Lembar Pengesahan Halaman 2 -->
    <!-- Start HTML Lembar Pengesahan Halaman 2 -->
    <!-- :hidden="true"     -->
    <div 

    >
      <div id="pdf-hal2"
      style="width: 450pt; position: relative;"
        >
        <img src="../assets/logo-polban-82.png" class="background-image">
        <div style="text-align: center;margin-top: 79pt;margin-left: 18pt;">
          <!-- <img width="100px" height="70px" src="../assets/logo-polban-81.png"> -->
          <strong style="font-size: 13px;line-height: 0 .47cm;word-spacing: 0.01cm;">
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
          <p class="text-size">Tugas Akhir ini telah disidangkan pada tanggal {{ this.laporan.tgl_disidangkan }}<br>sesuai dengan ketentuan.</p>
          <br>
          <p class="text-size">Tim Penguji:</p>
          <br>

          <v-row class="text-size" style="width: 76%;height: 300pt; margin-left: auto;margin-right: auto;">
            <v-col>
              <!-- <v-row dense> -->
              <v-row 
                dense
                align="center" 
                justify="center" 
                v-for="(dosen, index) in Penguji" :key="index">
                <v-col cols="2" >
                  <p>Penguji {{ (index+1) }}</p>
                </v-col>
                <v-col cols="1">
                  <p>:</p>
                </v-col>
                <v-col cols="6" style="text-align: left;">
                  <p>{{ dosen.nama }}</p>
                  <p>NIP. {{ dosen.NIP }}</p>
                </v-col>
                <v-col cols="3" >
                  <img width="100px" height="70px" src="../assets/TTD.png">
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <br>
          <br>
          <p class="text-size">ii</p>
        </div>
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

      Prodi:'',
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

        const responseAnggota = await axios.get('http://localhost:3000/api/mahasiswakota/' + id_kota);
        this.Anggota = responseAnggota.data.data;
        console.log(this.Anggota)

        const responseListLaporan = await axios.get('http://localhost:3000/api/laporankota/' +id_kota)
        this.laporan = responseListLaporan.data.data
        console.log(this.laporan)

        const responsePembimbing = await axios.get('http://localhost:3000/api/relasibykota/pembimbing/'+ this.laporan.id_KoTA)
        this.Pembimbing = responsePembimbing.data.data
        console.log(this.Pembimbing)

        const responsePenguji = await axios.get('http://localhost:3000/api/relasibykota/penguji/'+ this.laporan.id_KoTA)
        this.Penguji = responsePenguji.data.data
        console.log(this.Penguji)

        const responseKaprodi = await axios.get('http://localhost:3000/api/prodi/'+this.Anggota[0].id_prodi)
        this.kaprodiData = responseKaprodi.data.data
        console.log(this.kaprodiData)

        if (this.Anggota[0].id_prodi === 'PRD001'){
          this.Prodi = 'D4'
        }else if (this.Anggota[0].id_prodi === 'PRD002'){
          this.Prodi = 'D3'
        }

        const DataKaprodi = await axios.get('http://localhost:3000/api/dosen/'+ this.kaprodiData.NIP,)
        console.log(DataKaprodi.data.data)
        this.Kaprodi = DataKaprodi.data.data


        const responseKajur = await axios.get('http://localhost:3000/api/jurusan')
        this.Kajur = responseKajur.data.data[0]

        const DataKajur = await axios.get('http://localhost:3000/api/dosen/'+ this.Kajur.NIP,)
        console.log(DataKajur.data.data)
        this.Kajur = DataKajur.data.data

        this.convertDateDisetujui()
        this.convertDateDisidangkan()

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

    convertDateDisidangkan() {
      const date = new Date(this.laporan.tgl_disidangkan);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      this.laporan.tgl_disidangkan = year + '-' + month + '-' + day;
      const parsedDate = parseISO(this.laporan.tgl_disidangkan);
      const formatted = format(parsedDate, 'd MMMM yyyy', { locale: idLocale });
      this.laporan.tgl_disidangkan = formatted
     
    },

    generatePDF() {
      const doc = new jsPDF('p', 'pt', 'a4');
      
      const htmlContent = document.getElementById('pdf-content');
      const htmlContentHal2 = document.getElementById('pdf-hal2');

      // const img = new Image()
      // img.src = '../assets/logo-polban-81.png'
      
      // var img = new Image();
      // img.src = path.resolve('./assets/logo-polban-81.png');

      // const srcImg = "../assets/logo-polban-81.png";

      // const width = doc.internal.pageSize.getWidth();
      // const height = doc.internal.pageSize.getHeight();

      // doc.addImage(srcImg, 'PNG', 0, 0, width, height)

      doc.html(htmlContentHal2, {
        callback: () => {
          // doc.addImage(img, 'png', 0, 0, width, height)
          doc.insertPage(1);
          doc.html(htmlContent, {
            callback: () => {
              doc.save('report.pdf');
            },
            x: 0, // Mengatur margin kiri (4 cm = 0 pt)
            y: 0, // Mengatur margin atas (4 cm = 0 pt)
          });
        },
        x: 0, // Mengatur margin kiri (4 cm = 0 pt)
        y: 0, // Mengatur margin atas (4 cm = 0 pt)
      });

    },
  },
};
</script>

<style scoped>
.background-image {
  position: absolute;
  top: 0;
  width: 80%;
  height: 500pt;
  margin-left: 12%;
  z-index: -1;
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
