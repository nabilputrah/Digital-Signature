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
          <p class="text-size">Bandung {{ this.tanggal_disetujui }}</p>
          <br>
          <v-row class="text-size" style="width: 80%;margin-left: auto;margin-right: auto;">
            <v-col >
              <p>Pembimbing 1,</p>
              <img width="160px" height="110px" :src=Pembimbing[0].img>
              <p>{{ Pembimbing[0].nama }}</p>
            </v-col>
            <v-col cols="1">
            </v-col>
            <v-col >
              <p>Pembimbing 2,</p>
              <img width="160px" height="110px" :src=Pembimbing[1].img>
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
              <img width="160px" height="110px" :src="Kajur.img">
              <p>{{ Kajur.nama }}</p>
            </v-col>
            <v-col cols="1">
            </v-col>
            <v-col >
              <p>Ketua Program Studi {{ Prodi }} Teknik Informatika,</p>
              <img width="160px" height="110px" :src="Kaprodi.img">
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
    <div 
      :hidden="true"      
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
          <p class="text-size">Tugas Akhir ini telah disidangkan pada tanggal {{ this.tanggal_disidangkan }}<br>sesuai dengan ketentuan.</p>
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
                  <!-- <img width="100px" height="70px" src="../assets/uploads/img_ttd/20224022023/Penguji_234234234234234232.png"> -->
                  <img 
                    width="100px" 
                    height="70px" 
                    :src="dosen.img"
                    >
                  <!-- <img src="imageURL" alt=""> -->
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
    <!-- <button @click="generatePDF">Generate PDF</button> -->
    <!-- <button @click="Do_Sign"> Tanda Tangan</button> -->

    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Dokumen Laporan TA</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :exact="true"
      to="/KoTA/dokumen_detail">
        <span>Dokumen Laporan TA</span>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/KoTA/dokumen_detail/lembar_pengesahan">
        <span>Lembar Pengesahan</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <v-row class="custom-card" >
      <v-col cols="6" :hidden="pdfNotExist">
        <!-- Start Dialog Buka Dokumen -->
        <div id="pdfContainer"></div>
        <!-- End Dialog Buka Dokumen -->
        <!-- <iframe :src="pdfUrl" width="100%" height="600px"></iframe> -->
      </v-col>

      <v-col cols="6">
        <v-card style="height: 100%;">
          <div class="signature-page">
                <h2>Detail Laporan</h2>
                <br>
                <v-form v-model="inputValid">
                  <v-row>
                    <v-col>
                      <span 
                        style="font-size:1rem;"
                      >Judul Tugas Akhir</span>
                      <vue-editor
                      v-model="laporan.judul_TA"
                      :rules="rules"
                      :editorToolbar="customToolbar"
                      placeholder="Judul Tugas Akhir"
                      ></vue-editor>
                  </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <span 
                        style="font-size:1rem;"
                      >Tanggal Disetujui</span>
                      <v-dialog
                        ref="dialog"
                        v-model="menu_disetujui"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="laporan.tgl_disetujui"
                            placeholder="Tanggal Disetujui"
                            dense
                            outlined
                            :rules = "rules"
                            clearable
                            readonly
                            append-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="laporan.tgl_disetujui"
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu_disetujui = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="menu_disetujui = false"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <span 
                        style="font-size:1rem;"
                      >Tanggal Disidangkan</span>
                      <v-dialog
                        ref="dialog"
                        v-model="menu_disidangkan"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="laporan.tgl_disidangkan"
                            placeholder="Tanggal Disetujui"
                            dense
                            outlined
                            :rules = "rules"
                            clearable
                            readonly
                            append-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="laporan.tgl_disidangkan"
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu_disidangkan = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="menu_disidangkan = false"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-row >
                    <v-col class="text-right" >
                      <v-btn color="primary" :disabled="!inputValid" @click="save">Buat Lembar Pengesahan</v-btn>
                    </v-col>
                  </v-row> 
                </v-form>
          </div>
        </v-card>
      </v-col>

    </v-row>

  <v-snackbar 
    v-model="snackbar.show" 
    :color="snackbar.color" 
    top 
    right 
    :timeout="3000"
    style="margin-right: 1%;"
  >
    <span>
      {{ snackbar.message }}
    </span>
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="snackbar.show = false">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>

  <!-- Start animasi loading section -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
  <!-- End animasi loading section -->

  </div>
