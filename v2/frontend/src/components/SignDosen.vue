<template>
    <div>
      <!-- Start HTML Lembar Pengesahan Halaman 1 -->
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
      <!-- End HTML Lembar Pengesahan Halaman 1 -->

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
                    <p 
                      style="margin-top: 50px; position: absolute;"
                    >
                    ..................................
                    </p>
                    <img 
                      width="100px" 
                      height="70px" 
                      :src="dosen.img"
                      style="position: relative; "
                      >
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
      <!-- End HTML Lembar Pengesahan Halaman 2 -->
      <!-- <button @click="generatePDF">Generate PDF</button>
      <button @click="Do_Sign"> Tanda Tangan</button> -->

      <!-- Start Breadcrumbs -->
      <v-breadcrumbs style="margin-left: 0.5%;">
        <h4 style="color: #1a5f7a;">Tanda Tangan Dokumen</h4>
        <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
        <v-breadcrumbs-item 
        :exact="true"
        to="/dosen/daftar_dokumen">
          <span>Dokumen Laporan TA</span>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item 
        :disabled="true">
          /
        </v-breadcrumbs-item>
        <v-breadcrumbs-item 
        :disabled="false"
        style="color: #1a5f7a;"
        >
          <span @click="BackToDetail()" style="cursor: pointer;" >Detail Dokumen Laporan TA</span>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item 
        :disabled="true">
          /
        </v-breadcrumbs-item>
        <v-breadcrumbs-item 
        :disabled="true"
        to="/dosen/daftar_dokumen/detail_dokumen/do_sign">
          <span>Tanda Tangan Dokumen</span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <!-- End Breadcrumbs -->

      <v-row class="custom-card" >
        <v-col cols="8" >
          <!-- Start Dialog Buka Dokumen -->
          <div id="pdfContainer"></div>
          <!-- End Dialog Buka Dokumen -->
          <!-- <iframe :src="pdfUrl" width="100%" height="600px"></iframe> -->
        </v-col>

        <v-col cols="4">
          <v-card v-if="!validasiDokumen" style="height: 100%;">
            <div class="signature-page">
                  <h2>Detail Tanda Tangan</h2>
                  <br>
                  <form @submit.prevent="addSignature">
                    <v-text-field 
                      v-model="laporan.id_KoTA"
                      label="ID Kota"
                      dense
                      outlined
                      disabled
                    ></v-text-field>
                    <v-text-field 
                      v-model="dosen.NIP"
                      label="NIP"
                      dense
                      outlined
                      disabled
                    ></v-text-field>
                    <v-text-field 
                      v-model="dosen.nama"
                      label="Nama"
                      dense
                      outlined
                      disabled
                    ></v-text-field>
                    <v-text-field 
                      v-model="tanggal_TTD"
                      label="Tanggal Tanda Tangan"
                      dense
                      outlined
                      disabled
                    ></v-text-field>
                    <v-row >
                      <v-col class="text-right" >
                        <v-btn color="primary" :disabled="AksesTTD" @click="SignDocument">Tambah Tanda Tangan</v-btn>
                      </v-col>
                    </v-row>
                  </form>
            </div>
          </v-card>
          <v-card v-if="validasiDokumen">
            <v-card-title class="headline">Pilih Gambar Tanda Tangan</v-card-title>
            <v-card-text>
              <v-tabs v-model="tab">
                <v-tab v-for="(item, index) in InputFile" @click="handleTabClick(item)" :key="index">{{ item.text }}</v-tab>

                <v-tab-item v-for="(item, index) in InputFile" :key="index" >
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
            <div :hidden="!dialogDrawTTD">
              <canvas class="canvas_class" style="border: 1px solid #000;; margin-left: 15%;" ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="finishDrawing"></canvas>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="close_Popup_AddDokumen">Kembali</v-btn>
                <v-btn color="primary" @click="clearSignature">Clear Signature</v-btn>
                <v-btn color="primary" @click="saveSignature">Save Signature</v-btn>
              </v-card-actions>
            </div>
            <div :hidden="dialogDrawTTD">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="close_Popup_AddDokumen">Kembali</v-btn>
                <v-btn color="primary" @click="add_Dokumen_succes">Unggah Gambar</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>

      </v-row>

    <!-- Start Dialog input Sharekey  -->
    <v-dialog v-model="dialogShareKey" max-width="500px">
      <v-card>
        <v-card-title>
          Input Share Key
        </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="ShareKeyValid" @submit.prevent>
            <v-text-field
              v-model="shareKey"
              :rules="rules"
              label="Share Key"
              :disabled="disabledShareKey"
              @keyup.enter="validateShareKey"
            >
            </v-text-field>
            <div class="note">
              *Periksa email anda untuk mendapatkan share key
            </div>
            </v-form>
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="closeDialog">Batal</v-btn>
          <v-btn color="primary" :disabled="!ShareKeyValid" @click="validateShareKey">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog input Sharekey  -->
      
    <!-- Start Card Upload Dokumen -->
    <!-- <v-dialog
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
          <v-btn color="primary" @click="add_Dokumen_succes">Unggah Gambar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- End Card Upload Dokumen -->

    <!-- Start Try gambar ttd -->
    <!-- <div>
      <button @click="openDialog">Gambar TTD</button>
         <dialog :open="dialogOpen">
          <canvas ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="finishDrawing"></canvas>
          <button @click="clearSignature">Clear Signature</button>
          <button @click="saveSignature">Save Signature</button>
        </dialog>
    </div> -->
    <!-- End Try gambar ttd -->

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
  import SignaturePad from 'signature_pad';
  import jsPDF from 'jspdf';
  import PDFObject from 'pdfobject';
  import { format, parseISO } from 'date-fns';
  import idLocale from 'date-fns/locale/id';
  import axios from 'axios'
  
  export default {
    data: () => ({

        // Start Data HTML Lembar Pengesahan
        AksesTTD:false,
        dataFromToken: '',
        user_KoTA:'',
        Judul_TA: '',
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
        tanggal_disetujui: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        // End Data HTML Lembar Pengesahan

        // Start Data Halaman TTD
        idKota: '',
        nip: '',
        nama: 'Dr. Transmissia Semiawan, BSCS., M.IT.,',
        tanggal_TTD: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        pdfUrl: 'https://example.com/path-to-your-pdf.pdf',
        // End Data Halaman TTD

        // Start Data Dialog Add Dokumen
        validasiDokumen: false,
        tab: 0,
        InputFile: [
            { text: "Browse" },
            { text: "Drop" },
            { text: "Gambar" },
        ],
        file: null,
        dragging: false,
        validationError: null,
        dialogOpen: false,
        dialogDrawTTD:false,
        signaturePad: null,
        // End Data Dialog Add Dokumen

        // Start Dialog Input Share Key
        dialogShareKey: false,
        ShareKeyValid:false,
        shareKey: '',
        shareKeyDB:'',
        disabledShareKey:false,
        rules: [
          value => !!value || 'Required.',
          // value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        // End Dialog Input Share Key

        // Notifikasi Berhasil
        snackbar: {
            show: false,
            message: "",
            color: "",
        },
        
        isLoading:false

      }),
  
    mounted () {
      const params = new URLSearchParams(window.location.search);
      const DialogshareKey = params.get('DialogShareKey');
      const shareKey = params.get('shareKey');

      if (DialogshareKey) {
        this.dialogShareKey = true;
      }
      if (shareKey) {
        this.shareKey = shareKey;
        this.disabledShareKey = true
      }

       const token = localStorage.getItem('token');
  
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.dataFromToken= payload.user;
        }
      this.initializeAksesTTD()
      this.checkLembarPengesahan()
      this.initialize()
    },

    methods: {
      handleTabClick(item) {
        if (item.text === 'Gambar') {
          this.initSignaturePad();
          this.dialogDrawTTD = true
        } else {
          this.dialogDrawTTD = false
        }
      },

      initSignaturePad() {
        this.signaturePad = new SignaturePad(this.$refs.canvas, {
          backgroundColor: 'rgba(0, 0, 0, 0)', // Mengatur latar belakang transparan
        });
      },

      openDialog() {
        this.dialogOpen = true; // Membuka dialog
      },
      startDrawing() {
        this.signaturePad.clear(); // Bersihkan tanda tangan saat mulai menggambar
      },
      draw(event) {
        if (event.buttons === 1) {
          var point = {
            x: event.clientX,
            y: event.clientY,
          };
          this.signaturePad.addPoint(point);
        }
      },
      finishDrawing() {
        this.signaturePad.removeBlanks(); // Menghapus latar belakang kosong
      },
      clearSignature() {
        this.signaturePad.clear(); // Membersihkan tanda tangan
      },
      saveSignature() {
        const signatureData = this.signaturePad.toDataURL(); // Mendapatkan data gambar tanda tangan

        this.convertToImage(signatureData)
        console.log(this.file)
        this.add_Dokumen_succes()
        // this.downloadImage(signatureData, 'signature.png'); // Mengunduh gambar tanda tangan
        this.dialogOpen = false; // Menutup dialog setelah menyimpan tanda tangan
      },

      convertToImage(imageURL) {
        const dataURL = imageURL; // Mengambil data URL gambar dari signature_pad
        const byteString = atob(dataURL.split(',')[1]); // Mengkonversi data URL menjadi byte string
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]; // Mendapatkan tipe MIME gambar

        // Mengonversi byte string menjadi Uint8Array
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        // Membuat Blob dari Uint8Array
        const newBlob = new Blob([ab], { type: mimeString });

        // Membuat File dari Blob
        const newFile = new File([newBlob], 'signature.png', { type: mimeString });

        this.file = newFile; // Menyimpan file dalam variabel this.file
      },

      downloadImage(dataURL, filename) {
        // Membuat elemen tautan (link) sementara
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = filename;

        // Men-trigger klik pada tautan dan menghapus elemen tautan
        link.click();
        link.remove();
      },

      async checkLembarPengesahan(){
        const response = await axios.get(this.$root.BASE_URL + `/api/ceklembarpengesahan/Laporan_${this.$route.params.id}`)
        const message = response.data.message

        const responseFinal = await axios.get(this.$root.BASE_URL + `/api/getstatuscanTTD/${this.$route.params.id}`)
        const messageFinal = responseFinal.data.statusLaporan
        // console.log(message)
        if (messageFinal){
          this.$router.push(`/dosen/daftar_dokumen/`);
        }
        if (message === 'lembar pengesahaan tidak ada'){
          this.$router.push(`/dosen/daftar_dokumen/`);
          // this.BackToDetail()
        }
      },

      async initializeAksesTTD() {
          const responseKoTA = await axios.get(this.$root.BASE_URL + '/api/KoTA/' +this.$route.params.id)
          this.id_KoTA = responseKoTA.data.data.id_user
          if (this.$route.params.role === "Kaprodi" || this.$route.params.role === "Kajur"){
            try {
              const response = await axios.get(this.$root.BASE_URL + `/api/relasi/accessttd/${this.$route.params.role}/${this.id_KoTA}`)
              const akses = response.data.data
              // console.log(akses)
              if (akses > 0){
                // this.AksesTTD = true
                // this.dialogShareKey = false
                this.$router.push(`/dosen/daftar_dokumen/`);
              }
            } catch (error) {
              console.error(error.message);
            }
          }
      },

      async initialize () {
  
      try {
            const responseKoTA = await axios.get(this.$root.BASE_URL + '/api/KoTA/' +this.$route.params.id)
            const id_kota = responseKoTA.data.data.id_user
            this.user_KoTA = responseKoTA.data.data.id_user
  
            const response = await axios.get(this.$root.BASE_URL + `/api/getdosendata/${this.dataFromToken.id_user}`)
            this.dosen = response.data.data[0]

            const responseAnggota = await axios.get(this.$root.BASE_URL + '/api/mahasiswakota/' + id_kota);
            this.Anggota = responseAnggota.data.data;
  
            const responseListLaporan = await axios.get(this.$root.BASE_URL + '/api/laporankota/' +id_kota)
            this.laporan = responseListLaporan.data.data
            
            // Get Tanggal TTD
            const responseTgl_TTD = await axios.get(this.$root.BASE_URL + '/api/tglttd/relasi/'+ this.dosen.id_user+'/'+this.$route.params.role+'/'+id_kota)
            this.tanggal_TTD = responseTgl_TTD.data.data

            // Get Data Pembimbing
            const responsePembimbing = await axios.get(this.$root.BASE_URL + '/api/relasibykota/pembimbing/'+ id_kota)
            this.Pembimbing = responsePembimbing.data.data
    
            // Get Image TTD Pembimbing
            try {
              this.Pembimbing[0].img = this.$root.BASE_URL + '/api/relasi/gambarttd/'+ this.Pembimbing[0].Dosen_id_user +'/Pembimbing/'+ id_kota
              this.Pembimbing[1].img = this.$root.BASE_URL + '/api/relasi/gambarttd/'+ this.Pembimbing[1].Dosen_id_user +'/Pembimbing/'+ id_kota
            } catch (error) {
              console.error(error);
            }

            // Get Data Penguji
            const responsePenguji = await axios.get(this.$root.BASE_URL + '/api/relasibykota/penguji/'+ id_kota)
            this.Penguji = responsePenguji.data.data

            // Get Image TTD Penguji
            this.Penguji.forEach(async (item) => {
              try {
                item.img = this.$root.BASE_URL + '/api/relasi/gambarttd/'+ item.Dosen_id_user +'/Penguji/'+ id_kota
                console.log(item.img)
              } catch (error) {
                console.error(error.message);
              }
            });
            // console.log(this.Penguji)

            // Get Data Kaprodi
            const responsePimpinan = await axios.get(this.$root.BASE_URL + '/api/jabatan')
            this.PimpinanData = responsePimpinan.data.data
            this.Kajur = this.PimpinanData[0].Dosen_id_user

            if (this.Anggota[0].Prodi_id_prodi === 'PRD001'){
                this.kaprodiData = this.PimpinanData[2].Dosen_id_user
                this.Prodi = 'D4'
            }else if (this.Anggota[0].Prodi_id_prodi === 'PRD002'){
                this.kaprodiData = this.PimpinanData[1].Dosen_id_user
                this.Prodi = 'D3'
            }
    
            const DataKaprodi = await axios.get(this.$root.BASE_URL + '/api/dosen/'+ this.kaprodiData,)
            this.Kaprodi = DataKaprodi.data.data    

            // Get Data Kajur
            const DataKajur = await axios.get(this.$root.BASE_URL + '/api/dosen/'+ this.Kajur,)
            this.Kajur = DataKajur.data.data

            // Get TTD image Kajur n Kaprodi            
            try {
              this.Kaprodi.img = this.$root.BASE_URL + '/api/relasi/gambarttd/'+ this.Kaprodi.id_user +'/Kaprodi/'+ id_kota
              this.Kajur.img = this.$root.BASE_URL + '/api/relasi/gambarttd/'+ this.Kajur.id_user +'/Kajur/'+ id_kota
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
            this.convertDateDibuat()
  
            const responsePDF = await axios.get(this.$root.BASE_URL + '/api/lembarpengesahan/'+ this.laporan.id_laporan,{responseType:'blob'})
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
            zoom:90,
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

      
        async add_Dokumen_succes(){
          if (!this.file) {
              this.validationError = "Mohon pilih gambar tanda tangan.";
              console.log(this.user_KoTA)
              return;
          }
          this.isLoading = true
          // console.log(this.file)
          const formData = new FormData();
          formData.append('img_ttd', this.file);
          formData.append('NIP', this.dosen.id_user)
          formData.append('id_KoTA', this.user_KoTA)
          formData.append('role', this.$route.params.role)

          await axios.post(this.$root.BASE_URL + '/api/relasi/doSignature/', formData, {
              headers : {
              'Content-Type' : 'multipart/form-data'
              }
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error.message);
          });
          this.generatePDF()
        },

        close_Popup_AddDokumen(){
            this.validasiDokumen = !this.validasiDokumen;
            this.file = null
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

        Do_Sign(){
          this.validasiDokumen = true
        },

        SignDocument (){
          this.dialogShareKey = true;
        },

        closeDialog() {
          this.dialogShareKey = false;
        },

        async validateShareKey() {
          // Lakukan sesuatu dengan shareKey
          if (this.ShareKeyValid){
          // console.log('Share Key:', this.shareKey);
          // console.log(this.dosen.NIP)
          // console.log(this.$route.params.id)
          // console.log(this.user_KoTA)

          await axios({
              method:'post',
              url: this.$root.BASE_URL + '/api/getonesharekey/',
              data: {
              NIP: this.dosen.id_user,
              id_laporan: "Laporan_" + this.$route.params.id,
              KoTA_id_user:this.user_KoTA,
              role:this.$route.params.role
              }
            })
            .then(response => {
              // console.log(response.data.data)
              this.shareKeyDB = response.data.data
            })
            .catch(error => {
              console.log(error.request.response)          
            })
          if (this.shareKey === this.shareKeyDB){
            this.dialogShareKey = false;
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Share Key yang diinputkan valid";
            this.shareKey = null

            this.validasiDokumen = true
            // this.initSignaturePad()
          }else{
            this.dialogShareKey = false;
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.message = "Share Key yang diinputkan tidak valid";
            this.shareKey = null
          }

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
                callback: async () => {
                    const blob = doc.output('blob')
                    
                    const formData = new FormData()

                    formData.append('lembar_pengesahan',blob)

                    await axios.put(this.$root.BASE_URL + '/api/lembarpengesahan/'+ this.laporan.id_laporan, formData, {
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

        BackToDetail () {
          this.$router.push(`/dosen/daftar_dokumen/dokumen_detail/${this.$route.params.role}/${this.$route.params.id}/`);
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
                // console.log(this.file)
            }
        },
        removeFile() {
            this.file = null;
        }

    },
  };
</script>
  
<style scoped>

  .canvas_class{
    margin-left: auto;
    margin-right: auto;
    object-fit: cover;
  }
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
  