<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Dokumen Laporan TA</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/dosen/daftar_dokumen">
        <span>Dokumen Laporan TA</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Datatables -->
    <v-card class="custom-card">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="KoTA"
        class="elevation-1"
        style="padding-top: 0.5%;"
      >
        <template v-slot:top>
          <v-toolbar
            dense
            flat
          >
            <v-toolbar-title>Dokumen Laporan TA</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
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
        <!-- Start Kolom Status -->
        <template v-slot:[`item.status`]="{ item }">
          <v-btn
            :style="getButtonStyle(item)"
          >
            {{ item.status ? 'Done' : 'Not Started' }}
          </v-btn>
        </template>
        <!-- End Kolom Status -->
        <!-- Start Kolom Dokumen -->
        <template v-slot:[`item.dokumen`]="{ item }">
          <v-icon
            class="mr-2"
            @click="redirectToDetail(item.ID_KoTA)"
          >
            mdi-file-document-arrow-right
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
  </div>

</template>

<script>
  export default {
    data: () => ({
      search : '',
      headers: [
        {
          text: 'ID KoTA',
          align: 'start',
          value: 'ID_KoTA',
        },
        { text: 'Judul Laporan', value: 'judul_laporan' ,width:'40%'},
        { text: 'Peran', value: 'peran'},
        { text: 'Dokumen Laporan', value: 'dokumen', sortable: false },
        { text: 'Status', value: 'status', sortable: false },
      ],
      KoTA: [],
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.KoTA = [
          {
            ID_KoTA: 402,
            judul_laporan: 'PENGEMBANGAN SISTEM MULTI-USER DIGITAL SIGNATURE UNTUK LAPORAN TUGAS AKHIR DENGAN METODE SECRET SHARING SCHEME',
            peran : 'Pembimbing',
            status : false
          },
          {
            ID_KoTA: 403,
            judul_laporan: 'PENGEMBANGAN SISTEM MULTI-USER DIGITAL SIGNATURE UNTUK LAPORAN TUGAS AKHIR DENGAN METODE SECRET SHARING SCHEME',
            peran : 'Penguji',
            status : true
          },
        ]
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

      redirectToDetail(ID_KoTA) {
        this.$router.push(`/dosen/daftar_dokumen/dokumen_detail/${ID_KoTA}`);
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
