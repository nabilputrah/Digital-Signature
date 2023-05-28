<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Dokumen Laporan TA</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/KoTA/dokumen_detail">
        <span>Dokumen Laporan TA</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Form Detail Laporan -->
    <v-card
    class="custom-card"
    >
      <div style="width: 97%;margin-left: auto;margin-right: auto;">
        <v-card-title>Data Laporan TA</v-card-title>
        <v-card-text >
          <v-form>
            <!-- Start Form Judul Tugas Akhir -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Judul Tugas Akhir</span>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-textarea
                  placeholder="Judul Tugas Akhir"
                  dense
                  readonly
                  outlined
                  disabled
                  rows="1"
                  hide-details
                  auto-grow
                  :value="Judul_Tugas_Akhir"
                ></v-textarea>
              </v-col>
            </v-row>
            <!-- End Form Judul Tugas Akhir -->
            <!-- Start Form Tanggal Disetujui -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Tanggal Disetujui</span>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field
                  v-model="laporan.tgl_disetujui"
                  placeholder="Tanggal Disetujui"
                  dense
                  outlined
                  hide-details
                  disabled
                  readonly
                  append-icon="mdi-calendar"
                >
              </v-text-field>
              </v-col>
            </v-row>
            <!-- End Form Tanggal Disetujui -->
            <!-- Start Form Tanggal Disidangkan -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Tanggal Disidangkan</span>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field
                  v-model="laporan.tgl_disidangkan"
                  placeholder="Tanggal Disidangkan"
                  dense
                  outlined
                  hide-details
                  disabled
                  readonly
                  append-icon="mdi-calendar"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <!-- End Form Tanggal Disidangkan -->
            <v-row >
              <v-col class="text-right" >
                <v-btn color="primary" @click="toLembarPengesahan">Buat Lembar Pengesahan</v-btn>
              </v-col>
            </v-row>
            <!-- End Button Simpan Perubahan -->
          </v-form>
        </v-card-text>
    </div>
    </v-card>
    <!-- End Form Detail Laporan -->

    <!-- Start Datatables -->
    <v-card class="custom-card" style="margin-top: 2%; margin-bottom: 2%;">
      <v-data-table
        :search="search_laporan"
        :headers="headers_laporan"
        :items="Laporan"
        sort-by="tanggal_dibuat"
        class="elevation-1"
        style="padding-top: 0.5%;"
      >
        <template v-slot:top>
          <v-toolbar
            dense
            flat
          >
            <v-toolbar-title>Daftar Dokumen Laporan TA</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="GenerateDigitalSignature"
              :disabled="StatusKajur"
              style="margin-top: auto;margin-bottom: auto; margin-right: 1%;" 
            >
              Generate Digital Signature
            </v-btn>
            <v-btn
              color="primary"
              @click="add_Dokumen"
              :disabled="canAddDoc"
              style="margin-top: auto;margin-bottom: auto;" 
            >
              + Tambah Dokumen
            </v-btn>
            <!-- Start Card Pop up Delete Dokumen -->
            <v-dialog v-model="dialogDelete" max-width="350">
              <v-card>
                <v-card-title class="headline">
                  Delete Document 
                </v-card-title>
                <v-card-text>
                  <div>Do you really want to delete this item?</div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="deleteItemConfirm"
                  >
                    Yes
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="closeDelete"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- End Card Pop up Delete Dokumen -->
          </v-toolbar>

          <!-- Start Input Search -->
          <v-text-field
            dense
            v-model="search_laporan"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            style="width: 20%;margin-right: 1%; margin-bottom: 0.5%; "
            class="custom-card"
          ></v-text-field>
          <!-- End Input Search -->
        </template>
        <!-- Start Kolom Action -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            v-if="!item.ID_laporan.includes('Final')"
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-trash-can-outline
          </v-icon>
          <v-icon
            v-if="item.ID_laporan.includes('Final')"
            color="primary" 
            @click="unduhItem(item.dokumen)"
          >
            mdi-tray-arrow-down
          </v-icon>
        </template>
        <!-- End Kolom Action -->
        <!-- Start Kolom Dokumen -->
        <template v-slot:[`item.dokumen`]="{ item }">
          <v-icon
            class="mr-2"
            @click="Open_Dokumen(item.dokumen)"
          >
            mdi-file-document-outline
          </v-icon>
        </template>
        <!-- End Kolom Dokumen -->
      </v-data-table>
    <!-- Start Dialog Buka Dokumen -->
    <v-dialog v-model="Dokumen_Dialog" max-width="90%">
      <div id="pdfContainer"></div>
    </v-dialog>
    <!-- End Dialog Buka Dokumen -->
    </v-card>
    <!-- End Datatables -->

    <!-- Start Datatables -->
    <v-card class="custom-card" style="margin-bottom: 2%;">
      <v-data-table
        :search="search_pengampu"
        :headers="headers_pengampu"
        :items="Pengampu"
        sort-by="calories"
        class="elevation-1"
        style="padding-top: 0.5%;"
      >
        <template v-slot:top>
          <v-toolbar
            dense
            flat
          >
            <v-toolbar-title>Status Tanda Tangan Dokumen</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
          </v-toolbar>

          <!-- Start Input Search -->
          <v-text-field
            dense
            v-model="search_pengampu"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            style="width: 20%;margin-right: 1%; margin-bottom: 0.5%; "
            class="custom-card"
          ></v-text-field>
          <!-- End Input Search -->
        </template>
        <!-- Start Kolom Status -->
        <template v-slot:[`item.status`]="{ item }">
          <v-btn
            :style="getButtonStyle(item)"
          >
            {{ item.status ? 'Done' : 'Not Started' }}
          </v-btn>
        </template>
        <!-- End Kolom Status -->
      </v-data-table>
    </v-card>
    <!-- End Datatables -->

    <!-- Start Card Upload Dokumen -->
    <v-dialog
    v-model="validasiDokumen"
    class="text-center" 
    max-width="600"
    color="white"
    >
    <v-card >
        <v-card-title class="headline">Validasi Dokumen</v-card-title>
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
                        accept=".pdf"
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
    <!-- Start animasi loading section -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    <!-- End animasi loading section -->
    

  </div>
