<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Detail Dokumen Laporan TA</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :exact="true"
      to="/dosen/daftar_dokumen">
        <span>Dokumen Laporan TA</span>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/dosen/daftar_dokumen/detail_dokumen">
        <span>Detail Dokumen Laporan TA</span>
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
                </div>
              </v-col>
              <v-col cols="8" >
                <v-textarea
                  dense
                  readonly
                  outlined
                  disabled
                  rows="1"
                  hide-details
                  auto-grow
                  :value="Judul_Tugas_Akhir"
                ></v-textarea>
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
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field
                  v-model="laporan.tgl_disetujui"
                  placeholder="Tanggal Disetujui"
                  dense
                  outlined
                  hide-details
                  disabled
                  readonly
                  append-icon="mdi-calendar"
                >
              </v-text-field>
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
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field
                  v-model="laporan.tgl_disidangkan"
                  placeholder="Tanggal Disidangkan"
                  dense
                  outlined
                  hide-details
                  disabled
                  readonly
                  append-icon="mdi-calendar"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <!-- End Form Tanggal Disidangkan -->
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
          <v-btn 
            v-if="shouldShowSignatureIcon(item, Laporan)" 
            color="primary"
            :disabled="AksesTTD"
            @click="SignDocument(item)"
          >
            <v-icon 
              color="white" 
              left>mdi-draw</v-icon> Tanda Tangan
          </v-btn>
          <v-icon 
            v-if="shouldShowDownloadIcon(item)" 
            @click="unduhItem()"
          >
            mdi-tray-arrow-down
          </v-icon>
        </template>
        <!-- End Kolom Action -->
        <!-- Start Kolom Dokumen -->
        <template v-slot:[`item.dokumen`]="{ item }">
          <v-icon
            class="mr-2"
            @click="Open_Dokumen(item.dokumen)"
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
    <!-- Start Dialog Buka Dokumen -->
    <v-dialog v-model="Dokumen_Dialog" max-width="90%">
      <div id="pdfContainer"></div>
    </v-dialog>
    <!-- End Dialog Buka Dokumen -->
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

    <!-- Start Dialog input Sharekey  -->
    <v-dialog v-model="dialogShareKey" max-width="500px">
      <v-card>
        <v-card-title>
          Input Share Key
        </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="ShareKeyValid" @submit.prevent>
            <v-text-field
              v-model="shareKey"
              :rules="rules"
              label="Share Key"
              @keyup.enter="validateShareKey"
            >
            </v-text-field>
            <div class="note">
              *Periksa email anda untuk mendapatkan share key
            </div>
            </v-form>
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="closeDialog">Batal</v-btn>
          <v-btn color="primary" :disabled="!ShareKeyValid" @click="validateShareKey">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog input Sharekey  -->

    <!-- Snackbar -->
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
import PDFObject from 'pdfobject';
import axios from 'axios'
export default {
  data() {
    return {
      AksesTTD:false,
      dataFromToken: '',
      dosen:'',
      tanggal_disetujui: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      tanggal_disidangkan : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      rules: [
        value => !!value || 'Required.',
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],

      id_KoTA : '',
      laporan: '',
      Judul_Tugas_Akhir:'',

      //Pop Up dialog Dokumen
      Dokumen_Dialog : false, 
      previewUrl : '',

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
          value: 'nama',
        },
        { text: 'Peran', value: 'role'},
        { text: 'Urutan', value: 'urutan', sortable: false },
        { text: 'Status Tanda Tangan', value: 'status', sortable: false },
      ],
      Laporan: [],
      Pengampu : [],
      
      // Dialog Input Share Key
      dialogShareKey: false,
      ShareKeyValid:false,
      shareKey: '',
      shareKeyDB:'',

      // Notifikasi Berhasil
      snackbar: {
        show: false,
        message: "",
        color: "",
      },

    }
  },

  mounted () {
    const params = new URLSearchParams(window.location.search);
    const DialogshareKey = params.get('DialogShareKey');
    const shareKey = params.get('shareKey');
    const token = localStorage.getItem('token');

    if (DialogshareKey) {
      this.dialogShareKey = true;
    }
    if (shareKey) {
      this.shareKey = shareKey;
    }

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.dataFromToken= payload.user;
    }
    this.initializeToken()
    this.initialize()
    this.initializeAksesTTD()
  },

  methods: {
    save() {
      // your save implementation here
    },
    add_Dokumen(){
      // your save implementation here
    },
    async initializeToken() {
       try {
            const response = await axios.get(this.$root.BASE_URL + `/api/getdosendata/${this.dataFromToken.id_user}`)
            this.dosen = response.data.data[0]
          } catch (error) {
            console.error(error.message);
          }
    },

    async initializeAksesTTD() {

        const response = await axios.get(this.$root.BASE_URL + `/api/ceklembarpengesahan/Laporan_${this.$route.params.id}`)
        const message = response.data.message

        const responseFinal = await axios.get(this.$root.BASE_URL + `/api/getstatuscanTTD/${this.$route.params.id}`)
        const messageFinal = responseFinal.data.statusLaporan

        const responseKoTA = await axios.get(this.$root.BASE_URL + '/api/KoTA/' +this.$route.params.id)
        this.id_KoTA = responseKoTA.data.data.id_user

        if (messageFinal){
          this.AksesTTD = true
        }
        if (message === 'lembar pengesahaan tidak ada'){
          this.AksesTTD = true
        }

        if (this.$route.params.role === "Kaprodi" || this.$route.params.role === "Kajur"){
          try {
            const response = await axios.get(this.$root.BASE_URL + `/api/relasi/accessttd/${this.$route.params.role}/${this.id_KoTA}`)
            const akses = response.data.data
            console.log(akses)
            if (akses > 0){
              this.AksesTTD = true
            }
          } catch (error) {
            console.error(error.message);
          }
        }
    },
    
    async initialize () {
      try {
        const responseKoTA = await axios.get(this.$root.BASE_URL + '/api/KoTA/' +this.$route.params.id)
        this.id_KoTA = responseKoTA.data.data.id_user

        const responseListLaporan = await axios.get(this.$root.BASE_URL + '/api/laporankota/' +this.id_KoTA)
        this.laporan = responseListLaporan.data.data

         const responseRelasi = await axios.get(this.$root.BASE_URL + '/api/relasi/KoTA/' +  this.id_KoTA)
        this.Pengampu = responseRelasi.data.data

        const tempElement = document.createElement('div');
        tempElement.innerHTML = this.laporan.judul_TA;
        this.Judul_Tugas_Akhir = tempElement.innerText;


        if (this.laporan.tgl_disidangkan){
            this.convertDateDisidangkan()
        }
        else {
          this.laporan.tgl_disidangkan = ''
        }
        if (this.laporan.tgl_disetujui){
            this.convertDateDisetujui()
        }
        else {
          this.laporan.tgl_disetujui = ''
        }
        
        if (this.laporan.dokumen_laporan){
          this.Laporan.push({
            ID_laporan: "Laporan Pertama",
            tanggal_dibuat: this.convertDateDibuat(this.laporan.tgl_unggah),
            dokumen: this.laporan.id_laporan + '_Awal'
          });
        }

        if (this.laporan.dokumen_laporan_final){
          this.Laporan.push({
            ID_laporan: "Laporan Final",
            tanggal_dibuat: this.convertDateDibuat(this.laporan.tgl_finalisasi),
            dokumen: this.laporan.id_laporan + '_Final'
        });
        }

        console.log(this.Laporan)           


      } catch (error) {
        console.error(error.message);
      }

    },

    async Open_Dokumen(ID_laporan) {
      this.Dokumen_Dialog = !this.Dokumen_Dialog
      // console.log(ID_laporan)
      const response = await axios.get(this.$root.BASE_URL + '/api/laporan/openDokumen/'+ ID_laporan,{responseType:'blob'})
      this.previewUrl = URL.createObjectURL(response.data);
      // console.log(response.data)
      this.showPdf();
    },

    showPdf() {
      const pdfContainer = document.getElementById('pdfContainer');
      PDFObject.embed(this.previewUrl, pdfContainer, {
        pdfOpenParams: {
          navpanes: 0,
          toolbar: 0,
          statusbar: 1,
        },
        callback: this.customizePdfToolbar,
        width: '100%',
        height: 'calc(100vh - 100px)', // Mengurangi tinggi toolbar Vuetify
      });
    },
    removePdf() {
      const pdfContainer = document.getElementById('pdfContainer');
      pdfContainer.innerHTML = '';
    },

    async unduhItem() {
      const link = document.createElement('a');
      const response = await axios.get(this.$root.BASE_URL + '/api/getLaporanFinal/'+ this.laporan.id_laporan,{responseType:'blob'})
      this.previewUrl = URL.createObjectURL(response.data);
      link.href = this.previewUrl; // Ganti dengan URL dokumen PDF yang ingin diunduh
      link.download = this.laporan.id_laporan; // Nama file yang akan diunduh
      link.target = '_blank';
      link.click();
      this.snackbar.show = true;
      this.snackbar.color = "primary";
      this.snackbar.message = "Dokumen Laporan TA berhasil diunduh";
    },
    
    convertDateDisetujui() {
      const date = new Date(this.laporan.tgl_disetujui);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      this.laporan.tgl_disetujui = year + '-' + month + '-' + day;
     
    },
    convertDateDisidangkan() {
      const date = new Date(this.laporan.tgl_disidangkan);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      this.laporan.tgl_disidangkan = year + '-' + month + '-' + day;
    },

    convertDateDibuat(tanggal_dibuat) {
      const dateAsli = new Date(tanggal_dibuat);
      const durasi = 7 * 60 * 60 * 1000;
      let date = new Date(dateAsli.getTime() + durasi);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      const hours = date.toISOString().substring(11, 13);
      const minute = date.toISOString().substring(14, 16);
      const second = date.toISOString().substring(17, 19);
      return tanggal_dibuat = year + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
    },

    SignDocument (){
      // this.dialogShareKey = true;
      this.$router.push(`/dosen/daftar_dokumen/dokumen_detail/do_sign/${this.$route.params.role}/${this.$route.params.id}`);
    },

    closeDialog() {
      this.dialogShareKey = false;
    },

    async validateShareKey() {
      // Lakukan sesuatu dengan shareKey
      if (this.ShareKeyValid){
      console.log('Share Key:', this.shareKey);
      console.log(this.dosen.NIP)
      console.log(this.$route.params.id)
      console.log(this.$route.params.role)

      await axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/getonesharekey/',
          data: {
           NIP: this.dosen.NIP,
           id_laporan: "Laporan_" + this.$route.params.id,
           role:this.$route.params.role
          }
        })
        .then(response => {
          // console.log(response.data.data)
          this.shareKeyDB = response.data.data
        })
        .catch(error => {
          console.log(error.request.response)          
        })
      if (this.shareKey === this.shareKeyDB){
        this.dialogShareKey = false;
        this.snackbar.show = true;
        this.snackbar.color = "primary";
        this.snackbar.message = "Share Key yang diinputkan valid";
        this.shareKey = null

        this.$router.push(`/dosen/daftar_dokumen/dokumen_detail/do_sign/${this.$route.params.role}/${this.$route.params.id}`);

      }else{
        this.dialogShareKey = false;
        this.snackbar.show = true;
        this.snackbar.color = "error";
        this.snackbar.message = "Share Key yang diinputkan tidak valid";
        this.shareKey = null
      }

      }

    },

    shouldShowSignatureIcon(item, Laporan) {
      // Ambil semua tanggal dibuat yang tidak memiliki kata "Final"
      const allCreatedDates = Laporan
        .filter((laporan) => !laporan.ID_laporan.includes('Final'))
        .map((laporan) => new Date(laporan.tanggal_dibuat));

      // Cari tanggal dibuat yang paling baru
      const latestCreatedAt = new Date(Math.max.apply(null, allCreatedDates));

      // Tampilkan icon tanda tangan jika tanggal dibuat item paling baru
      return new Date(item.tanggal_dibuat).getTime() === latestCreatedAt.getTime();
    },

    shouldShowDownloadIcon(item) {
      // tampilkan icon unduh jika terdapat kata "Final" di dalam string ID_Laporan
      return item.ID_laporan.includes('Final');
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

.note {
  font-size: 12px;
  color: gray;
}
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
