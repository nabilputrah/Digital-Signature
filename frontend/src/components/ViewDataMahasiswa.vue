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
    <v-card class="custom-card">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="mahasiswa"
        sort-by="calories"
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
      <!-- <iframe src="https://drive.google.com/viewerng/viewer?embedded=true&url=digital-signature.infinityfreeapp.com/laporan_ta/example.pdf" -->
    
        
       
        <!-- width="75%" height="500px">
        </iframe> -->
     <v-btn @click="openPage">Buka halaman HTML</v-btn>

    <v-dialog v-model="dialogHtml" max-width="1000">
      <v-card>
        <v-card-title>
          <span class="headline">{{ pageTitle }}</span>
        </v-card-title>
        <v-card-text>
          <iframe :src="pageUrl" style="width:100%; height:70vh;"></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      // source1: ('../assets/LaporanTA.pdf'),
      // source2: 'data:application/pdf;base64,<BASE64_ENCODED_PDF>',
      // alamat:require('../assets/LaporanTA.pdf'),
      duplikatNIMUpdated :false,
      resultAkhir:'',
      search : '',
      pageUrl: 'OpenPDF.html', // ganti dengan URL halaman HTML Anda
      dialogHtml: false,
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
        { text: 'KoTA', value: 'id_KoTA' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      // Data validasi Input
      valid: false,
      rules: {
        nim: [
          v => !!v || "NIM wajib diisi",
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
      this.initialize()
      // this.$validate()
    },

  
   
    methods: {
      openPage() {
        this.dialogHtml = true
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
            id_KoTA : item.id_KoTA ? item.id_KoTA.replace(regex, "$2-$1/$3") : null
          }));
          this.mahasiswa = mappedMahasiswa
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
            url: 'http://localhost:3000/api/mahasiswa/'+ this.editedItem.NIM,
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

           axios({
            method:'post',
            url: 'http://localhost:3000/api/mahasiswa/',
            data: {
              NIM : this.editedItem.NIM,
              nama : this.editedItem.nama,
              email : this.editedItem.email,
              id_prodi:'PRD001',
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
            if (this.MessageError.includes('email')){
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

</style>