</template>

<script>
import PDFObject from 'pdfobject';
import axios from 'axios'
export default {
  data() {
    return {
      StatusKajur:true,
      dataFromToken: '',
      kota: '',
      laporan: {
        tgl_disidangkan : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        tgl_disetujui : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },
      
      id_delete_dokumen :'',
      // Data Form Nama
      Judul_Tugas_Akhir : "",
      customToolbar: [
        [ "italic"],
        [ { align: "center" }]
      ],

      //Pop Up dialog Dokumen
      Dokumen_Dialog : false, 
      previewUrl : '',

      tanggal_disetujui : '',
      tanggal_disidangkan : '',
      // tanggal_disetujui: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      rules: [
        value => !!value || 'Required.',
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],

      menu_disetujui : false,
      menu_disidangkan : false,

      // Data Table
      search_laporan : '',
      search_pengampu : '',
      dialogDelete: false,
      headers_laporan: [
        {
          text: 'ID Dokumen',
          align: 'start',
          value: 'ID_laporan',
        },
        { text: 'Tanggal Dibuat', value: 'tanggal_dibuat' },
        { text: 'Dokumen Laporan', value: 'dokumen', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headers_pengampu: [
        {
          text: 'Dosen',
          align: 'start',
          value: 'nama',
        },
        { text: 'Peran', value: 'role'},
        { text: 'Urutan', value: 'urutan', sortable: false },
        { text: 'Status Tanda Tangan', value: 'status', sortable: false },
      ],
      Laporan: [],
      Pengampu : [],

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
      canAddDoc: false,
      isLoading: false
    }
  },

  mounted () {
     const token = localStorage.getItem('token');

      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.dataFromToken= payload.user;
      }
    this.initialize()
  },

  methods: {

    shouldShowAddDokumen(Laporan) {
      // Ambil semua tanggal dibuat yang tidak memiliki kata "Final"
      console.log(Laporan)
      const allCreatedDates = Laporan
        .filter((laporan) => laporan.ID_laporan.includes('Final'))
      if (allCreatedDates.length === 1){
        this.canAddDoc = true
      }
      console.log(this.canAddDoc)
    },

    shouldShowSignatureIcon(item, Laporan) {
      // Ambil semua tanggal dibuat yang tidak memiliki kata "Final"
      const allCreatedDates = Laporan
        .filter((laporan) => !laporan.ID_laporan.includes('Final'))
        .map((laporan) => new Date(laporan.tanggal_dibuat));

      // Cari tanggal dibuat yang paling baru
      const latestCreatedAt = new Date(Math.max.apply(null, allCreatedDates));

      // Tampilkan icon tanda tangan jika tanggal dibuat item paling baru
      return new Date(item.tanggal_dibuat).getTime() === latestCreatedAt.getTime();
    },

    async GenerateDigitalSignature(){
      this.isLoading = true
      // Get Lembar Pengesahan
      const responsePDF = await axios.get('http://localhost:3000/api/lembarpengesahan/'+ this.laporan.id_laporan,{responseType:'blob'})
      const lembarPengesahan = responsePDF;
      console.log(lembarPengesahan)

      const allCreatedDates = this.Laporan
        .filter((laporan) => !laporan.ID_laporan.includes('Final'))
        .map((laporan) => ({
          tanggal_dibuat : new Date(laporan.tanggal_dibuat),
          id_laporan : laporan.ID_laporan
        }));

      const Total_dokumen = allCreatedDates.length - 1
      const Laporan_Final = allCreatedDates[Total_dokumen].id_laporan

      const responseLaporan = await axios.get('http://localhost:3000/api/dokumen/'+ Laporan_Final,{responseType:'blob'})
      const laporanFinal = responseLaporan;
      
      console.log(laporanFinal)
      
      const formData = new FormData();
      formData.append('cover', laporanFinal.data);
      formData.append('content', lembarPengesahan.data)
      formData.append('id_laporan', this.laporan.id_laporan)
      formData.append('id_dokumen', this.laporan.id_laporan + '_Final')
      formData.append('version', 'Final')

      await axios.post('http://localhost:3000/api/dokumen/merge/', formData, {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response.data);
          this.file = null
          this.snackbar.show = true;
          this.snackbar.color = "primary";
          this.snackbar.message = "Dokumen Digital Signature Berhasil di Generate";
        })
        .catch(error => {
          console.log(error.message);
          this.file = null
          this.snackbar.show = true;
          this.snackbar.color = "error";
          this.snackbar.message = "Dokumen Digital Signature gagal di Generate";
        });
      this.initialize()
      this.isLoading = false
    },

    async add_Dokumen_succes(){
      if (!this.file) {
        this.validationError = "Mohon pilih file yang akan divalidasi.";
        return;
      }
      this.isLoading = true
      const response = await axios.get('http://localhost:3000/api/dokumenversion/'+ this.laporan.id_laporan)
      console.log(response.data.data)
      const version = response.data.data + 1

      const formData = new FormData();
      formData.append('dokumen_laporan', this.file);
      formData.append('id_laporan', this.laporan.id_laporan)
      formData.append('id_dokumen', this.laporan.id_laporan + '_' + 'v' + version)
      formData.append('version', 'v' + version)

      await axios.post('http://localhost:3000/api/dokumen/', formData, {
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
          this.snackbar.message = "Dokumen Laporan TA berhasil ditambahkan";
        })
        .catch(error => {
          console.log(error.message);
          this.validasiDokumen = !this.validasiDokumen;
          this.file = null
          this.snackbar.show = true;
          this.snackbar.color = "error";
          this.snackbar.message = "Dokumen Laporan TA gagal ditambahkan";
        });
        this.isLoading = false
        this.initialize()
    },

    close_Popup_AddDokumen(){
      this.validasiDokumen = !this.validasiDokumen;
      this.file = null
    },

    async add_Dokumen(){
      this.validasiDokumen = true;
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
      // Lakukan validasi dokumen dengan file yang dipilih
      // Misalnya: this.$axios.post('/validate', { file: this.file })
      // Jika validasi sukses, lakukan aksi yang diperlukan
    },

    async Open_Dokumen(ID_laporan) {
      this.Dokumen_Dialog = !this.Dokumen_Dialog
      // console.log(ID_laporan)
      const response = await axios.get('http://localhost:3000/api/dokumen/'+ ID_laporan,{responseType:'blob'})
      this.previewUrl = URL.createObjectURL(response.data);
      // console.log(this.previewUrl)
      this.showPdf();
    },

    showPdf() {
      const pdfContainer = document.getElementById('pdfContainer');
      PDFObject.embed(this.previewUrl, pdfContainer, {
        pdfOpenParams: {
          navpanes: 0,
          toolbar: 0,
          statusbar: 1,
        },
        callback: this.customizePdfToolbar,
        width: '100%',
        height: 'calc(100vh - 100px)', // Mengurangi tinggi toolbar Vuetify
      });
    },
    removePdf() {
      const pdfContainer = document.getElementById('pdfContainer');
      pdfContainer.innerHTML = '';
    },

    async unduhItem(ID_laporan) {
      const link = document.createElement('a');
      const response = await axios.get('http://localhost:3000/api/dokumen/'+ ID_laporan,{responseType:'blob'})
      this.previewUrl = URL.createObjectURL(response.data);
      link.href = this.previewUrl; // Ganti dengan URL dokumen PDF yang ingin diunduh
      link.download = ID_laporan; // Nama file yang akan diunduh
      link.target = '_blank';
      link.click();
      this.snackbar.show = true;
      this.snackbar.color = "primary";
      this.snackbar.message = "Dokumen Laporan TA berhasil diunduh";
    },

    async toLembarPengesahan() {
      this.$router.push(`/KoTA/dokumen_detail/lembar_pengesahan`);   
    },

   


    async initialize () {

    try {
        const response = await axios.get(`http://localhost:3000/api/getkotadata/${this.dataFromToken.id_user}`)
        this.kota = response.data.data[0]
        const id_kota = response.data.data[0].id_KoTA

        const responseRelasi = await axios.get('http://localhost:3000/api/relasi/KoTA/' + id_kota)
        this.Pengampu = responseRelasi.data.data

        const responseListLaporan = await axios.get('http://localhost:3000/api/laporankota/' +id_kota)
        this.laporan = responseListLaporan.data.data

        const tempElement = document.createElement('div');
        tempElement.innerHTML = this.laporan.judul_TA;
        this.Judul_Tugas_Akhir = tempElement.innerText;

        const responseListDokumen = await axios.get('http://localhost:3000/api/dokumenlaporan/'+this.laporan.id_laporan)
        const list = responseListDokumen.data.data

        this.Laporan = list.map((item) =>({
          ID_laporan: item.id_dokumen,
          tanggal_dibuat:this.convertDateDibuat(item.tgl_unggah),
          dokumen: item.id_dokumen
        }))

        this.shouldShowAddDokumen(this.Laporan)

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

        // Get Status TTD Kajur
        const ResultStatusGenerate = await axios.get('http://localhost:3000/api/getstatuskajur/' + id_kota)
        const StatusKajur = ResultStatusGenerate.data.data;
        this.StatusKajur = StatusKajur
        console.log(ResultStatusGenerate.data)

        // this.StatusKajur = false


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
     
    },
    convertDateDisidangkan() {
      const date = new Date(this.laporan.tgl_disidangkan);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      this.laporan.tgl_disidangkan = year + '-' + month + '-' + day;
    },
    convertDateDibuat(tanggal_dibuat) {
      const dateAsli = new Date(tanggal_dibuat);
      const durasi = 7 * 60 * 60 * 1000;
      let date = new Date(dateAsli.getTime() + durasi);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      const hours = date.toISOString().substring(11, 13);
      const minute = date.toISOString().substring(14, 16);
      const second = date.toISOString().substring(17, 19);
      return tanggal_dibuat = year + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
    },

    deleteItem (item) {
      this.editedIndex = this.Laporan.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.id_delete_dokumen = this.editedItem.ID_laporan
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      axios({
            method:'delete',
            url: 'http://localhost:3000/api/dokumen/'+ this.id_delete_dokumen
            
          })
          .then(response => {
          
            console.log(response.data)
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data Dokumen Laporan TA berhasil dihapus";
            this.initialize()
    
          })
          .catch(error => {
              console.log(error.request.response)
          })
      // this.Laporan.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    getButtonStyle(item) {
      if (!item.status) {
        return {
          'pointer-events': 'none',
          'background-color': 'rgba(172, 12, 12, 0.83)',
          'color': '#ffffff',
        };
      } else {
        return {
          'pointer-events': 'none',
          'background-color': '#68B984',
          'color': '#ffffff',
        };
      }
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
}
</script>

<style scoped>

.theme--light.v-sheet{
  color: #1a5f7a;
}
.custom-card {
  width: 97%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
}

.header_bg{
  background-color: #91BBCB;
}

::v-deep .v-data-table-header{
  background-color: rgba(145, 187, 203, 0.35);
}
::v-deep .v-data-table-header span{
  color: #1A5F7A;
}

::v-deep .theme--light.v-data-table .v-data-table-header th.sortable.active .v-data-table-header__icon {
  color: #1A5F7A;
}

::v-deep .theme--light.v-data-table .v-data-table-header th.sortable .v-data-table-header__icon {
    color: rgba(145, 187, 203, 0.35);
}

::v-deep .v-select-list .v-list-item {
  font-size: 2rem ;
}

.theme--light.v-icon{
  color:#1A5F7A;
}

.v-card__subtitle, .v-card__text{
  line-height: 2.5rem;
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
