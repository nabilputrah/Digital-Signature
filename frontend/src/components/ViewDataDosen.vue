<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Data Dosen</h4>
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
      to="/koordinator/dosen">
        <span>Data Dosen</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Form Detail Laporan -->
    <v-card
    class="custom-card"
    >
      <div style="width: 97%;margin-left: auto;margin-right: auto;">
        <v-card-title>Data Jurusan</v-card-title>
        <v-card-text >
          <v-form
            v-model="PimpinanValid"
            >
            <!-- Start Form Ketua Jurusan -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Ketua Jurusan</span>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-select
                  v-model="formKajur.selectedItem"
                  :items="filteredKajur()"
                  :rules="[validateSelection('formKajur')]"
                  clearable
                  outlined
                  dense
                  :menu-props="{ offsetY: true}"
                  :placeholder="'Pilih Ketua Jurusan'"
                >
                  <template v-slot:prepend-item>
                    <v-text-field
                    style="width: 97%;margin-left: auto;margin-right: auto;"
                      v-model="formKajur.search"
                      :label="'Cari Dosen'"
                      hide-details
                      @input="onSearchKajur()"
                    />
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <!-- End Form Ketua Jurusan -->
            <!-- Start Form Ketua Prodi D3 -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Ketua Prodi D3</span>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-select
                  v-model="formKaprodiD3.selectedItem"
                  :items="filteredKaprodiD3()"
                  :rules="[validateSelection('formKaprodiD3')]"
                  clearable
                  outlined
                  dense
                  :menu-props="{ offsetY: true}"
                  :placeholder="'Pilih Ketua Prodi D3'"
                >
                  <template v-slot:prepend-item>
                    <v-text-field
                    style="width: 97%;margin-left: auto;margin-right: auto;"
                      v-model="formKaprodiD3.search"
                      :label="'Cari Dosen'"
                      hide-details
                      @input="onSearchKaprodiD3()"
                    />
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <!-- End Form Ketua Prodi D3 -->
            <!-- Start Form Ketua Prodi D4 -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Ketua Prodi D4</span>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-select
                  v-model="formKaprodiD4.selectedItem"
                  :items="filteredKaprodiD4()"
                  :rules="[validateSelection('formKaprodiD4')]"
                  clearable
                  outlined
                  dense
                  :menu-props="{ offsetY: true}"
                  :placeholder="'Pilih Ketua Prodi D4'"
                >
                  <template v-slot:prepend-item>
                    <v-text-field
                    style="width: 97%;margin-left: auto;margin-right: auto;"
                      v-model="formKaprodiD4.search"
                      :label="'Cari Dosen'"
                      hide-details
                      @input="onSearchKaprodiD4()"
                    />
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <!-- End Form Ketua Prodi D4 -->
            <!-- Start Button Simpan Perubahan -->
            <v-row >
              <v-col class="text-right" >
                <v-btn 
                  color="primary" 
                  @click="saveDataPimpinan"
                  :disabled="!PimpinanValid"
                  >Simpan Perubahan</v-btn>
              </v-col>
            </v-row>
            <!-- End Button Simpan Perubahan -->
          </v-form>
        </v-card-text>
    </div>
    </v-card>
    <!-- End Form Detail Laporan -->

    <!-- Start Datatables -->
    <v-card class="custom-card" style="margin-top: 2%;margin-bottom: 2%;">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="dosen"
        sort-by="calories"
        class="elevation-1"
        style="padding-top: 0.5%;"
      >
        <template v-slot:top>
          <v-toolbar
            dense
            flat
          >
            <v-toolbar-title>Data Dosen</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="sendAllEmail(item)"
              style="margin-top: auto;margin-bottom: auto; margin-right: 1%;" 
            >
              Email All
            </v-btn>
            <v-btn
              color="primary"
              @click="add_Dokumen"
              style="margin-top: auto;margin-bottom: auto; margin-right: 1%;" 
            >
              Import Dosen
            </v-btn>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <!-- Start Button Add Dosen -->
              <template v-slot:activator="{ on, attrs } " >
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  style="margin-top: auto;margin-bottom: auto;" 
                >
                  + Add Dosen
                </v-btn>
              </template>
              <!-- End Button Add Dosen -->
              <!-- Start Card Pop up Add/Edit Data Dosen -->
              <v-card >
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-container>
                      <v-text-field
                        v-model="editedItem.NIP"
                        :rules="rules.nip"
                        label="NIP"
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
                    @click="save"
                    :disabled="!valid"
                  >
                    Simpan
                  </v-btn>
                </v-card-actions>
              </v-card>
              <!-- End Card Pop up Add/Edit Data Dosen -->
            </v-dialog>
            <!-- Start Card Pop up Delete Data Dosen -->
            <v-dialog v-model="dialogDelete" max-width="350">
              <v-card>
                <v-card-title class="headline">
                  Delete Dosen 
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
            <!-- End Card Pop up Delete Data Dosen -->
            <!-- Start Card Pop up Email Data Dosen -->
            <v-dialog v-model="dialogEmail" max-width="350">
              <v-card>
                <v-card-title class="headline">
                  Send Email 
                </v-card-title>
                <v-card-text>
                  <div>Are you sure you want to send email to this account?</div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="sendEmailConfirm"
                  >
                    Yes
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="closeEmail"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- End Card Pop up Email Data Dosen -->
            <!-- Start Card Pop up Email Data Dosen -->
            <v-dialog v-model="dialogAllEmail" max-width="350">
              <v-card>
                <v-card-title class="headline">
                  Send Email 
                </v-card-title>
                <v-card-text>
                  <div>Are you sure you want to send email to all account?</div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="sendAllEmailConfirm"
                  >
                    Yes
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="closeAllEmail"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- End Card Pop up Email Data Dosen -->
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
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-trash-can-outline
          </v-icon>
          <v-icon
            @click="sendEmail(item)"
          >
            mdi-email-outline
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
        <v-card-title class="headline">Import Data Dosen</v-card-title>
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
  export default {
    data: () => ({
      kajurData: '',
      kaprodiData: '',
      search : '',
      dialog: false,
      dialogDelete: false,
      dialogEmail: false,
      dialogAllEmail : false,
      headers: [
        {
          text: 'NIP',
          align: 'start',
          value: 'NIP',
        },
        { text: 'Nama', value: 'nama' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      formKajur: {
        selectedItem: '',
        items: ['Dosen 1', 'Dosen 2'],
        search: '',
      },

      formKaprodiD3: {
        selectedItem: '',
        items: ['Dosen 1', 'Dosen 2'],
        search: '',
      },

      formKaprodiD4: {
        selectedItem: '',
        items: ['Dosen 1', 'Dosen 2'],
        search: '',
      },

      // Data validasi Input
      valid: false,
      PimpinanValid:false,
      rules: {
        nip: [
          v => !!v || "NIP wajib diisi",
          v => /^[0-9]+$/.test(v) || 'NIP harus berupa angka',
          v => (v && v.length >= 18) || "NIP minimal 18 huruf",
          v => (v && v.length <= 18) || "NIP Maksimal 18 huruf"
        ],
        nama: [
          v => !!v || "Nama wajib diisi",
        ],
        email: [
          v => !!v || "Email wajib diisi",
          v =>
            /.+@.+\..+/.test(v) ||
            "Format email tidak valid"
        ],
      },
      MessageError :'',

      dosen: [],
      editedIndex: -1,
      editedItem: {
        NIP: '',
        nama: '',
        email: '',
      },
      defaultItem: {
        NIP: '',
        nama: '',
        email: '',
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
        return this.editedIndex === -1 ? 'Tambah Dosen' : 'Sunting Data Dosen'
      },
      filteredKajur() {
        return () => {
          const items = this.formKajur.items;
          const search = this.formKajur.search;
          if (search.length === 0) {
            return items;
          } else {
            return items.filter((item) =>
              item.text.toLowerCase().includes(search.toLowerCase())
            );
          }
        };
      },
      filteredKaprodiD4() {
        return () => {
          const items = this.formKaprodiD4.items;
          const search = this.formKaprodiD4.search;
          if (search.length === 0) {
            return items;
          } else {
            return items.filter((item) =>
              item.text.toLowerCase().includes(search.toLowerCase())
            );
          }
        };
      },
      filteredKaprodiD3() {
        return () => {
          const items = this.formKaprodiD3.items;
          const search = this.formKaprodiD3.search;
          if (search.length === 0) {
            return items;
          } else {
            return items.filter((item) =>
              item.text.toLowerCase().includes(search.toLowerCase())
            );
          }
        };
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
      this.initializeKajurList()
      this.initializeKaprodiList()
    },

    methods: {
      async add_Dokumen_succes(){
      if (!this.file) {
        this.validationError = "Mohon pilih file yang akan divalidasi.";
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      await axios.post('http://localhost:3000/api/dosenimport/', formData, {
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
          this.snackbar.message = "Data Dosen berhasil diimport";
        })
        .catch(error => {
          console.log(error.message);
          this.validasiDokumen = !this.validasiDokumen;
          this.file = null
          this.snackbar.show = true;
          this.snackbar.color = "error";
          this.snackbar.message = "Data Dosen gagal diimport";
        });
        this.initialize()
    },

    close_Popup_AddDokumen(){
      this.validasiDokumen = !this.validasiDokumen;
      this.file = null
    },

    async add_Dokumen(){
      this.validasiDokumen = true;
    },


      validateSelection(target) {
        return (value) => {
          if (!value) return 'Form wajib diisi';
          // Lakukan validasi di sini
          if (target === 'formKajur') {
            if (value && value === this.formKaprodiD3.selectedItem) {
              return 'Tidak dapat memilih Dosen Kaprodi D3.';
            }
            if (value && value === this.formKaprodiD4.selectedItem) {
              return 'Tidak dapat memilih Dosen Kaprodi D4.';
            }
          } else if (target === 'formKaprodiD3') {
            if (value && value === this.formKajur.selectedItem) {
              return 'Tidak dapat memilih Ketua Jurusan.';
            }
            if (value && value === this.formKaprodiD4.selectedItem) {
              return 'Tidak dapat memilih Dosen Kaprodi D4.';
            }
          } else if (target === 'formKaprodiD4') {
            if (value && value === this.formKajur.selectedItem) {
              return 'Tidak dapat memilih Ketua Jurusan.';
            }
            if (value && value === this.formKaprodiD3.selectedItem) {
              return 'Tidak dapat memilih Dosen Kaprodi D3.';
            }
          }
        };
      },

      async initializeKajurList() {
        try {
          const responseKajur = await axios.get('http://localhost:3000/api/jurusan')
          this.kajurData = responseKajur.data.data[0]

          this.formKajur.selectedItem = this.kajurData.NIP
        
        } catch (error) {
          console.log(error.message.request)
        }
      
      },

      async initializeKaprodiList(){
        try {
          const responseKaprodi = await axios.get('http://localhost:3000/api/prodi')
          this.kaprodiData = responseKaprodi.data.data
 
        } catch (error) {
          console.log(error.message.request)
        }

        try {
           this.formKaprodiD4.selectedItem = this.kaprodiData[0].NIP
        } catch (error) {
          console.log(error.message.request) 
        }

        try {
          this.formKaprodiD3.selectedItem = this.kaprodiData[1].NIP

        } catch (error) {
          console.log(error.message.request)
        }
       
      },

   

      onSearchKajur() {
        if (this.formKajur.search.length > 0) {
          this.formKajur.selectedItem = null;
        }
      },

      onSearchKaprodiD3(){
        if (this.formKaprodiD3.search.length > 0) {
          this.formKaprodiD3.selectedItem = null;
        }
      },

      onSearchKaprodiD4(){
        if (this.formKaprodiD4.search.length > 0) {
          this.formKaprodiD4.selectedItem = null;
        }
      },

      async saveDataPimpinan () {
        
        // console.log(this.kajurData.length === 0 ) 

        if (this.kajurData.length === 0 ) {
           await axios({
            method:'post',
            url: 'http://localhost:3000/api/jurusan/',
            data: {
              id_jurusan : 'JRS001',
              NIP: this.formKajur.selectedItem,
              nama_jurusan: 'Teknik Komputer dan Informatika'
            }
          })
          .then(response => {
          
            console.log(response.data)
    
          })
          .catch(error => {
              console.log(error.request.response)
          })
          
        } else {
            await axios({
            method:'put',
            url: 'http://localhost:3000/api/jurusan/'+ this.kajurData.id_jurusan,
            data: {
              id_jurusan : this.kajurData.id_jurusan,
              NIP: this.formKajur.selectedItem,
              nama_jurusan: this.kajurData.nama_jurusan
            }
          })
          .then(response => {
          
            console.log(response.data)
    
          })
          .catch(error => {
              console.log(error.request.response)
          })
        }

      

        await axios({
            method:'put',
            url: 'http://localhost:3000/api/prodi/'+ this.kaprodiData[0].id_prodi,
            data: {
              id_prodi: this.kaprodiData[0].id_prodi,
              NIP: this.formKaprodiD4.selectedItem,
              nama_prodi: this.kaprodiData[0].nama_prodi
            }
          })
          .then(response => {
          
            console.log(response.data)
    
          })
          .catch(error => {
              console.log(error.request.response)
          })
        await axios({
            method:'put',
            url: 'http://localhost:3000/api/prodi/'+ this.kaprodiData[1].id_prodi,
            data: {
              id_prodi: this.kaprodiData[1].id_prodi,
              NIP: this.formKaprodiD3.selectedItem,
              nama_prodi: this.kaprodiData[1].nama_prodi
            }
          })
          .then(response => {
          
            console.log(response.data)
    
          })
          .catch(error => {
              console.log(error.request.response)
          })


        this.snackbar.show = true;
        this.snackbar.color = "primary";
        this.snackbar.message = "Data Ketua Jurusan dan Ketua Prodi Berhasil Disimpan!";
        
        setTimeout(() => {
          this.initialize()
          this.initializeKajurList()
          this.initializeKaprodiList()
        }, 1000);

      },

      async initialize () {
         try {
          const response = await axios.get(`http://localhost:3000/api/dosen`);
          this.dosen = response.data.data

          this.formKajur.items = this.dosen.map((dsn) => ({ value: dsn.NIP, text: `${dsn.NIP} - ${dsn.nama}` }));
          this.formKaprodiD4.items = this.dosen.map((dsn) => ({ value: dsn.NIP, text: `${dsn.NIP} - ${dsn.nama}` }));
          this.formKaprodiD3.items = this.dosen.map((dsn) => ({ value: dsn.NIP, text: `${dsn.NIP} - ${dsn.nama}` }));
        } catch (error) {
          console.error(error.message);
        }
      },

      editItem (item) {
        this.editedIndex = this.dosen.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.dosen.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      sendEmail () {
        this.dialogEmail = true
      },

      sendAllEmail () {
        this.dialogAllEmail = true
      },
      
      deleteItemConfirm () {
        axios({
            method:'delete',
            url: 'http://localhost:3000/api/dosen/'+ this.editedItem.NIP
            
          })
          .then(response => {
          
            console.log(response.data)
            this.initialize()
    
          })
          .catch(error => {
              console.log(error.request.response)
          })
        this.snackbar.show = true;
        this.snackbar.color = "primary";
        this.snackbar.message = "Data Dosen berhasil dihapus!";
        this.closeDelete()
      },

      sendEmailConfirm () {
        this.snackbar.show = true;
        this.snackbar.color = "primary";
        this.snackbar.message = "Email berhasil dikirimkan!";
        this.closeEmail()
      },

      sendAllEmailConfirm () {
        this.snackbar.show = true;
        this.snackbar.color = "primary";
        this.snackbar.message = "Email berhasil dikirimkan!";
        this.closeAllEmail()
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

      closeEmail () {
        this.dialogEmail = false
      },

      closeAllEmail () {
        this.dialogAllEmail = false
      },

      save () {
        if (this.editedIndex > -1) {
          axios({
            method:'put',
            url: 'http://localhost:3000/api/dosen/'+ this.editedItem.NIP,
            data: this.editedItem
          })
          .then(response => {
          
            console.log(response.data)
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data Dosen berhasil diubah!";
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
            url: 'http://localhost:3000/api/signupuser/dosen/',
            data: {
             username: this.editedItem.NIP,
             nama: this.editedItem.nama,
             email: this.editedItem.email
            } 
          })
          .then(response => {
          
            console.log(response.data)
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data Dosen berhasil disimpan!";

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
            if (this.MessageError.includes('Username')){
              this.snackbar.show = true;
              this.snackbar.color = "error";
              this.snackbar.message = "NIP Sudah Terdaftar!!!";
            }

          })
        }
        // Show success notification
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
