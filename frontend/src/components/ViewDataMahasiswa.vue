<template>
  <div >
<!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Data Mahasiswa</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="false" 
      to="/koordinator/dashboard">
        <v-icon >mdi-home-outline</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/koordinator/mahasiswa">
        <span>Data Mahasiswa</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Datatables -->
    <v-card class="custom-card"
    style="margin-bottom: 2%;">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="mahasiswa"
        sort-by="id_KoTA"
        class="elevation-1"
        style="padding-top: 0.5%;"
      >
        <template v-slot:top>
          <v-toolbar
            dense
            flat
          >
            <v-toolbar-title>Data Mahasiswa</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="add_Dokumen"
              style="margin-top: auto;margin-bottom: auto; margin-right: 1%;" 
            >
              Import Mahasiswa
            </v-btn>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <!-- Start Button Add Mahasiswa -->
              <template v-slot:activator="{ on, attrs } " >
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  style="margin-top: auto;margin-bottom: auto;" 
                >
                  + Add Mahasiswa
                </v-btn>
              </template>
              <!-- End Button Add Mahasiswa -->
              <!-- Start Card Pop up Add/Edit Data Mahasiswa -->
              <v-card >
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text >
                  <v-form ref="form" v-model="valid">
                  <v-container >
                    <v-text-field
                      v-model="editedItem.NIM"
                      :rules="rules.nim"
                      label="NIM"
                      
                      :disabled="editedIndex > -1"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.nama"
                      :rules="rules.nama"
                      label="Nama"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.email"
                      :rules="rules.email"
                      label="Email"
                    ></v-text-field>
                  </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#1a5f7a"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="#1a5f7a"
                    text
                    @click="save()"
                    :disabled="!valid"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
              <!-- End Card Pop up Add/Edit Data Mahasiswa -->
            </v-dialog>
            <!-- Start Card Pop up Delete Data Mahasiswa -->
            <v-dialog v-model="dialogDelete" max-width="350">
              <v-card>
                <v-card-title class="headline">
                  Delete Mahasiswa 
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
            <!-- End Card Pop up Delete Data Mahasiswa -->
          </v-toolbar>

          <!-- Start Input Search -->
          <v-text-field
            dense
            v-model="search"
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
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil-outline
          </v-icon>
          <v-icon
            @click="deleteItem(item)"
          >
            mdi-trash-can-outline
          </v-icon>
        </template>
        <!-- End Kolom Action -->
        <template v-slot:no-data>
          No Data
        </template>
      </v-data-table>
    </v-card>
    <!-- End Datatables -->
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

    <!-- Start Card Upload Dokumen -->
    <v-dialog
    v-model="validasiDokumen"
    class="text-center" 
    max-width="600"
    color="white"
    >
    <v-card >
        <v-card-title class="headline">Import Data Mahasiswa</v-card-title>
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
                        accept=".xlsx"
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
  </div>

</template>

