<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Tambah KoTA</h4>
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
      to="/koordinator/KoTA/tambah_KoTA">
        <span>Tambah KoTA</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Card -->
    <v-card
    class="custom-card"
    style="margin-bottom: 2%;"
    >
      <div style="width: 97%;margin-left: auto;margin-right: auto;">
        <v-card-title>Tambah Data KoTA</v-card-title>
        <v-card-text >
          <v-form ref="form" v-model="valid">
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
                :maxlength="3"
                :rules="rules.ID_KoTA"
                placeholder="Id KoTA"
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
                  :rules="rules.tahun_ajaran"
                  clearable
                  :items="listTahunAjaran"
                  placeholder="-/-"
                  item-text="tahunAjaran"
                  item-value="tahunAjaran"
                  dense
                  outlined
                  :menu-props="{ offsetY: true, maxHeight: '200px' }"
                />
                <!-- End Form Tahun Ajaran -->
                <!-- Start form anggota KoTA -->
                <v-row>
                  <v-col cols="6">
                    <span style="font-size:1rem;">Anggota KoTA</span>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center justify-end">
                    <v-btn
                      v-if="form.length > MahasiswaMinItems"
                      color="error"
                      icon
                      @click="removeForm(form.length - 1)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="form.length < MahasiswaMaxItems"
                      color="primary"
                      icon
                      @click="addForm"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" >
                    <v-row v-for="(item, index) in form" :key="index">
                      <v-col>
                        <v-select
                          v-model="item.selectedItem"
                          :items="filteredItems(index)"
                          :rules="[uniqueMahasiswaRule(index)]"
                          clearable
                          outlined
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
                  <v-col cols="6">
                    <span style="font-size:1rem;">Dosen Pembimbing</span>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center justify-end">
                    <v-btn
                      v-if="formPembimbing.length > PembimbingMinItems"
                      color="error"
                      icon
                      @click="removeFormPembimbing(formPembimbing.length - 1)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="formPembimbing.length < PembimbingMaxItems"
                      color="primary"
                      icon
                      @click="addFormPembimbing"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" >
                    <v-row v-for="(item, index) in formPembimbing" :key="index">
                      <v-col>
                        <v-select
                          v-model="item.selectedItem"
                          :items="filteredPembimbing(index)"
                          :rules="[uniquePembimbingRule(index), uniqueDosenRule(index, 1)]"
                          clearable
                          outlined
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
                  <v-col cols="6">
                    <span style="font-size:1rem;">Dosen Penguji</span>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center justify-end">
                    <v-btn
                      v-if="formPenguji.length > PengujiMinItems"
                      color="error"
                      icon
                      @click="removeFormPenguji(formPenguji.length - 1)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="formPenguji.length < PengujiMaxItems"
                      color="primary"
                      icon
                      @click="addFormPenguji"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" >
                    <v-row v-for="(item, index) in formPenguji" :key="index">
                      <v-col>
                        <v-select
                          v-model="item.selectedItem"
                          :items="filteredPenguji(index)"
                          :rules="[uniquePengujiRule(index), uniqueDosenRule(index, 2)]"
                          clearable
                          outlined
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
                <v-btn 
                  color="primary" 
                  @click="save" 
                  :disabled="!valid"
                  >Simpan
                </v-btn>
              </v-col>
            </v-row>
            <!-- End Button Simpan Perubahan -->
          </v-form>
        </v-card-text>
    </div>
    </v-card>
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
      kaprodiData:[],
      kajurData:'',
      statusAddKota: false,
      loggedIn:'',
      navbar:'',
      ProdiAktif:'',
      // Data Form Nama
      ID_KoTA : '',
      KoTA_id_user : null,
      // Data Tahun Ajaran
      tahunAjaran: '',
      listTahunAjaran: [],

      MahasiswaFiltered:'',

      //Maksimal dan minimal pilihan form
      MahasiswaMinItems: 1,
      MahasiswaMaxItems: 3,
      PembimbingMinItems: 2,
      PembimbingMaxItems: 2,
      PengujiMinItems: 2,
      PengujiMaxItems: 3,

      //Data List Dropdown
      form: [
        { selectedItem: null, items: [{ NIM: '', nama: ''},{ NIM: '', nama: ''},], search: '' },
        { selectedItem: null, items: [{ NIM: '', nama: ''},{ NIM: '', nama: ''},], search: '' },
      ],
      

      formPembimbing: [
        { selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' },
        { selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' },
      ],

      formPenguji: [
        { selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' },
        { selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' },
      ],

      // Data Validasi
      valid: false,
      rules: {
        ID_KoTA: [
          v => !!v || "ID_KoTA wajib diisi",
          v => /^[0-9]+$/.test(v) || 'ID harus berupa angka',
          v => (v && v.length >= 3) || "ID_KoTA Minimal 3 angka",
          v => (v && v.length <= 3) || "ID_KoTA Maksimal 3 angka"
        ],
        tahun_ajaran: [
          v => !!v || "Tahun Ajaran wajib diisi",
        ],
      },

      // Notifikasi Berhasil
      snackbar: {
        show: false,
        message: "",
        color: "",
      },

    }
  },
  mounted() {

    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.navbar= payload.user;
    }
    this.CheckPimpinan();
    this.initializeNavbarLoggedIn()
    this.generateListTahunAjaran();
    this.initializePimpinanList()
    this.initializePembimbingList();
    this.initializePengujiList();

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
            item.text.toLowerCase().includes(search.toLowerCase())
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
            item.text.toLowerCase().includes(search.toLowerCase())
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
            item.text.toLowerCase().includes(search.toLowerCase())
          );
        }
      };
    },
  },

  methods: {
  
    async CheckPimpinan(){
      const response = await axios.get(this.$root.BASE_URL + `/api/checkkajurkaprodi`);
        const CanADD = response.data
        if (CanADD.pimpinan < 3){
          this.$router.push(`/koordinator/KoTA`);
        }
    },

     async initializePimpinanList() {
        const responsePimpinan = await axios.get(this.$root.BASE_URL + '/api/jabatan')
        this.PimpinanData = responsePimpinan.data.data
        this.kajurData = this.PimpinanData[0].Dosen_id_user
        this.kaprodiData[0] = this.PimpinanData[1].Dosen_id_user
        this.kaprodiData[1] = this.PimpinanData[2].Dosen_id_user
     },

     async initializeNavbarLoggedIn (){
        const token = localStorage.getItem('token'); 
        const headers = { Authorization: `Bearer ${token}` };
        
        try {
          const response = await axios.get(this.$root.BASE_URL + `/api/getkoordata/${this.navbar.id_user}`, { headers });
          this.loggedIn = response.data.data[0]
          this.initializeMahasiswaList();
         
        } catch (error) {
          console.error(error.message);
        }
     },
    // Start Validasi Input
    uniqueMahasiswaRule(index) {
      return v => {
        if (!v) return 'Anggota wajib diisi';
        const duplicate = this.form.filter((anggota, i) => i !== index && anggota.selectedItem === v);
        return duplicate.length === 0 || 'Tidak boleh memilih mahasiswa yang sama';
      };
    },
    
    uniquePembimbingRule(index) {
      return v => {
        if (!v) return 'Pembimbing wajib diisi';
        const duplicate = this.formPembimbing.filter((anggota, i) => i !== index && anggota.selectedItem === v);
        return duplicate.length === 0 || 'Tidak boleh memilih Pembimbing yang sama';
      };
    },

    uniqueDosenRule(index, pengampu) {
      return v => {
        // Cari duplicate dalam pengampu yang sama
        const kelompokAnggota = pengampu === 1 ? this.formPembimbing : this.formPenguji;
        const duplicate = kelompokAnggota.filter((anggota, i) => i !== index && anggota.selectedItem === v);

        // Cari duplicate dalam pengampu yang berbeda
        const otherKelompokAnggota = pengampu === 1 ? this.formPenguji : this.formPembimbing;
        const otherDuplicate = otherKelompokAnggota.filter(anggota => anggota.selectedItem === v);

        return duplicate.length === 0 && otherDuplicate.length === 0 || 'Tidak boleh memilih Dosen sebagai Pembimbing dan Penguji';
      };
    },

    uniquePengujiRule(index) {
      return v => {
        if (!v) return 'Penguji wajib diisi';
        const duplicate = this.formPenguji.filter((anggota, i) => i !== index && anggota.selectedItem === v);
        return duplicate.length === 0 || 'Tidak boleh memilih Penguji yang sama';
      };
    },

    // End Validasi Input

    async initializeMahasiswaList () {
        try {
          const response = await axios.get(this.$root.BASE_URL + `/api/mahasiswa/${this.loggedIn.id_prodi}`);
          const mahasiswa = response.data.data
          console.log(mahasiswa)

          this.MahasiswaFiltered = mahasiswa.filter((item) => item.KoTA_id_user == null);

          this.form.forEach((item) => {
            item.items = this.MahasiswaFiltered.map((mhs) => ({ value: mhs.NIM, text: `${mhs.NIM} - ${mhs.nama}` }));
          });
        } catch (error) {
          console.error(error.message);
        }
      },

    async initializePembimbingList () {
        try {
          const response = await axios.get(this.$root.BASE_URL + `/api/dosen`);
          const dosen = response.data.data
        
          this.formPembimbing.forEach((item) => {
            item.items = dosen.map((dsn) => ({ value: dsn.id_user, text: `${dsn.NIP} - ${dsn.nama}` }));
          });
        } catch (error) {
          console.error(error.message);
        }
      },

    async initializePengujiList () {
        try {
          const response = await axios.get(this.$root.BASE_URL + `/api/dosen`);
          const dosen = response.data.data
        
          this.formPenguji.forEach((item) => {
            item.items = dosen.map((dsn) => ({ value: dsn.id_user, text: `${dsn.NIP} - ${dsn.nama}` }));
          });
        } catch (error) {
          console.error(error.message);
        }
      },
     async save() {

      // ini belum validasi kalo nip atau di pembimbing atau penguji ada yang sama ataapun mahasiswa

      const tahunAjaran = this.tahunAjaran;
      const namaKota = this.ID_KoTA;
      const tahunAjaranTanpaTanda = tahunAjaran.replace("/", "");
      const generatedIdKota = tahunAjaranTanpaTanda.slice(0, 4) + namaKota + tahunAjaranTanpaTanda.slice(4);
      
      if (this.loggedIn.nama_prodi === 'D4') {
        this.ProdiAktif = 'PRD001'
      }
      else {
        this.ProdiAktif = 'PRD002'
      }

      // insert data to kota 
      await axios({
        method:'post',
        url: this.$root.BASE_URL + '/api/signupuser/kota',
        data: {
          username: generatedIdKota,
          nama_KoTA: namaKota,
          tahun_ajaran: tahunAjaran,
          jumlah_pembimbing: this.formPembimbing.length,
          jumlah_penguji: this.formPenguji.length,
        } 
      })
      .then(response => {
        this.statusAddKota = true
        this.KoTA_id_user = response.data.KoTA_id_user
        console.log(response.data)

      })
      .catch(error => {
          console.log(error.request.response) 
          this.MessageError = error.request.response
          if (this.MessageError.includes('Username must be unique')){
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.message = "ID_KoTA sudah terdaftar!";
            throw "ID_KoTA sudah terdaftar!";
          }
      })
      // insert data to laporan 
      await axios({
        method:'post',
        url: this.$root.BASE_URL + '/api/laporan',
        data: {
          id_laporan:generatedIdKota,
          KoTA_id_user: this.KoTA_id_user,
        } 
      })
      .then(response => {
        this.statusAddKota = true
        console.log(response.data)

      })
      .catch(error => {
          console.log(error.request.response)
      })

      // START update status mahasiswa (kota dan isketua)
      
      if (this.form.length === 1) {
        await axios({
          method:'put',
          url: this.$root.BASE_URL + '/api/mahasiswastatus/'+ this.form[0].selectedItem,
          data: {
            KoTA_id_user: this.KoTA_id_user,
            isKetua: true 
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      }

      else if (this.form.length === 2) {
        await axios({
          method:'put',
          url: this.$root.BASE_URL + '/api/mahasiswastatus/'+ this.form[0].selectedItem,
          data: {
            KoTA_id_user: this.KoTA_id_user,
            isKetua: true 
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
          url: this.$root.BASE_URL + '/api/mahasiswastatus/'+ this.form[1].selectedItem,
          data: {
            KoTA_id_user: this.KoTA_id_user,
            isKetua: false 
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      }

      else if (this.form.length === 3) {
        axios({
          method:'put',
          url: this.$root.BASE_URL + '/api/mahasiswastatus/'+ this.form[0].selectedItem,
          data: {
            KoTA_id_user: this.KoTA_id_user,
            isKetua: true 
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
          url: this.$root.BASE_URL + '/api/mahasiswastatus/'+ this.form[1].selectedItem,
          data: {
            KoTA_id_user: this.KoTA_id_user,
            isKetua: false 
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
          url: this.$root.BASE_URL + '/api/mahasiswastatus/'+ this.form[2].selectedItem,
          data: {
            KoTA_id_user: this.KoTA_id_user,
            isKetua: false 
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      }
      // END update status mahasiswa (kota dan isketua)
      if (this.statusAddKota){
         // START Relasi Pembimbing
      if (this.formPembimbing.length === 2) {
        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPembimbing[0].selectedItem,
            role:'Pembimbing',
            urutan: 1
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })

        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPembimbing[1].selectedItem,
            role:'Pembimbing',
            urutan: 2
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      }

     

      else if (this.formPembimbing.length === 3) {
        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPembimbing[0].selectedItem,
            role:'Pembimbing',
            urutan: 1
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })

        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPembimbing[1].selectedItem,
            role:'Pembimbing',
            urutan: 2
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })

        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPembimbing[2].selectedItem,
            role:'Pembimbing',
            urutan: 3
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      }
      // END Relasi Pembimbing

      // START Relasi Penguji

      if (this.formPenguji.length === 2) {
        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPenguji[0].selectedItem,
            role:'Penguji',
            urutan: 1
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })

        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPenguji[1].selectedItem,
            role:'Penguji',
            urutan: 2
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      }
      else if (this.formPenguji.length === 3) {
        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPenguji[0].selectedItem,
            role:'Penguji',
            urutan: 1
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })

        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPenguji[1].selectedItem,
            role:'Penguji',
            urutan: 2
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.formPenguji[2].selectedItem,
            role:'Penguji',
            urutan: 3
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      }

      // relasi Kaprodi
      if (this.loggedIn.id_prodi === 'PRD001') {
        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.kaprodiData[1],
            role:'Kaprodi',
            urutan: null
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      }

      else if (this.loggedIn.id_prodi === 'PRD002') {
        await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.kaprodiData[0],
            role:'Kaprodi',
            urutan: null
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      }
      // relasi Kajur
      await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/relasi/',
          data: {
            KoTA_id_user: this.KoTA_id_user,
            Dosen_id_user: this.kajurData,
            role:'Kajur',
            urutan: null
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
      // relasi Secret Key
      await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/sharekey/',
          data: {
            id_laporan:'Laporan_' + generatedIdKota,
            
          } 
        })
        .then(response => {
        
          console.log(response.data)

        })
        .catch(error => {
            console.log(error.request.response)
        })
    }
     

      this.$router.push('/koordinator/KoTA')

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

    addForm() {
      this.form.push({ selectedItem: null, items: [{ NIM:'', nama:'' }], search: '' });
      this.initializeMahasiswaList()
    },

    removeForm(index) {
      this.form.splice(index, 1);
    },

    addFormPembimbing() {
      this.formPembimbing.push({ selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' });
      this.initializePembimbingList();
    },

    removeFormPembimbing(index) {
      this.formPembimbing.splice(index, 1);
    },

    addFormPenguji() {
      this.formPenguji.push({ selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' });
      this.initializePengujiList();
   },

    removeFormPenguji(index) {
      this.formPenguji.splice(index, 1);
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
