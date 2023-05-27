<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Detail KoTA</h4>
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
      :exact="true"
      to="/koordinator/KoTA">
        Data Kota
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="false"
      to="/koordinator/KoTA/detail_KoTA">
        <span>Detail KoTA</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Card -->
    <v-card
    class="custom-card"
    >
      <div style="width: 97%;margin-left: auto;margin-right: auto;">
        <v-card-title>Detail Data KoTA</v-card-title>
        <v-card-text >
          <v-form>
            <!-- Start Form -->
            <v-row>
              <!-- Start Form Kiri -->
              <v-col cols="6" >
                <!-- Start Form ID KoTA -->
                <span 
                  style="font-size:1rem;"
                  >Id KoTA
                </span>
                <v-text-field 
                v-model="ID_KoTA"
                :rules="rules"
                placeholder="Id KoTA"
                disabled
                dense
                outlined
                ></v-text-field>
                <!-- End Form ID KoTA -->

                <!-- Start Form Tahun Ajaran -->
                <span 
                  style="font-size:1rem;"
                  >Tahun Ajaran
                </span>
                <v-select
                  v-model="tahunAjaran"
                  clearable
                  :items="listTahunAjaran"
                  placeholder="-/-"
                  item-text="tahunAjaran"
                  item-value="tahunAjaran"
                  disabled
                  dense
                  outlined
                  :menu-props="{ offsetY: true, maxHeight: '200px' }"
                />
                <!-- End Form Tahun Ajaran -->
                <!-- Start form anggota KoTA -->
                <v-row>
                  <v-col cols="12">
                    <span style="font-size:1rem;">Anggota KoTA</span>
                  </v-col>
                  <v-col cols="12" >
                    <v-row v-for="(item, index) in form" :key="index">
                      <v-col>
                        <v-select
                          v-model="item.selectedItem"
                          :items="filteredItems(index)"
                          clearable
                          outlined
                          disabled
                          hide-details
                          dense
                          :menu-props="{ offsetY: true}"
                          :placeholder="'Pilih Anggota ' + (index + 1)"
                        >
                          <template v-slot:prepend-item>
                            <v-text-field
                            style="width: 97%;margin-left: auto;margin-right: auto;"
                              v-model="item.search"
                              :label="'Cari Anggota ' + (index + 1)"
                              hide-details
                              @input="onSearchInput(index)"
                            />
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- End form anggota KoTA -->
              </v-col>
              <!-- End Form Kiri -->


              <!-- Start Form Kanan -->
              <v-col cols="6" >
                <!-- Start form Pembimbing -->
                <v-row>
                  <v-col cols="12">
                    <span style="font-size:1rem;">Dosen Pembimbing</span>
                  </v-col>
                  <v-col cols="12" >
                    <v-row v-for="(item, index) in formPembimbing" :key="index">
                      <v-col>
                        <v-select
                          v-model="item.selectedItem"
                          :items="filteredPembimbing(index)"
                          clearable
                          outlined
                          hide-details
                          disabled
                          dense
                          :menu-props="{ offsetY: true}"
                          :placeholder="'Pilih Pembimbing ' + (index + 1)"
                        >
                          <template v-slot:prepend-item>
                            <v-text-field
                            style="width: 97%;margin-left: auto;margin-right: auto;"
                              v-model="item.search"
                              :label="'Cari Pembimbing ' + (index + 1)"
                              hide-details
                              @input="onSearchPembimbing(index)"
                            />
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- End form Pembimbing -->

                <!-- Start form Penguji -->
                <v-row>
                  <v-col cols="12">
                    <span style="font-size:1rem;">Dosen Penguji</span>
                  </v-col>
                  <v-col cols="12" >
                    <v-row v-for="(item, index) in formPenguji" :key="index">
                      <v-col>
                        <v-select
                          v-model="item.selectedItem"
                          :items="filteredPenguji(index)"
                          clearable
                          outlined
                          hide-details
                          disabled
                          dense
                          :menu-props="{ offsetY: true}"
                          :placeholder="'Pilih Penguji ' + (index + 1)"
                        >
                          <template v-slot:prepend-item>
                            <v-text-field
                            style="width: 97%;margin-left: auto;margin-right: auto;"
                              v-model="item.search"
                              :label="'Cari Penguji ' + (index + 1)"
                              hide-details
                              @input="onSearchPenguji(index)"
                            />
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- End form Penguji -->
                
              </v-col>
              <!-- End Form Kanan -->
            </v-row>
            <!-- End Form -->

            <!-- Start Button Simpan Perubahan -->
            <v-row >
              <v-col class="text-right" >
                <v-btn color="primary" @click="delete_data" style="margin-right: 1%;" left>
                  <v-icon style="color: #FFFFFF;" left>mdi-trash-can-outline</v-icon>
                  Delete
                </v-btn>
                <v-btn color="primary" @click="edit_data(detailKoTA.id_KoTA)" left>
                  <v-icon style="color: #FFFFFF;" left>mdi-file-edit-outline</v-icon>
                  Ubah Data
                </v-btn>
              </v-col>
            </v-row>
            <!-- End Button Simpan Perubahan -->
          </v-form>
        </v-card-text>
    </div>
    </v-card>
      <!-- Start Card Pop up Delete Data Mahasiswa -->
      <v-dialog v-model="dialogDelete" max-width="350">
        <v-card>
          <v-card-title class="headline">
            Delete KoTA 
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
    <!-- End Card -->

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
export default {
  data() {
    return {

      detailKoTA:'',
      mahasiswaKoTA:'',
      pembimbingKoTA:'',
      pengujiKoTA:'',

      dialogDelete: false,
      // Data Form Nama
      ID_KoTA : '',
      rules: [
        value => !!value || 'Required.',
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],

      // Data Tahun Ajaran
      tahunAjaran: '2022/2023',
      listTahunAjaran: [],

      //Maksimal dan minimal pilihan form
      MahasiswaMinItems: 2,
      MahasiswaMaxItems: 4,
      PembimbingMinItems: 2,
      PembimbingMaxItems: 3,

      // Notifikasi Berhasil
      snackbar: {
        show: false,
        message: "",
        color: "",
      },

      //Data List Dropdown
      form: '',
      formPembimbing: '',
      formPenguji: '',

    }
  },
  mounted() {
    this.generateListTahunAjaran();
    this.initializeDetailKoTA()
  },

  computed: {
    filteredItems() {
      return (index) => {
        const items = this.form[index].items;
        const search = this.form[index].search;
        if (search.length === 0) {
          return items;
        } else {
          return items.filter((item) =>
            item.toLowerCase().includes(search.toLowerCase())
          );
        }
      };
    },
    filteredPembimbing() {
      return (index) => {
        const items = this.formPembimbing[index].items;
        const search = this.formPembimbing[index].search;
        if (search.length === 0) {
          return items;
        } else {
          return items.filter((item) =>
            item.toLowerCase().includes(search.toLowerCase())
          );
        }
      };
    },
    filteredPenguji() {
      return (index) => {
        const items = this.formPenguji[index].items;
        const search = this.formPenguji[index].search;
        if (search.length === 0) {
          return items;
        } else {
          return items.filter((item) =>
            item.toLowerCase().includes(search.toLowerCase())
          );
        }
      };
    },
  },

  methods: {
    async initializeDetailKoTA() {
      // detail kotga
        try {
        const response = await axios.get('http://localhost:3000/api/KoTA/'+ this.$route.params.id)
        this.detailKoTA = response.data.data
        this.tahunAjaran = this.detailKoTA.tahun_ajaran
        this.ID_KoTA = this.detailKoTA.nama_KoTA
      } catch (error) { 
        console.log(error.message.request)
      }
      // mahasiswa kota
      try {
          const responseList = await axios.get(`http://localhost:3000/api/mahasiswa/`);
          const listMahasiswa = responseList.data.data
          const response = await axios.get('http://localhost:3000/api/mahasiswakota/'+ this.$route.params.id)
          this.mahasiswaKoTA= response.data.data
       
        
          const selectedItem = this.mahasiswaKoTA.map((item) => ({
            selectedItem: item.NIM,
            items: listMahasiswa.map((mhs) =>({ value: mhs.NIM, text: `${mhs.NIM} - ${mhs.nama}` })),
            search: ""
          }));
          this.form = selectedItem;
           
        
        } catch (error) {
          console.error(error.message);
        }
      

      // pembimbing kota
      try {
        const responseList = await axios.get(`http://localhost:3000/api/dosen/`);
        const listDosen = responseList.data.data
        const response = await axios.get('http://localhost:3000/api/relasibykota/pembimbing/'+ this.$route.params.id)
        this.pembimbingKoTA = response.data.data
        
        // Set nilai items dan search pada setiap elemen form
        const selectedItem = this.pembimbingKoTA.map((item) => ({
          selectedItem: item.NIP,
          items: listDosen.map((dsn) =>({ value: dsn.NIP, text: `${dsn.NIP} - ${dsn.nama}` })),
          search: ""
        }));
   
        this.formPembimbing = selectedItem

      } catch (error) { 
        console.log(error.message.request)
      }
      // penguji kota
      try {
        const responseList = await axios.get(`http://localhost:3000/api/dosen/`);
        const listDosen = responseList.data.data
        const response = await axios.get('http://localhost:3000/api/relasibykota/penguji/'+ this.$route.params.id)
        this.pengujiKoTA = response.data.data
       
         // Set nilai items dan search pada setiap elemen form
        const selectedItem = this.pengujiKoTA.map((item) => ({
          selectedItem: item.NIP,
          items: listDosen.map((dsn) =>({ value: dsn.NIP, text: `${dsn.NIP} - ${dsn.nama}` })),
          search: ""
        }));
   
        this.formPenguji = selectedItem

      } catch (error) { 
        console.log(error.message.request)
      }
    
    },
    async edit_data(ID_KoTA){
      const response = await axios.get(`http://localhost:3000/api/checkkajurkaprodi`);
      const CanADD = response.data
      if ((CanADD.kajur == 1) && (CanADD.kaprodi == 2)){
        this.$router.push(`/koordinator/KoTA/edit_KoTA/${ID_KoTA}`);
      }
      else {
        this.snackbar.show = true;
        this.snackbar.color = "error";
        this.snackbar.message = "Mohon Tambahkan data Kaprodi dan Kajur terlebih dahulu di halaman data Dosen";
      }
    },
    delete_data(){
      this.dialogDelete = true
    },

    deleteItemConfirm () {

      axios({
        method:'delete',
        url: 'http://localhost:3000/api/KoTAwithLaporan/'+ this.$route.params.id
        
      })
      .then(response => {
      
        console.log(response.data)
        this.$router.push('/koordinator/KoTA');
        this.closeDelete()
       

      })
      .catch(error => {
          console.log(error.request.response)
      })

       
      },

    closeDelete () {
      this.dialogDelete = false
    },

    generateListTahunAjaran() {
      const currentYear = new Date().getFullYear();
      const list = [];
      for (let i = currentYear - 3; i < currentYear + 4; i++) {
        const tahunAjaran = `${i}/${i + 1}`;
        list.push({ tahunAjaran });
      }
      this.listTahunAjaran = list;
    },

    onSearchInput(index) {
      if (this.form[index].search.length > 0) {
        this.form[index].selectedItem = null;
      }
    },

    onSearchPembimbing(index) {
      if (this.formPembimbing[index].search.length > 0) {
        this.formPembimbing[index].selectedItem = null;
      }
    },

    onSearchPenguji(index) {
      if (this.formPenguji[index].search.length > 0) {
        this.formPenguji[index].selectedItem = null;
      }
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

::v-deep .v-select-list .v-list-item {
  font-size: 2rem ;
}

.theme--light.v-icon{
  color:#1A5F7A;
}

.v-card__subtitle, .v-card__text{
  line-height: 2.5rem;
}

</style>
