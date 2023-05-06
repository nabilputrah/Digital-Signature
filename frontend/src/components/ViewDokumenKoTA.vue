<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Dokumen Laporan TA</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/KoTA/dokumen_laporan">
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
                  <v-text-field__details></v-text-field__details>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field 
                v-model="judul_tugas_akhir"
                :rules="rules"
                placeholder="Judul Tugas Akhir"
                dense
                outlined
                ></v-text-field>
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
                  <v-text-field__details></v-text-field__details>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-menu
                  v-model="menu_disetujui"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="tanggal_disetujui"
                      placeholder="Tanggal Disetujui"
                      dense
                      outlined
                      readonly
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    >
                  </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="tanggal_disetujui"
                    @input="menu_disetujui = false"
                  ></v-date-picker>
                </v-menu>
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
                  <v-text-field__details></v-text-field__details>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-menu
                  v-model="menu_disidangkan"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="tanggal_disidangkan"
                      placeholder="Tanggal Disidangkan"
                      dense
                      outlined
                      readonly
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    >
                  </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="tanggal_disidangkan"
                    @input="menu_disidangkan = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <!-- End Form Tanggal Disidangkan -->
            <!-- Start Button Simpan Perubahan -->
            <v-row >
              <v-col class="text-right" >
                <v-btn color="primary" @click="save">Simpan Perubahan</v-btn>
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
              @click="add_Dokumen"
              style="margin-top: auto;margin-bottom: auto;" 
            >
              + Tambah Dokumen
            </v-btn>
            <!-- Start Card Pop up Delete Data Dosen -->
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
            <!-- End Card Pop up Delete Data Dosen -->
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
            @click="unduhItem(item)"
          >
            mdi-tray-arrow-down
          </v-icon>
        </template>
        <!-- End Kolom Action -->
        <!-- Start Kolom Dokumen -->
        <template v-slot:[`item.dokumen`]="{ item }">
          <v-icon
            class="mr-2"
            @click="redirectToDetail(item.ID_laporan)"
          >
            mdi-file-document-outline
          </v-icon>
        </template>
        <!-- End Kolom Dokumen -->
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
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
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!-- End Datatables -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      // Data Form Nama
      judul_tugas_akhir : "",
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
          text: 'ID Laporan',
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
          value: 'dosen',
        },
        { text: 'Peran', value: 'peran'},
        { text: 'Urutan', value: 'urutan', sortable: false },
        { text: 'Status Tanda Tangan', value: 'status', sortable: false },
      ],
      Laporan: [],
      Pengampu : [],
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    save() {
      // your save implementation here
    },
    add_Dokumen(){
      // your save implementation here
    },
    initialize () {
        this.Laporan = [
          {
            ID_laporan: 'Laporan_402_v1',
            tanggal_dibuat: '2023-05-04',
          },
          {
            ID_laporan: 'Laporan_402_Final',
            tanggal_dibuat: '2023-05-05',
          },
        ],
        this.Pengampu = [
          {
            dosen: 'Aprianti Nanda Sari, S.T., M.Kom.',
            peran: 'Pembimbing',
            urutan : 1,
            status : true
          },
          {
            dosen: 'Ghifari Munawar, S.Kom., M.T',
            peran: 'Pembimbing',
            urutan : 2,
            status : true
          },
          {
            dosen: 'Yadhi Adhitia P., S.T.',
            peran: 'Ketua Jurusan',
            urutan : '',
            status : false
          },
        ]
    },
    redirectToDetail(ID_laporan) {
      this.$router.push(`/KoTA/dokumen_detail/${ID_laporan}`);
    },
    deleteItem (item) {
      this.editedIndex = this.Laporan.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.Laporan.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    unduhItem () {
      
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

</style>
