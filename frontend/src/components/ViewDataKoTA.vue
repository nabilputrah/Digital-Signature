<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Data KoTA</h4>
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
      to="/koordinator/KoTA">
        <span>Data KoTA</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <v-card class="custom-card">
      <v-data-table
        :headers="headers"
        :search="search"
        :items="KoTA"
        item-key="dokumen"
        sort-by="id_KoTA"
        show-expand
        class="elevation-1"
        :expanded.sync="expandedItems"
        style="padding-top: 0.5%;"
      >
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div class="detail-container" style="color: #1a5f7a;">
                <v-row>
                  <v-col>
                    <span><strong>ID KoTA :</strong> {{ item.id_KoTA }}</span>
                    <br>
                    <span><strong>Tahun Ajaran :</strong> {{ item.tahun_ajaran }}</span>
                  </v-col>
                  <v-col>
                    <ul>
                      <li v-for="(item, index) in item.anggota" :key="index" style="list-style-type:none;">
                        <strong>Anggota {{ index + 1 }} :</strong> {{ item.nama }}
                      </li>
                    </ul>
                  </v-col>
                  <v-col>
                    <ul>
                      <li v-for="(item, index) in item.pembimbing" :key="index" style="list-style-type:none;">
                        <strong>Pembimbing {{ index + 1 }} :</strong> {{ item.nama }}
                      </li>
                    </ul>
                  </v-col>
                  <v-col>
                    <ul>
                      <li v-for="(item, index) in item.penguji" :key="index" style="list-style-type:none;">
                        <strong>Penguji {{ index + 1 }} :</strong> {{ item.nama }}
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </div>
            </td>
        </template>
        <template v-slot:top>
          <v-toolbar
            dense
            flat
          >
            <v-toolbar-title>Data KoTA</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="sendAllEmail"
              style="margin-top: auto;margin-bottom: auto; margin-right: 1%;" 
            >
              Email All
            </v-btn>
            <v-btn
              color="primary"
              @click="redirectToAddKoTA()"
              style="margin-top: auto;margin-bottom: auto;" 
            >
              + Add KoTA
            </v-btn>
            <!-- Start Card Pop up Email Data KoTA -->
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
            <!-- End Card Pop up Email Data KoTA -->
            <!-- Start Card Pop up Email All Data KoTA -->
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
            <!-- End Card Pop up Email All Data KoTA -->
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
            @click="redirectToEdit(item.dokumen)"
          >
            mdi-pencil-outline
          </v-icon>
          <v-icon
            @click="sendEmail(item.dokumen)"
          >
            mdi-email-outline
          </v-icon>
        </template>
        <!-- End Kolom Action -->
        <!-- Start Kolom Dokumen -->
        <template v-slot:[`item.dokumen`]="{ item }">
          <v-icon
            class="mr-2"
            @click="redirectToDetail(item.dokumen)"
          >
            mdi-file-document-arrow-right
          </v-icon>
        </template>
        <!-- End Kolom Dokumen -->
      </v-data-table>
    </v-card>
    <!-- End Datatables -->

    <!-- Start animasi loading section -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    <!-- End animasi loading section -->

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
    data: () => ({
      isLoading: false,
      loggedIn:'',
      navbar:'',
      search : '',
      dialogEmail: false,
      dialogAllEmail : false,
      headers: [
        {
          text: 'ID KoTA',
          align: 'start',
          value: 'id_KoTA',
        },
        { text: 'Tahun Ajaran', value: 'tahun_ajaran' },
        { text: 'Dokumen Laporan', value: 'dokumen', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      KoTA: [],
      editedIndex: -1,
      sendEmailTo: '',
      defaultItem: {
        NIP: '',
        nama: '',
        email: '',
      },

      // Notifikasi Berhasil
      snackbar: {
        show: false,
        message: "",
        color: "",
      },
      mahasiswaKoTA:[],
      pembimbingKoTA:[],
      pengujiKoTA:[],

      //Data Detail Table
      headersData2: [
        { text: 'ID', value: 'id' },
        { text: 'Nama', value: 'name' },
        { text: 'Alamat', value: 'address' },
      ],      
      items: [
        {
          id: 1,
          name: 'Item 1',
          address: 'Alamat 1',
          details: [
            { detailId: 1, detailName: 'Detail 1' },
            { detailId: 2, detailName: 'Detail 2' },
          ],
        },
        {
          id: 2,
          name: 'Item 2',
          address: 'Alamat 2',
          details: [
            { detailId: 1, detailName: 'Detail 1' },
            { detailId: 2, detailName: 'Detail 2' },
            { detailId: 3, detailName: 'Detail 3' },
          ],
        },
      ],
      expandedItems: [],

    }),

    mounted () {

    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.navbar= payload.user;
    }
      this.initialize()
      // this.initialize()
    },

    methods: {
      async initialize (){
        const token = localStorage.getItem('token'); 
        const headers = { Authorization: `Bearer ${token}` };
        
        try {
          const response = await axios.get(`http://localhost:3000/api/getkoordata/${this.navbar.id_user}`, { headers });
          this.loggedIn = response.data.data[0]
          //Get All Mahasiswa
          // const responseList = await axios.get(`http://localhost:3000/api/mahasiswa/`);
          // const listMahasiswa = responseList.data.data
          const responseListKoTA = await axios.get('http://localhost:3000/api/KoTA/Prodi/'+this.loggedIn.id_prodi)
          const list = responseListKoTA.data.data
          const regex = /^(\d{4})(\d{3})(\d{4})$/;
          const mappedKoTA = list.map((item) => ({
            id_KoTA : item.id_KoTA ? item.id_KoTA.replace(regex, "$2") : null,
            dokumen : item.id_KoTA,
            tahun_ajaran: item.tahun_ajaran
          }));
          this.KoTA = mappedKoTA
          console.log(this.KoTA[0].id_KoTA)

        } catch (error) {
          console.error(error.message);
        }

        this.KoTA.forEach(async (item, index) => {
          try {
            //Get Anggota
            const response = await axios.get('http://localhost:3000/api/mahasiswakota/' + item.dokumen);
            this.mahasiswaKoTA[index] = response.data.data;
            console.log(this.mahasiswaKoTA[index])
            //Get Pembimbing
            const responsePembimbing = await axios.get('http://localhost:3000/api/relasibykota/pembimbing/'+ item.dokumen)
            this.pembimbingKoTA[index] = responsePembimbing.data.data

            const responsePenguji = await axios.get('http://localhost:3000/api/relasibykota/penguji/'+ item.dokumen)
            this.pengujiKoTA[index] = responsePenguji.data.data

            const selectedItem = this.mahasiswaKoTA[index].map((item) => ({
              nama: item.nama,
            }));
            const selectedItemPembimbing = this.pembimbingKoTA[index].map((item) => ({
              nama: item.nama,
            }));
            const selectedItemPenguji = this.pengujiKoTA[index].map((item) => ({
              nama: item.nama,
            }));

            item.anggota = selectedItem;
            item.pembimbing = selectedItemPembimbing;
            item.penguji = selectedItemPenguji;
          } catch (error) {
            console.error(error.message);
          }
        });        
      },

      async redirectToAddKoTA () {
        const response = await axios.get(`http://localhost:3000/api/checkkajurkaprodi`);
        const CanADD = response.data
        if ((CanADD.kajur == 1) && (CanADD.kaprodi == 2)){
          this.$router.push(`/koordinator/KoTA/tambah_KoTA`);
        }
        else {
          this.snackbar.show = true;
          this.snackbar.color = "error";
          this.snackbar.message = "Mohon Tambahkan data Kaprodi dan Kajur terlebih dahulu di halaman data Dosen";
        }
      },

      redirectToDetail(id_KoTA) {
        this.$router.push(`/koordinator/KoTA/dokumen_detail/${id_KoTA}`);
      },

      redirectToEdit(id_KoTA) {
        this.$router.push(`/koordinator/KoTA/detail_KoTA/${id_KoTA}`);
      },

      sendEmail (id_KoTA) {
        this.sendEmailTo = id_KoTA
        this.dialogEmail = true
      },

      sendAllEmail () {
        this.dialogAllEmail = true
      },
      
      sendEmailConfirm () {
        console.log(this.sendEmailTo)
        this.isLoading = true
        console.log(this.isLoading)
        axios({
          method:'post',
          url: 'http://localhost:3000/api/mahasiswa/sendemail/'+ this.sendEmailTo,
        })
        .then(response => {
          console.log(response.data)
          this.snackbar.show = true;
          this.snackbar.color = "primary";
          this.snackbar.message = "Email berhasil dikirimkan!";  
        })
        .catch(error => {
            console.log(error.request.response)
        })
        this.isLoading = false
        this.closeEmail()
      },

      sendAllEmailConfirm () {
        this.isLoading = true
        console.log(this.isLoading)
        this.KoTA.forEach(async (item) => {
          // console.log(item.dokumen)
          axios({
            method:'post',
            url: 'http://localhost:3000/api/mahasiswa/sendemail/'+ item.dokumen,
          })
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
              console.log(error.request.response)
          })
        });
        this.snackbar.show = true;
        this.snackbar.color = "primary";
        this.snackbar.message = "Email berhasil dikirimkan!";  
        this.isLoading = false
        this.closeAllEmail()
      },

      closeEmail () {
        this.dialogEmail = false
      },

      closeAllEmail () {
        this.dialogAllEmail = false
      },

    },
  }
</script>



<style scoped>

/* Animasi Loading */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #ffffff;
  border-top-color: #1A5F7A;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.detail-container {
  margin: 1% 1%;
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

.theme--light.v-icon{
  color:#1A5F7A;
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
