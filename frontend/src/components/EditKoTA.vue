<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Sunting Data KoTA</h4>
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
      style="color: #1a5f7a;"
      >
        <span style="cursor: pointer;" >Detail KoTA</span>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="false"
      to="/koordinator/KoTA/edit_KoTA">
        <span>Sunting Data KoTA</span>
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
                disabled
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
                          :rules="[uniquePembimbingRule(index)]"
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
                          :rules="[uniquePengujiRule(index)]"
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
                  style="margin-right: 1%;"
                  color="primary" 
                  @click="BackToDetail(ID_KoTA)"
                  >Cancel
                </v-btn>
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
    <!-- Start Card Pop up Email Data KoTA -->
    <v-dialog 
      v-model="saveSucced" 
      max-width="350"
      >
      <v-card>
        <v-card-title class="headline">
          Save Data 
        </v-card-title>
        <v-card-text>
          <div>Data KoTA Berhasil Diubah</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="BackToDetail(ID_KoTA)"
          >
            Kembali
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Card Pop up Email Data KoTA -->
    <!-- End Card -->
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      id_laporan:'',
      statusAddKota: false,
      statusDeleteKota: false,
      
      detailKoTA:'',
      mahasiswaKoTA:'',
      pembimbingKoTA:'',
      pengujiKoTA:'',

      // Data Form Nama
      ID_KoTA : '',

      // Data Tahun Ajaran
      tahunAjaran: '',
      listTahunAjaran: [],

      //Maksimal dan minimal pilihan form
      MahasiswaMinItems: 1,
      MahasiswaMaxItems: 3,
      PembimbingMinItems: 2,
      PembimbingMaxItems: 3,
      PengujiMinItems: 2,
      PengujiMaxItems: 3,

      //Data List Dropdown
      form: [
        { selectedItem: null, items: [{ value: 'aa', text: 'ab'},{ value: 'aa', text: 'aa'},], search: '' },
        { selectedItem: null, items: [{ value: 'aa', text: 'aa'},{ value: 'aa', text: 'aa'},], search: '' },

      ],
      formPembimbing: '',
      formPenguji: '',

      saveSucced : false,

      // Data Validasi
      valid: true,
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
        // console.log(this.form[0].selectedItem)
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
    async save() {
      // this.$router.push(`/koordinator/KoTA/detail_KoTA/${ID_KoTA}`);

      // Delete KoTA
    
      await axios({
        method:'delete',
        url: 'http://localhost:3000/api/KoTA/'+ this.$route.params.id,
        
      })
      .then(response => {
      
        console.log(response.data.data)
        this.id_laporan = response.data.id_laporan
        this.statusDeleteKota = true
      })
      .catch(error => {
          console.log(error.request.response)
      })



      
        // Insert new KoTA
      const tahunAjaran = this.tahunAjaran;
      const namaKota = this.ID_KoTA;
      const tahunAjaranTanpaTanda = tahunAjaran.replace("/", "");
      const generatedIdKota = tahunAjaranTanpaTanda.slice(0, 4) + namaKota + tahunAjaranTanpaTanda.slice(4);
      
      await axios({
        method:'post',
        url: 'http://localhost:3000/api/signupuser/kota',
        data: {
          username: generatedIdKota,
          nama_KoTA: namaKota,
          tahun_ajaran: tahunAjaran,
          id_prodi: 'PRD001',
          jumlah_pembimbing: this.formPembimbing.length,
          jumlah_penguji: this.formPenguji.length,
        } 
      })
      .then(response => {
        this.statusAddKota = true
        console.log(response.data)

      })
      .catch(error => {
          console.log(error.request.response)
      })

      // insert data to laporan, ubah update simpan id laporan pas query di awal 
      await axios({
        method:'put',
        url: 'http://localhost:3000/api/laporanidkota/' + this.id_laporan,
        data: {
          id_laporan:generatedIdKota,
          id_KoTA: generatedIdKota,
       
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
          url: 'http://localhost:3000/api/mahasiswastatus/'+ this.form[0].selectedItem,
          data: {
            id_KoTA: generatedIdKota,
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
          url: 'http://localhost:3000/api/mahasiswastatus/'+ this.form[0].selectedItem,
          data: {
            id_KoTA: generatedIdKota,
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
          url: 'http://localhost:3000/api/mahasiswastatus/'+ this.form[1].selectedItem,
          data: {
            id_KoTA: generatedIdKota,
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
          url: 'http://localhost:3000/api/mahasiswastatus/'+ this.form[0].selectedItem,
          data: {
            id_KoTA: generatedIdKota,
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
          url: 'http://localhost:3000/api/mahasiswastatus/'+ this.form[1].selectedItem,
          data: {
            id_KoTA: generatedIdKota,
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
          url: 'http://localhost:3000/api/mahasiswastatus/'+ this.form[2].selectedItem,
          data: {
            id_KoTA: generatedIdKota,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPembimbing[0].selectedItem,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPembimbing[1].selectedItem,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPembimbing[0].selectedItem,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPembimbing[1].selectedItem,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPembimbing[2].selectedItem,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPenguji[0].selectedItem,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPenguji[1].selectedItem,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPenguji[0].selectedItem,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPenguji[1].selectedItem,
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
          url: 'http://localhost:3000/api/relasi/',
          data: {
            id_KoTA: generatedIdKota,
            NIP: this.formPenguji[2].selectedItem,
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
        
      }
      this.openDialogWithTimeout()
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

    uniquePengujiRule(index) {
      return v => {
        if (!v) return 'Penguji wajib diisi';
        const duplicate = this.formPenguji.filter((anggota, i) => i !== index && anggota.selectedItem === v);
        return duplicate.length === 0 || 'Tidak boleh memilih Penguji yang sama';
      };
    },

    // End Validasi Input

    openDialogWithTimeout() {
      this.saveSucced = true
      setTimeout(() => {
        this.dialog = false
        // redirect to another page after dialog is closed
        this.$router.push(`/koordinator/KoTA/detail_KoTA/${this.ID_KoTA}`)
      }, 2000) // set the timeout to 5 seconds
    },

    BackToDetail (ID_KoTA) {
      this.$router.push(`/koordinator/KoTA/detail_KoTA/${ID_KoTA}`);
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
      this.form.push({ selectedItem: null, items: ['Andika Yudha', 'Nabil Putra H', 'Fachri Dia', 'Titis Sampurno'], search: '' });
    },

    removeForm(index) {
      this.form.splice(index, 1);
    },

    addFormPembimbing() {
      this.formPembimbing.push({ selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' });
    },

    removeFormPembimbing(index) {
      this.formPembimbing.splice(index, 1);
    },

    addFormPenguji() {
      this.formPenguji.push({ selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' });
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