</template>
      
<script>
import jsPDF from 'jspdf';
import PDFObject from 'pdfobject';
import { VueEditor } from "vue2-editor";
import { format, parseISO } from 'date-fns';
import idLocale from 'date-fns/locale/id';
import axios from 'axios'

export default {
  components: {
    VueEditor
  },
  data: () => ({
      dataFromToken: '',
      Judul_TA: '<p>PENGEMBANGAN SISTEM <em>MULTI-USER DIGITAL</em></p><p><em>SIGNATURE</em> UNTUK LAPORAN TUGAS AKHIR&nbsp;</p><p>DENGAN METODE<em> SECRET</em></p><p><em>SHARING SCHEME</em></p>',
      kota:'',
      laporan:'',
      pembimbingKoTA:[],
      pdfNotExist:true,

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
      Penguji:'',
      Kaprodi : {
        nama:'Djoko Cahyo Utomo L., S.Kom., M.MT.', NIP:'197201061999031555', TTD:'',
      },

      Kajur : {
        nama:'Djoko Cahyo Utomo L., S.Kom., M.MT.', NIP:'197201061999031999', TTD:'',
      },

      tanggal_disetujui: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      tanggal_disidangkan : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

      // Start Data Form
      customToolbar: [
        [ "italic"],
        [ { align: "center" }]
      ],
      inputValid:false,
      rules: [
        value => !!value || 'Required.',
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      pdfUrl: 'https://example.com/path-to-your-pdf.pdf',
      menu_disetujui : false,
      menu_disidangkan : false,
      // End Data Form

      // Notifikasi Berhasil
      snackbar: {
          show: false,
          message: "",
          color: "",
      },
      isLoading : false
    }),

  mounted () {
     const token = localStorage.getItem('token');

      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.dataFromToken= payload.user;
      }
    this.checkLembarPengesahan()
    this.initialize()
  },

  methods: {
    async checkLembarPengesahan(){
      const responseKoTA = await axios.get(`http://localhost:3000/api/getkotadata/${this.dataFromToken.id_user}`)
      this.kota = responseKoTA.data.data[0]
      console.log(this.kota.id_KoTA)
      const response = await axios.get(`http://localhost:3000/api/ceklembarpengesahan/Laporan_${this.kota.id_KoTA}`)
      const message = response.data.message
      console.log(message)

      console.log(message)
      if (message === 'lembar pengesahan ada'){
        this.pdfNotExist = false
      }
    },

    async initialize () {

    try {
        const response = await axios.get(`http://localhost:3000/api/getkotadata/${this.dataFromToken.id_user}`)
        this.kota = response.data.data[0]
        console.log(this.kota)
        const id_kota = this.kota.id_KoTA

        const responseAnggota = await axios.get('http://localhost:3000/api/mahasiswakota/' + id_kota);
        this.Anggota = responseAnggota.data.data;

        const responseListLaporan = await axios.get('http://localhost:3000/api/laporankota/' +id_kota)
        this.laporan = responseListLaporan.data.data

        // Get Data Pembimbing
        const responsePembimbing = await axios.get('http://localhost:3000/api/relasibykota/pembimbing/'+ this.laporan.id_KoTA)
        this.Pembimbing = responsePembimbing.data.data

        // Get Image TTD Pembimbing
        try {
          this.Pembimbing[0].img = 'http://localhost:3000/api/relasi/gambarttd/'+ this.Pembimbing[0].NIP +'/Pembimbing/'+ this.laporan.id_KoTA
          this.Pembimbing[1].img = 'http://localhost:3000/api/relasi/gambarttd/'+ this.Pembimbing[1].NIP +'/Pembimbing/'+ this.laporan.id_KoTA
        } catch (error) {
          console.error(error);
        }

        // Get Data Penguji
        const responsePenguji = await axios.get('http://localhost:3000/api/relasibykota/penguji/'+ this.laporan.id_KoTA)
        this.Penguji = responsePenguji.data.data

        // Get Image TTD Penguji
        this.Penguji.forEach(async (item) => {
          try {
            item.img = 'http://localhost:3000/api/relasi/gambarttd/'+ item.NIP +'/Penguji/'+ this.laporan.id_KoTA
          } catch (error) {
            console.error(error.message);
          }
        });

        // Get Data Kaprodi
        const responseKaprodi = await axios.get('http://localhost:3000/api/prodi/'+this.Anggota[0].id_prodi)
        this.kaprodiData = responseKaprodi.data.data

        if (this.Anggota[0].id_prodi === 'PRD001'){
            this.Prodi = 'D4'
        }else if (this.Anggota[0].id_prodi === 'PRD002'){
            this.Prodi = 'D3'
        }

        const DataKaprodi = await axios.get('http://localhost:3000/api/dosen/'+ this.kaprodiData.NIP,)
        this.Kaprodi = DataKaprodi.data.data    

        // Get Data Kajur
        const responseKajur = await axios.get('http://localhost:3000/api/jurusan')
        this.Kajur = responseKajur.data.data[0]    
        const DataKajur = await axios.get('http://localhost:3000/api/dosen/'+ this.Kajur.NIP,)
        this.Kajur = DataKajur.data.data

        // Get TTD image Kajur n Kaprodi
        try {
          this.Kaprodi.img = 'http://localhost:3000/api/relasi/gambarttd/'+ this.Kaprodi.NIP +'/Kaprodi/'+ this.laporan.id_KoTA
          this.Kajur.img = 'http://localhost:3000/api/relasi/gambarttd/'+ this.Kajur.NIP +'/Kajur/'+ this.laporan.id_KoTA
        } catch (error) {
          console.error(error.message.request);
        }

        if (this.laporan.tgl_disidangkan){
            this.convertDateDisidangkan()
        }
        else {
          this.laporan.tgl_disidangkan = ''
        }
        if (this.laporan.tgl_disetujui){
            this.convertDateDisetujui()
        }
        else {
          this.laporan.tgl_disetujui = ''
        }

        // this.convertDateDisetujui()
        // this.convertDateDisidangkan()
        this.convertDateDibuat()

        this.checkLembarPengesahan()

        const responsePDF = await axios.get('http://localhost:3000/api/lembarpengesahan/'+ this.laporan.id_laporan,{responseType:'blob'})
        this.pdfUrl = URL.createObjectURL(responsePDF.data);
        this.showPdf();

      } catch (error) {
        console.error(error.message);
      }
    },

    showPdf() {
      const pdfContainer = document.getElementById('pdfContainer');
      PDFObject.embed(this.pdfUrl, pdfContainer, {
        pdfOpenParams: {
          navpanes: 0,
          toolbar: 0,
          statusbar: 1,
          zoom:70,
        },
        callback: this.customizePdfToolbar,
        width: '100%',
        height: 'calc(100vh - 100px)', // Mengurangi tinggi toolbar Vuetify
      });
    },
    
    convertDateDisetujui() {
      const date = new Date(this.laporan.tgl_disetujui);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      this.laporan.tgl_disetujui = year + '-' + month + '-' + day;
      const parsedDate = parseISO(this.laporan.tgl_disetujui);
      const formatted = format(parsedDate, 'd MMMM yyyy', { locale: idLocale });
      this.tanggal_disetujui = formatted
     
    },

    convertDateDisidangkan() {
      const date = new Date(this.laporan.tgl_disidangkan);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      this.laporan.tgl_disidangkan = year + '-' + month + '-' + day;
      const parsedDate = parseISO(this.laporan.tgl_disidangkan);
      const formatted = format(parsedDate, 'd MMMM yyyy', { locale: idLocale });
      this.tanggal_disidangkan = formatted
     
    },

    convertDateDibuat() {
      if (this.tanggal_TTD){
        const dateAsli = new Date(this.tanggal_TTD);
        const durasi = 7 * 60 * 60 * 1000;
        let date = new Date(dateAsli.getTime() + durasi);
        const year = date.toISOString().substring(0, 4);
        const month = date.toISOString().substring(5, 7);
        const day = date.toISOString().substring(8, 10);
        const hours = date.toISOString().substring(11, 13);
        const minute = date.toISOString().substring(14, 16);
        const second = date.toISOString().substring(17, 19);
        return this.tanggal_TTD = year + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
      }
      else {
        return ''
      }
    },

    async save() {
      this.isLoading = true
      await axios({
          method:'put',
          url: 'http://localhost:3000/api/laporan/'+ this.kota.id_KoTA,
          data: this.laporan
        })
        .then(response => {
        
          console.log(response.data)
          this.snackbar.show = true;
          this.snackbar.color = "primary";
          this.snackbar.message = "Perubahan data Dokumen Laporan TA berhasil disimpan";

          // Convert Tanggal di lembar Pengesahan
          this.tanggal_disetujui = parseISO(this.laporan.tgl_disetujui);
          this.tanggal_disetujui = format(this.tanggal_disetujui, 'd MMMM yyyy', { locale: idLocale });

          this.tanggal_disidangkan = parseISO(this.laporan.tgl_disidangkan);
          this.tanggal_disidangkan = format(this.tanggal_disidangkan, 'd MMMM yyyy', { locale: idLocale });
          this.generatePDF()
  
        })
        .catch(error => {
            console.log(error.request.response)
            this.MessageError = error.request.response
            if (this.MessageError.includes('email')){
              this.snackbar.show = true;
              this.snackbar.color = "error";
              this.snackbar.message = "Email Sudah Terdaftar!!!";
            }
        })   
    },

    generatePDF() {
      const doc = new jsPDF('p', 'pt', 'a4');
      
      const htmlContent = document.getElementById('pdf-content');
      const htmlContentHal2 = document.getElementById('pdf-hal2');

      doc.html(htmlContentHal2, {
      callback: () => {
          doc.insertPage(1);
          doc.html(htmlContent, {
          callback: async () => {
              const blob = doc.output('blob')
              
              const formData = new FormData()

              formData.append('lembar_pengesahan',blob)

              await axios.put('http://localhost:3000/api/lembarpengesahan/'+ this.laporan.id_laporan, formData, {
                headers : {
                  'Content-Type' : 'multipart/form-data'
                }
              })
                .then(response => {
                  console.log(response.data);
                  this.validasiDokumen = !this.validasiDokumen;
                  this.file = null
                  this.snackbar.show = true;
                  this.snackbar.color = "primary";
                  this.snackbar.message = "Lembar Pengesahan berhasil dibuat";
                })
                .catch(error => {
                  console.log(error.message);
                  this.validasiDokumen = !this.validasiDokumen;
                  this.file = null
                  this.snackbar.show = true;
                  this.snackbar.color = "error";
                  this.snackbar.message = "Lembar Pengesahan gagal dibuat";
                });
                this.initialize()
                this.isLoading = false
              // doc.save('report.pdf');
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

  .custom-card {
    width: 97%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    margin-bottom: 2%;
  }
  .signature-page {
    padding: 20px;
  }
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

  .theme--light.v-sheet{
    color: #1a5f7a;
  }

  .theme--light.v-card .v-card__text{
    color: #1a5f7a;
  }
  

/* Animasi Loading */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #ffffff;
  border-top-color: #1A5F7A;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
