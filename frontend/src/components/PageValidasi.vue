<template>
  <div style="height: calc(100vh - 65px);">
    <div class="background-image" :style="backgroundImageStyle">
      <div class="background-overlay">
        <!-- Start Card Utama -->
        <v-card 
          v-if="WelcomeCard" 
          style="width: 40%;"
          color="white"
          >
            <v-card-title class="headline">Selamat Datang di D-Sign JTK Polban!!!</v-card-title>
            <v-card-text style="color: #1a5f7a;">
              D-Sign JTK Polban menyediakan fitur Validasi Dokumen Laporan Tugas Akhir 
              yang digunakan untuk memvalidasi keaslian dokumen Laporan Tugas Akhir Jurusan 
              Teknik Komputer Politeknik Negeri Bandung
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="ChangeToUpload"
                style="margin-top: auto;margin-bottom: auto;" 
              >
                Validasi Dokumen
              </v-btn>
            </v-card-actions>
        </v-card>
        <!-- End Card Utama -->

        <!-- Start Card Upload Dokumen -->
        <v-card 
          v-if="validasiDokumen" 
          class="text-center" 
          style="width: 35%;" 
          color="white">
            <v-card-title class="headline">Validasi Dokumen</v-card-title>
            <v-card-text>
              <v-tabs v-model="tab">
                <v-tab v-for="(item, index) in items" :key="index">{{ item.text }}</v-tab>

                <v-tab-item v-for="(item, index) in items" :key="index">
                  <v-card flat>
                    <v-card-text>
                      <v-form ref="form" @submit.prevent="validateFile">
                        <template v-if="item.text === 'Browse'">
                          <v-file-input
                            v-model="file"
                            label="Pilih File"
                            accept=".pdf"
                            prepend-icon="mdi-paperclip"
                            @change="clearValidationErrors"
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
              <v-btn color="primary" @click="ChangeToUpload">Kembali</v-btn>
              <v-btn color="primary" @click="validateFile">Unggah Dokumen</v-btn>
            </v-card-actions>
          </v-card>
        <!-- End Card Upload Dokumen -->

        <!-- Start Card Dokumen Valid -->
        <v-card 
        class="text-center" 
        style="width: 70%;" 
        color="white"
        v-if="DokumenValidCard"
        >
          <v-card-title class="text-h5">Verifikasi Dokumen Laporan TA JTK Polban</v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col class="text-start align-self-center" cols="3">
                <span 
                style="font-size:1rem;"
                >ID Dokumen</span>
              </v-col>
              <v-col >
                <v-text-field
                  v-model="id_dokumen"
                  :placeholder="'Id Dokumen'"
                  dense
                  outlined
                  disabled
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col class="text-start align-self-center" cols="3">
                <span 
                style="font-size:1rem;"
                >Judul Laporan</span>
              </v-col>
              <v-col >
                <v-textarea
                  dense
                  outlined
                  disabled
                  rows="1"
                  hide-details
                  auto-grow
                  :value="Judul_Laporan"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text class="text-start" style="color: #68B984;font-size:1rem;">
            Tanda Tangan Elektronik Valid<br>
            Dokumen tidak pernah mengalami perubahan
          </v-card-text>
          <v-card-text >
            <v-row >
              <v-col cols="4" v-for="(item, index) in list_Pengampu" :key="index" >
                <div class="text-start align-self-center">
                  <span style="font-size:1rem;">{{index+1}}.</span>
                </div>
                <v-row dense>
                  <v-col class="text-start align-self-center" cols="3">
                    <span 
                    style="font-size:1rem;"
                    >Dosen</span>
                  </v-col>
                  <v-col >
                    <v-textarea
                      dense
                      outlined
                      disabled
                      rows="1"
                      hide-details
                      auto-grow
                      :placeholder="`Dosen ${index + 1}`"
                      :value="item.dosen"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col class="text-start align-self-center" cols="3">
                    <span 
                    style="font-size:1rem;"
                    >Peran</span>
                  </v-col>
                  <v-col >
                    <v-text-field
                      v-model="item.peran"
                      :placeholder="`Peran ${index + 1}`"
                      dense
                      outlined
                      disabled
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col class="text-start align-self-center" cols="3">
                    <span 
                    style="font-size:1rem;"
                    >Tanggal TTD</span>
                  </v-col>
                  <v-col >
                    <v-text-field
                      v-model="item.tgl_ttd"
                      :placeholder="`Timestamp ${index + 1}`"
                      dense
                      outlined
                      disabled
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="BackToWelcome">Kembali</v-btn>
          </v-card-actions>
        </v-card>
        <!-- End Card Dokumen Valid -->

        <!-- Start Card  Tidak Valid -->
        <v-card class="mx-auto mt-5" style="width: 35%;" v-if="DokumenInValidCard">
          <v-card-title class="text-h5">Verifikasi Dokumen Laporan TA JTK Polban</v-card-title>
          <v-card-text class="text-start" style="font-size:1rem; color: rgba(172, 12, 12, 0.83);">
            Dokumen Tidak Valid<br>
            Dokumen yang anda unggah tidak terdaftar atau telah mengalami perubahan.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="BackToWelcome">Kembali</v-btn>
          </v-card-actions>
        </v-card>
        <!-- End Card Dokumen Tidak Valid -->

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      backgroundImage: require("../assets/Logo_DSign_text.svg"),
      WelcomeCard:true,
      validasiDokumen: false,
      DokumenValidCard:false,
      DokumenInValidCard:false,

      //Data Input File
      file: null,
      dragging: false,
      validationError: null,
      tab: 0,
      items: [
        { text: "Browse" },
        { text: "Drop" },
      ],

      // Data Dokumen Valid
      id_dokumen : 'id_laporan',
      Judul_Laporan : 'Judul',
      list_Pengampu: [
        {
          dosen: "Aprianti Nanda Sari, S.T., M.Kom.",
          peran: "Pembimbing 1",
          tgl_ttd: "9-April-2023 11:20",
        },
        {
          dosen: "Urip Teguh Setijohatmo, BSCS., M.Kom.",
          peran: "Penguji 1",
          tgl_ttd: "10-April-2023 07:41",
        },
        {
          dosen: "Yadhi Adhitia P., S.T.",
          peran: "Ketua Jurusan",
          tgl_ttd: "11-April-2023 09:21",
        },
      ],
      

    }
  },
  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      }
    },
    dropMessage() {
      if (this.dragging) {
        return "Lepaskan file di sini";
      }
      return "Seret dan lepaskan file di sini";
    },
  },
  methods: {
    BackToWelcome(){
      this.WelcomeCard = !this.WelcomeCard
      this.DokumenValidCard = false
      this.DokumenInValidCard = false
      this.file = null
    },
    ChangeToUpload(){
      this.WelcomeCard = !this.WelcomeCard
      this.validasiDokumen = !this.validasiDokumen
    },
    clearValidationErrors() {
      this.validationError = null;
    },

    async geRelasi(id_KoTA) {
      const responseRelasi = await axios.get('http://localhost:3000/api/relasi/KoTA/' + id_KoTA)
      const Pengampu = responseRelasi.data.data

      this.list_Pengampu = Pengampu.map((item) =>({
        dosen: item.nama,
        peran: item.urutan !== null ? item.role + " " + item.urutan : item.role,
        // peran: item.role +" "+ item.urutan,
        tgl_ttd: item.tgl_ttd
      }))

      console.log(Pengampu)
    },

    async validateFile() {
      if (!this.file) {
        this.validationError = "Mohon pilih file yang akan divalidasi.";
        return;
      }

      const formData = new FormData();
      formData.append('cover', this.file);

      await axios.post('http://localhost:3000/api/dokumen/validate/', formData, {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response.data);
          if (response.data.valid){
            this.validasiDokumen = !this.validasiDokumen
            this.DokumenValidCard = !this.DokumenValidCard
            this.Judul_Laporan = response.data.judul
            this.id_dokumen = "Laporan_"+response.data.id_KoTA
            this.geRelasi(response.data.id_KoTA)

          } 
          else {
            this.validasiDokumen = !this.validasiDokumen
            this.DokumenInValidCard = !this.DokumenInValidCard
          }
          // this.file = null
          // this.snackbar.show = true;
          // this.snackbar.color = "primary";
          // this.snackbar.message = "Dokumen Laporan TA berhasil ditambahkan";
        })
        .catch(error => {
          console.log(error.message);
          // this.file = null
          // this.snackbar.show = true;
          // this.snackbar.color = "error";
          // this.snackbar.message = "Dokumen Laporan TA gagal ditambahkan";
        });


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
    
  }
};
</script>

<style scoped>

.theme--light.v-sheet{
  color: #1a5f7a;
}

.theme--light.v-card .v-card__text{
  color: #1a5f7a;
}

.background-image {
  height: 100%;
  width: 100%;
  background-position: center;
  /* background-repeat: no-repeat; */
}

.background-overlay {
  height: 100%;
  width: 100%;
  background-color: rgba(145, 187, 203, 0.54);
  /* background-color: #91BBCB; */
  display: flex;
  justify-content: center;
  align-items: center;
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