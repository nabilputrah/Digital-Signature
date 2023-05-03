<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Profil</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="false" 
      to="/">
        <v-icon >mdi-home-outline</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :exact="true"
      to="/KoTA">
        Data Kota
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="false"
      to="/KoTA/tambah_KoTA">
        <span>Tambah KoTA</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Card -->
    <v-card
    class="custom-card"
    >
      <div style="width: 97%;margin-left: auto;margin-right: auto;">
        <v-card-title>Edit Data Tahun Ajaran</v-card-title>
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
                          clearable
                          outlined
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
                          clearable
                          outlined
                          hide-details
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
                          clearable
                          outlined
                          hide-details
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
                <v-btn color="primary" @click="save">Simpan</v-btn>
              </v-col>
            </v-row>
            <!-- End Button Simpan Perubahan -->
          </v-form>
        </v-card-text>
    </div>
    </v-card>
    <!-- End Card -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      // Data Form Nama
      ID_KoTA : '',
      rules: [
        value => !!value || 'Required.',
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],

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
        { selectedItem: null, items: ['Andika Yudha', 'Nabil Putra H', 'Fachri Dia', 'Titis Sampurno'], search: '' },
        { selectedItem: null, items: ['Andika Yudha', 'Nabil Putra H', 'Fachri Dia', 'Titis Sampurno'], search: '' },
      ],

      formPembimbing: [
        { selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' },
        { selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' },
      ],

      formPenguji: [
        { selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' },
        { selectedItem: null, items: ['Aprianti Nanda Sari, S.T., M.Kom.', 'Ghifari Munawar, S.Kom., M.T', 'Iwan Awaludin, S.T., M.T. ', 'Urip Teguh Setijohatmo, BSCS., M.Kom.'], search: '' },
      ],

    }
  },
  mounted() {
    this.generateListTahunAjaran();
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
    save() {
      // your save implementation here
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
