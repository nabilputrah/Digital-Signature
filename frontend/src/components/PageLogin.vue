<template>
  <div class="fill-height">
    <!-- <v-container class="fill-height" fluid style="background-color: yellow;"> -->
    <v-row class="fill-height" >
      <v-col cols="12" md="8" class="d-flex justify-center align-center" style="background-color: #91bbcb8a;">
        <v-img src="../assets/Logo_DSign_text.png" max-width="400"></v-img>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-center align-center">
        <v-card>
          <v-card-title class="text-center">
            Selamat Datang di D-Sign JTK POLBAN!
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Username" v-model="username"></v-text-field>
              <v-text-field
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-model="password"
              ></v-text-field>
              <!-- <v-checkbox
                label="Ingatkan Saya"
                v-model="rememberMe"
                color="primary"
              ></v-checkbox> -->
              <v-btn color="primary" block @click="login">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Login Gagal</v-card-title>
        <v-card-text>
          <div>Username atau password salah.</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- </v-container> -->
  </div>

</template>

<script>

import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      showPassword: false,
      rememberMe: false,
      dialog: false,
      username: '',
      password:''
    };
  },
  // created() {
  //   const rememberMe = localStorage.getItem('rememberMe');
  //   if (rememberMe) {
  //     this.rememberMe = true;
  //     this.username = localStorage.getItem('username');
  //     const encryptedPassword = localStorage.getItem('password');
  //     if (encryptedPassword) {
  //       const password = CryptoJS.AES.decrypt(encryptedPassword, 'my-secret-key').toString(CryptoJS.enc.Utf8);
  //       this.password = password;
  //     }
  //   }
  // },
  methods: {
    login() {
      // cek username dan password
      if (this.username === 'KoTA402' && this.password === 'password') {
        // login sukses, pindah ke halaman about
        // if (this.rememberMe) {
        //   localStorage.setItem('rememberMe', 'true');
        //   localStorage.setItem('username', this.username);
        //   const encryptedPassword = CryptoJS.AES.encrypt(this.password, 'my-secretkey').toString();
        //   localStorage.setItem('password', encryptedPassword);
        // }
        // // if (this.rememberMe) {
        // //   localStorage.setItem('rememberMe', true);
        // //   localStorage.setItem('username', this.username);
        // //   localStorage.setItem('password', this.password);
        // // } 
        // else {
        //   localStorage.removeItem('rememberMe');
        //   localStorage.removeItem('username');
        //   localStorage.removeItem('password');
        // }
        this.$router.push('/about');
      } else {
        // login gagal, tampilkan dialog
        this.dialog = true;
      }
    },
  },
};
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