<script>
import axios from 'axios'
// import pdf from 'vue-pdf'
  export default {
    components: {
    // pdf,
  },
    data: () => ({
      loggedIn:'',
      navbar:'',
      duplikatNIMUpdated :false,
      resultAkhir:'',
      ProdiAktif:'',
      search : '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'NIM',
          align: 'start',
          value: 'NIM',
        },
        { text: 'Nama', value: 'nama' },
        { text: 'Email', value: 'email' },
        { text: 'Prodi', value: 'id_prodi' },
        { text: 'KoTA', value: 'id_KoTA' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      // Data validasi Input
      valid: false,
      rules: {
        nim: [
          v => !!v || "NIM wajib diisi",
          v => /^[0-9]+$/.test(v) || 'NIM harus berupa angka',
          v => (v && v.length >= 9) || "NIM minimal 9 huruf",
          v => (v && v.length <= 9) || "NIM Maksimal 9 huruf"
        ],
        nama: [
          v => !!v || "Nama wajib diisi",
        ],
        email: [
          v => !!v || "Email wajib diisi",
          v =>
            /.+@.+\..+/.test(v) ||
            "Format email tidak valid"
        ]
      },
      MessageError :'',

      mahasiswa: [],
      editedIndex: -1,
      editedItem: {
        NIM: '',
        nama: '',
        email: '',
      },
      defaultItem: {
        NIM: '',
        nama: '',
        email: '',
        KoTA: '',
      },

      // Data Import Dokumen
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

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Mahasiswa' : 'Sunting Data Mahasiswa'
      },
    },

    
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    mounted () {

      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.navbar= payload.user;
      }
      // this.$validate()
      this.initializeNavbarLoggedIn()
      this.initialize()
    },

  
   
    methods: {
      async add_Dokumen_succes(){
      if (!this.file) {
        this.validationError = "Mohon pilih file yang akan divalidasi.";
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      if (this.loggedIn.nama_prodi === 'D4'){
        await axios.post('http://localhost:3000/api/mahasiswad4import/', formData, {
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
            this.snackbar.message = "Data Mahasiswa berhasil diimport";
          })
          .catch(error => {
            console.log(error.message);
            this.validasiDokumen = !this.validasiDokumen;
            this.file = null
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.message = "Data Mahasiswa TA gagal diimport";
          });
      } else if (this.loggedIn.nama_prodi === 'D3'){
        await axios.post('http://localhost:3000/api/mahasiswad3import/', formData, {
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
            this.snackbar.message = "Data Mahasiswa berhasil diimport";
          })
          .catch(error => {
            console.log(error.message);
            this.validasiDokumen = !this.validasiDokumen;
            this.file = null
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.message = "Data Mahasiswa TA gagal diimport";
          });
      }


        this.initialize()
    },

    close_Popup_AddDokumen(){
      this.validasiDokumen = !this.validasiDokumen;
      this.file = null
    },

    async add_Dokumen(){
      this.validasiDokumen = true;
    },

      async initializeNavbarLoggedIn (){
        const token = localStorage.getItem('token'); 
        const headers = { Authorization: `Bearer ${token}` };
        
        try {
          const response = await axios.get(`http://localhost:3000/api/getkoordata/${this.navbar.id_user}`, { headers });
          this.loggedIn = response.data.data[0]
          console.log(this.loggedIn.nama_prodi)
         
        } catch (error) {
          console.error(error.message);
        }
      },
    
      
      async initialize () {
        try {
          const response = await axios.get(`http://localhost:3000/api/mahasiswa`);
          const list = response.data.data
          const regex = /^(\d{4})(\d{3})(\d{4})$/;
          const mappedMahasiswa = list.map((item) => ({
            NIM: item.NIM,
            nama: item.nama,
            email: item.email,
            id_prodi: item.id_prodi,
            id_KoTA : item.id_KoTA ? item.id_KoTA.replace(regex, "$2-$1/$3") : null
          }));
          this.mahasiswa = mappedMahasiswa
          
          if (this.loggedIn.nama_prodi === 'D4') {
             this.mahasiswa = this.mahasiswa.filter((item) => item.id_prodi === "PRD001");

             const mappedData = this.mahasiswa.map((item) => {
                // if (item.id_prodi === "PRD001") {
                //   item.id_prodi = "D4";
                // }
                item.id_prodi = "D4";
                return item;
              })

            this.mahasiswa = mappedData
          } else if (this.loggedIn.nama_prodi === 'D3'){
            this.mahasiswa = this.mahasiswa.filter((item) => item.id_prodi === "PRD002");

              const mappedData = this.mahasiswa.map((item) => {
                // if (item.id_prodi === "PRD002") {
                //   item.id_prodi = "D3";
                // }
                item.id_prodi = "D3";
                return item;
              })

            this.mahasiswa = mappedData
          }

         
         
        } catch (error) {
          console.error(error.message);
        }
        
      },

      editItem (item) {
        this.editedIndex = this.mahasiswa.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.mahasiswa.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios({
            method:'delete',
            url: 'http://localhost:3000/api/mahasiswa/'+ this.editedItem.NIM
            
          })
          .then(response => {
          
            console.log(response.data)
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data mahasiswa berhasil dihapus!";
            this.initialize()
    
          })
          .catch(error => {
              console.log(error.request.response)
          })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
       
          axios({
            method:'put',
            url: 'http://localhost:3000/api/mahasiswaWithoutIsKetua/'+ this.editedItem.NIM,
            data: this.editedItem
          })
          .then(response => {
          
            console.log(response.data)
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data mahasiswa berhasil diubah!";
            this.initialize()
    
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
        } else {
          if (this.loggedIn.nama_prodi === 'D4') {
            this.ProdiAktif = 'PRD001'
          }
          else {
            this.ProdiAktif = 'PRD002'
          }
           axios({
            method:'post',
            url: 'http://localhost:3000/api/mahasiswa/',
            data: {
              NIM : this.editedItem.NIM,
              nama : this.editedItem.nama,
              email : this.editedItem.email,
              id_prodi:this.ProdiAktif,
              isKetua: false
            } 
          })
          .then(response => {
          
            console.log(response.data)
            // Show success notification
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data mahasiswa berhasil disimpan!";
            this.initialize()
    
          })
          .catch(error => {
            console.log(error.request.response)
            this.MessageError = error.request.response
            if (this.MessageError.includes('Email')){
              this.snackbar.show = true;
              this.snackbar.color = "error";
              this.snackbar.message = "Email Sudah Terdaftar!!!";
            }
            if (this.MessageError.includes('NIM')){
              this.snackbar.show = true;
              this.snackbar.color = "error";
              this.snackbar.message = "NIM Sudah Terdaftar!!!";
            }
          })
        }
        this.close()
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

.theme--light.v-icon{
  color:#1A5F7A;
}

.header_bg{
  background-color: #91BBCB
  ;
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
