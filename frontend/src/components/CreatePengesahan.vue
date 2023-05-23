<template>
  <div>
    <div id="pdf-content"
    style="width: 459pt; position: relative;"
      >
      <img src="../assets/logo-polban-81.png" alt="Background Image" class="background-image">
      <div style="text-align: center;margin-top: 79pt;margin-left: 18pt;">
        <strong style="font-size: 13px;line-height: 0.47cm;word-spacing: 0.01cm;">
          <p v-html="Judul_TA"></p>
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
        <p class="text-size">Bandung {{ formattedDate }}</p>
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

export default {
  data: () => ({
      Judul_TA: '<p>PENGEMBANGAN SISTEM <em>MULTI-USER DIGITAL</em></p><p><em>SIGNATURE</em> UNTUK LAPORAN TUGAS AKHIR&nbsp;</p><p>DENGAN METODE<em> SECRET</em></p><p><em>SHARING SCHEME</em></p>',
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

  computed: {
    formattedDate() {
      const parsedDate = parseISO(this.tanggal_disetujui);
      const formatted = format(parsedDate, 'd MMMM yyyy', { locale: idLocale });
      return formatted;
    }
  },

  methods: {
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
