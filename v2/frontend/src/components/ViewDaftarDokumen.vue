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
        :sort-by="['tahun_ajaran', 'id_KoTA']"
        :sort-desc="[true, false]"
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
            <v-spacer></v-spacer>
            <!-- <v-toolbar-title class="text_main--text text-end" style="line-height:1.2rem;">
              <v-row no-gutters style="justify-content: end; ">
                <span>Batas Tanggal Yudisium 1 : 22-06-2023</span>
              </v-row>
              <v-row no-gutters style="justify-content: end; ">
                <span>Batas Tanggal Yudisium 1 : 22-06-2023</span>
              </v-row>
              <v-row no-gutters style="justify-content: end; ">
                <span>Batas Tanggal Yudisium 1 : 22-06-2023</span>
              </v-row>
            </v-toolbar-title> -->
            <div v-for="(item, index) in yudisium" :key="index" style="margin-left: 0.5%;">
              <v-row  no-gutters style="justify-content: end; ">
                <span style="border: 1px solid #ccc; padding: 5px;border-radius: 5px;">Batas Tanggal {{item.nama_yudisium}} : {{item.tgl_yudisium}}</span>
              </v-row>
            </div>
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
            @click="redirectToDetail(item.role, item.id_detailLaporan)"
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
import axios from 'axios'
  export default {
    data: () => ({
      dataFromToken: '',
      dosen:'',
      yudisium:[],
      search : '',
      headers: [
        {
          text: 'ID KoTA',
          align: 'start',
          value: 'id_KoTA',
        },
        { text: 'Tahun Ajaran', value: 'tahun_ajaran'},
        { text: 'Judul Laporan', value: 'judul_TA' ,width:'40%'},
        { text: 'Peran', value: 'role'},
        { text: 'Urutan', value: 'urutan'},
        { text: 'Dokumen Laporan', value: 'dokumen', sortable: false },
        { text: 'Status', value: 'status', sortable: false },
        { text: 'Keterangan', value: 'keterangan', sortable: false },
      ],
      KoTA: [],
    }),

    mounted () {
      const token = localStorage.getItem('token');

      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.dataFromToken= payload.user;
      }
      this.initialize()
    },

    methods: {
      async initialize () {
        
        try{
          const responseYudisium = await axios.get(this.$root.BASE_URL + `/api/yudisium/byKoor/6`);
          const dataYudisium = responseYudisium.data.data

          const mappedYudisium = dataYudisium.map((item) => ({
            nama_yudisium : item.nama_yudisium,
            tgl_yudisium : this.convertDateYudisium(item.tgl_yudisium),
          }));
          this.yudisium = mappedYudisium

        } catch(error){
          console.log(error.message.request)
        }
        
         try {
            const response = await axios.get(this.$root.BASE_URL + `/api/getdosendata/${this.dataFromToken.id_user}`)
            this.dosen = response.data.data[0]
            console.log(this.dosen)
          } catch (error) {
            console.error(error.message);
          }

          try {
            const responseRelasiDosen = await axios.get(this.$root.BASE_URL + '/api/relasibynip/'+ this.dosen.id_user)
            const regex = /^(\d{4})(\d{3})(\d{4})$/;
            const list = responseRelasiDosen.data.data
            console.log(list)

            // const div = document.createElement('div');

            this.KoTA = list.map((item) => {
            const div = document.createElement('div');
            div.innerHTML = item.judul_TA;
            const judulTAText = div.innerText;

            console.log(this.KoTA)

            return {
              id_KoTA: item.id_KoTA ? item.id_KoTA.replace(regex, "$2-$1/$3") : null,
              id_user: item.KoTA_id_user,
              id_detailLaporan : item.id_KoTA,
              tahun_ajaran: item.tahun_ajaran,
              judul_TA: judulTAText,
              role: item.role,
              status: item.status,
              urutan: item.urutan,
              keterangan:'Dokumen dapat ditandatangani'
            };
          });

          } catch (error) {
            console.log(error.message.request)
          }

          this.KoTA.forEach(async (item) => {
            try {
              const response = await axios.get(this.$root.BASE_URL + `/api/relasi/accessttd/${item.role}/${item.id_user}`)
              const akses = response.data.data
              console.log(akses)
              if (akses > 0 && (item.role==='Kaprodi')){
                item.keterangan = 'Dokumen sedang ditandatangani oleh penguji dan pembimbing'
              } else if (akses === 1 && (item.role==='Kajur')){
                item.keterangan = 'Dokumen sedang ditandatangani Kaprodi'
              } else if (akses > 1 && (item.role==='Kajur')){
                item.keterangan = 'Dokumen sedang ditandatangani oleh penguji dan pembimbing'
              }
            } catch (error) {
              console.error(error.message);
            }
          });
          console.log(this.KoTA)
        
      },

      convertDateYudisium(tgl_yudisium) {
        if (tgl_yudisium){
          const date = new Date(tgl_yudisium);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const formattedDate = `${day}-${month}-${year}`;
          return formattedDate
        } else{
          return (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        }
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

      redirectToDetail(role, ID_KoTA) {
        this.$router.push(`/dosen/daftar_dokumen/dokumen_detail/${role}/${ID_KoTA}`);
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
