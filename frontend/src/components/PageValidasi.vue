<template>
  <div style="height: calc(100vh - 65px);">
    <div class="background-image" :style="backgroundImageStyle">
      <div class="background-overlay">
        <!-- Start Card Utama -->
        <v-card 
          v-if="WelcomeCard" 
          style="width: 35%;"
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
                          <v-alert
                            :value="dragging"
                            class="mt-4"
                            type="info"
                          >
                            Seret dan lepaskan file di sini
                          </v-alert>
                          <div
                            class="mt-2"
                            @dragover.prevent
                            @dragenter.prevent="dragging = true"
                            @dragleave.prevent="dragging = false"
                            @drop.prevent="onDrop"
                          >
                            <v-icon class="mr-2">mdi-folder-outline</v-icon>
                            <span class="caption grey--text">{{ dropMessage }}</span>
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
        style="width: 50%;" 
        color="white"
        v-if="DokumenValidCard"
        >
          <v-card-title class="text-h5">Dokumen Valid</v-card-title>
          <v-card-text>
            Dokumen yang Anda unggah memiliki nama file "Laporan TA.pdf" dan telah divalidasi.
          </v-card-text>
          <v-card-text>
            <v-row v-for="(item, index) in list_Pengampu" :key="index" style="background-color: green;">
              <v-row cols="12">
                <v-col class="text-start align-self-center" cols="3">
                  <span 
                  style="font-size:1rem;"
                  >Dosen</span>
                </v-col>
                <v-col >
                  <v-text-field
                    v-model="item.dosen"
                    :placeholder="`Dosen ${index + 1}`"
                    dense
                    outlined
                    disabled
                    hide-details
                  ></v-text-field>
                </v-col>
                <!-- <v-col>
                  <v-text-field 
                  placeholder="Dosen 1"
                  dense
                  outlined
                  disabled
                  hide-details
                  ></v-text-field>
                </v-col> -->
              </v-row>
            </v-row>
            
            <v-row v-for="(item, index) in list_Pengampu" :key="index" style="background-color: yellow;">
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :label="`Dosen ${index + 1}`"
                  v-model="item.dosen"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :label="`Peran ${index + 1}`"
                  v-model="item.peran"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :label="`Timestamp ${index + 1}`"
                  v-model="item.timestamp"
                  required
                ></v-text-field>
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
        <v-card class="mx-auto mt-5" max-width="500" v-if="DokumenInValidCard">
          <v-card-title class="text-h5">Dokumen Tidak Valid</v-card-title>
          <v-card-text>
            Dokumen yang Anda tidak valid.
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
export default {
  data() {
    return {
      backgroundImage: require("../assets/Logo_DSign_text.svg"),
      WelcomeCard:false,
      validasiDokumen: false,
      DokumenValidCard:true,
      DokumenInValidCard:false,

      tab: 0,
      items: [
        { text: "Browse" },
        { text: "Drop" },
      ],

      list_Pengampu: [
        {
          dosen: "",
          peran: "Pembimbing",
          timestamp: "2023",
        },
      ],
      
      file: null,
      dragging: false,
      validationError: null,
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
    validateFile() {
      if (!this.file) {
        this.validationError = "Mohon pilih file yang akan divalidasi.";
        return;
      }
      if (this.file && this.file.name === 'LaporanTA.pdf'){
        this.validasiDokumen = !this.validasiDokumen
        this.DokumenValidCard = !this.DokumenValidCard
      } 
      else {
        this.validasiDokumen = !this.validasiDokumen
        this.DokumenInValidCard = !this.DokumenInValidCard
      }
      // Lakukan validasi dokumen dengan file yang dipilih
      // Misalnya: this.$axios.post('/validate', { file: this.file })
      // Jika validasi sukses, lakukan aksi yang diperlukan
    },
    onDrop(event) {
      event.preventDefault();
      this.dragging = false;
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.file = files[0];
      } else {
        this.file = null;
      }
    },
  }
};
</script>

<style>

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

/* .card-container {
  display: flex;
  justify-content: center;
} */
</style>