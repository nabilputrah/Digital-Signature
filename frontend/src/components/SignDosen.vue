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
      <button @click="generatePDF">Generate PDF</button>
      <button @click="Do_Sign"> Tanda Tangan</button>


    <!-- Start Card Upload Dokumen -->
    <v-dialog
    v-model="validasiDokumen"
    class="text-center" 
    max-width="600"
    color="white"
    >
    <v-card >
        <v-card-title class="headline">Pilih Gambar Tanda Tangan</v-card-title>
        <v-card-text>
          <v-tabs v-model="tab">
            <v-tab v-for="(item, index) in InputFile" :key="index">{{ item.text }}</v-tab>

            <v-tab-item v-for="(item, index) in InputFile" :key="index">
              <v-card flat>
                <v-card-text>
                  <v-form ref="form" @submit.prevent="validateFile">
                    <template v-if="item.text === 'Browse'">
                      <v-file-input
                        v-model="file"
                        label="Pilih File"
                        accept=".png"
                        prepend-icon="mdi-paperclip"
                      ></v-file-input>
                    </template>
                    <template v-if="item.text === 'Drop'">
                      <div 
                        class="drop-area" 
                        @dragenter="dragEnter" 
                        @dragover="dragOver" 
                        @dragleave="dragLeave" 
                        @drop="dropFile">
                        <div v-if="!file">
                          <v-icon class="mr-2" style="color: rgba(145, 187, 203, 1);">mdi-folder-outline</v-icon>
                          <span class="placeholder">Drag and drop file here</span>
                        </div>
                        <div v-else class="file-info">
                          <span class="file-name">{{ file.name }}</span>
                          <button class="remove-button" @click="removeFile">Remove</button>
                        </div>
                      </div>
                    </template>
                    <v-alert
                      v-if="validationError"
                      type="error"
                      dismissible
                    >
                      {{ validationError }}
                    </v-alert>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="close_Popup_AddDokumen">Kembali</v-btn>
          <v-btn color="primary" @click="add_Dokumen_succes">Unggah Dokumen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Card Upload Dokumen -->

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
        dosen : '',
        Dialog_TTD: false,
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
        Penguji:'',
        Kaprodi : {
          nama:'Djoko Cahyo Utomo L., S.Kom., M.MT.', NIP:'197201061999031555', TTD:'',
        },
  
        Kajur : {
          nama:'Djoko Cahyo Utomo L., S.Kom., M.MT.', NIP:'197201061999031999', TTD:'',
        },
  
        imageURL:'',
        tanggal_disetujui: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

        validasiDokumen: false,
        tab: 0,
        InputFile: [
            { text: "Browse" },
            { text: "Drop" },
        ],
        file: null,
        dragging: false,
        validationError: null,

        // Notifikasi Berhasil
        snackbar: {
            show: false,
            message: "",
            color: "",
        },
        
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
            const id_kota = this.$route.params.id
  
            const response = await axios.get(`http://localhost:3000/api/getdosendata/${this.dataFromToken.id_user}`)
            this.dosen = response.data.data[0]

            const responseAnggota = await axios.get('http://localhost:3000/api/mahasiswakota/' + id_kota);
            this.Anggota = responseAnggota.data.data;
  
            const responseListLaporan = await axios.get('http://localhost:3000/api/laporankota/' +id_kota)
            this.laporan = responseListLaporan.data.data
    
            const responsePembimbing = await axios.get('http://localhost:3000/api/relasibykota/pembimbing/'+ this.laporan.id_KoTA)
            this.Pembimbing = responsePembimbing.data.data
    
            try {
              this.imageURL = 'http://localhost:3000/api/relasi/gambarttd/234234234234234232/Penguji/20224022023'
            } catch (error) {
              console.error(error);
            }

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
            console.log(this.Penguji)



            const responseKaprodi = await axios.get('http://localhost:3000/api/prodi/'+this.Anggota[0].id_prodi)
            this.kaprodiData = responseKaprodi.data.data
    
            if (this.Anggota[0].id_prodi === 'PRD001'){
                this.Prodi = 'D4'
            }else if (this.Anggota[0].id_prodi === 'PRD002'){
                this.Prodi = 'D3'
            }
    
            const DataKaprodi = await axios.get('http://localhost:3000/api/dosen/'+ this.kaprodiData.NIP,)
            this.Kaprodi = DataKaprodi.data.data    


            const responseKajur = await axios.get('http://localhost:3000/api/jurusan')
            this.Kajur = responseKajur.data.data[0]    
            const DataKajur = await axios.get('http://localhost:3000/api/dosen/'+ this.Kajur.NIP,)
            this.Kajur = DataKajur.data.data

            try {
              this.Kaprodi.img = 'http://localhost:3000/api/relasi/gambarttd/'+ this.Kaprodi.NIP +'/Kaprodi/'+ this.laporan.id_KoTA
              this.Kajur.img = 'http://localhost:3000/api/relasi/gambarttd/'+ this.Kajur.NIP +'/Kajur/'+ this.laporan.id_KoTA
            } catch (error) {
              console.error(error.message.request);
            }
            
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
  
        async add_Dokumen_succes(){
          if (!this.file) {
              this.validationError = "Mohon pilih file yang akan divalidasi.";
              return;
          }
          console.log(this.file)
          const formData = new FormData();
          formData.append('img_ttd', this.file);
          formData.append('NIP', this.dosen.NIP)
          formData.append('id_KoTA', this.laporan.id_KoTA)
          formData.append('role', this.$route.params.role)

          await axios.post('http://localhost:3000/api/relasi/doSignature/', formData, {
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
          this.snackbar.message = "Tanda Tangan Berhasil dibubuhkan";
          })
          .catch(error => {
          console.log(error.message);
          this.validasiDokumen = !this.validasiDokumen;
          this.file = null
          this.snackbar.show = true;
          this.snackbar.color = "error";
          this.snackbar.message = "Tanda Tangan gagal dibubuhkan";
          });
          // this.initialize()
          window.location.reload()
        },

        close_Popup_AddDokumen(){
            this.validasiDokumen = !this.validasiDokumen;
            this.file = null
        },

        Do_Sign(){
            this.validasiDokumen = true
        },

        validateFile() {
            if (!this.file) {
                this.validationError = "Mohon pilih file yang akan divalidasi.";
                return;
            }
            if (this.file && this.file.name === 'LaporanTA.pdf'){
                this.validasiDokumen = !this.validasiDokumen
            } 
            else {
                this.validasiDokumen = !this.validasiDokumen
            }
        },


        generatePDF() {
            const doc = new jsPDF('p', 'pt', 'a4');
            
            const htmlContent = document.getElementById('pdf-content');
            const htmlContentHal2 = document.getElementById('pdf-hal2');
    
            doc.html(htmlContentHal2, {
            callback: () => {
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

        // Methods Drag n Drop zone
        dragEnter(e) {
            e.preventDefault();
            e.target.classList.add('highlight');
        },
        dragOver(e) {
            e.preventDefault();
        },
        dragLeave(e) {
            e.preventDefault();
            e.target.classList.remove('highlight');
        },
        dropFile(e) {
            e.preventDefault();
            e.target.classList.remove('highlight');

            const files = e.dataTransfer.files;
            this.handleFiles(files);
        },
        handleFiles(files) {
            if (files.length > 0) {
                this.file = files[0];
                console.log(this.file)
            }
        },
        removeFile() {
            this.file = null;
        }

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

  .theme--light.v-sheet{
    color: #1a5f7a;
  }

  .theme--light.v-card .v-card__text{
    color: #1a5f7a;
  }

 /* Drag and Drop Zone */
 .drop-area {
  display: flex;
  justify-content: center; /* Menengahkan konten secara horizontal */
  align-items: center; /* Menengahkan konten secara vertical */
  border: 2px dashed rgba(145, 187, 203, 1);
  text-align: center;
  padding: 30px;
  font-size: 20px;
}

.highlight {
  background: rgba(145, 187, 203, 0.2);
}

.placeholder {
  color: rgba(145, 187, 203, 1);
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: rgba(145, 187, 203, 0.35);
  border-radius: 5px;
}

.file-name {
  margin: 0;
}

.remove-button {
  background-color: #ff5555;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;
}
  
  </style>
  