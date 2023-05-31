<template>
  <div class="fill-height">
    <!-- <v-container class="fill-height" fluid style="background-color: yellow;"> -->
    <v-row class="fill-height" >
      <v-col cols="12" md="8" class="d-flex justify-center align-center" style="background-color: #91bbcb8a;">
        <v-img src="../assets/Logo_DSign_text.png" max-width="400"></v-img>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-center align-center">
        <v-card v-if="!showForgotPassword">
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
              <v-checkbox
                label="Ingatkan Saya"
                v-model="rememberMe"
                color="primary"
              ></v-checkbox>
              <v-btn color="primary" block @click="login">Login</v-btn>
              <div dense class="button-container">
                <router-link to="/" class="back-to-portal-link">
                  <v-icon dense>mdi-arrow-left-thin</v-icon>
                  Back to Portal
                </router-link>
                <a href="#" class="forgot-password-link" @click="showForgotPassword = true">Lupa password?</a>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card v-if="showForgotPassword" class="custom-card">
          <v-card-title class="text-center">
            Lupa Password
          </v-card-title>
          <v-card-text>
            <v-form v-model="inputValid">
              <v-select 
                v-model="role" 
                label="Role"
                :rules="rules.role" 
                :items="roleOptions" 
                id="role">
              </v-select>

              <v-text-field label="Username" :rules="rules.username" v-model="forgotUsername"></v-text-field>
              <p dense v-if="role === 'KoTA'">Masukkan email Ketua KoTA yang terdaftar di aplikasi</p>
              <p dense v-else-if="role === 'Dosen'">Masukkan email Anda yang terdaftar di aplikasi</p>
              <v-text-field label="Email" :rules="rules.email" v-model="forgotEmail"></v-text-field>

              <v-btn color="primary" :disabled="!inputValid" block @click="resetPassword">Submit</v-btn>
              <div dense class="text-right">
                <a href="#" class="forgot-password-link" @click="showForgotPassword = false">Kembali</a>
              </div>
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

  <!-- Start Snackbar section -->
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
  <!-- End Snackbar section -->

  <!-- Start animasi loading section -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
  <!-- End animasi loading section -->
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      showPassword: false,
      rememberMe: false,
      dialog: false,
      username: '',
      password:'',

      showForgotPassword: false,
      forgotUsername: '',
      forgotEmail: '',
      role: 'KoTA',
      roleOptions: ['KoTA', 'Dosen'],
      rules: {
        role: [
          v => !!v || "Role wajib diisi",
        ],
        username: [
          v => !!v || "Username wajib diisi",
        ],
        email: [
          v => !!v || "Email wajib diisi",
          v =>
            /.+@.+\..+/.test(v) ||
            "Format email tidak valid"
        ]
      },
      inputValid:false,

      // Notifikasi Berhasil
      snackbar: {
          show: false,
          message: "",
          color: "",
      },

      isLoading: false
    };
  },
  mounted() {
    const credentials = this.getCredentialsFromCookie()
    if (credentials) {
      this.username = credentials.username
      this.password = atob(credentials.password)
      this.rememberMe = true
    }
    document.addEventListener('keydown', this.handleEnterKey);
  },
  destroyed() {
    document.removeEventListener('keydown', this.handleEnterKey);
  },
  methods: {
    async resetPassword() {
      this.isLoading = true
      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/forgotPassword',
        data: {
          username: this.forgotUsername,
          email: this.forgotEmail,
          role: this.role
        },
      })
        .then((response) => {
          console.log(response);
          this.isLoading = false
          this.snackbar.show = true;
          this.snackbar.color = "primary";
          this.snackbar.message = "Reset password berhasil, periksa email anda";
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          this.isLoading = false
          if (error.response.data.message === 'data user tidak ditemukan'){
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.message = "Data user tidak ditemukan";
          } else if (error.response.data.message === 'username dan email dosen tidak sinkron'){
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.message = "Username atau email Dosen tidak terdaftar"; 
          } else if (error.response.data.message === 'email dan username KoTA yang diinputkan tidak sinkron'){
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.message = "Username atau email KoTA tidak terdaftar"; 
          }
        });
    },

    handleEnterKey(event) {
      if (this.showForgotPassword && this.inputValid){
        if (event.key === 'Enter') {
          this.resetPassword();
        }
      } else if (!this.showForgotPassword){
        if (event.key === 'Enter') {
          this.login();
        }
      }
    },

    async login() {

      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/login',
        data: {
          username: this.username,
          password: this.password,
        },
      })
        .then((response) => {
          if (this.rememberMe) {
          this.saveCredentialsToCookie()
        } else {
          this.deleteCredentialsFromCookie()
        }
          localStorage.setItem('token', response.data.token);
          const token = localStorage.getItem('token')

          if(token) {
              const decodedToken = JSON.parse(atob(token.split('.')[1]))
              const userRole = decodedToken.user.role
              
              if (userRole === 'Koordinator') {      
                  this.$router.push('/koordinator/KoTA')
              }
              else if (userRole === 'Dosen') {
                  this.$router.push('/dosen/daftar_dokumen')
              }
              else if (userRole === 'KoTA') {
                  this.$router.push('/KoTA/dokumen_detail')
              }
          }
   
     
        })
        .catch((error) => {
          this.dialog = true;
          console.log(error.response);
          console.log('gagal login');
        });
    },
    saveCredentialsToCookie() {
      const encodedPassword = btoa(this.password)
      const credentials = {
        username: this.username,
        password: encodedPassword
      }
      document.cookie = `credentials=${JSON.stringify(credentials)};path=/`
    },
    getCredentialsFromCookie() {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        if (cookie.startsWith('credentials=')) {
          const credentialsJson = cookie.substring('credentials='.length)
          return JSON.parse(credentialsJson)
        }
      }
      return null
    },
    deleteCredentialsFromCookie() {
      document.cookie = 'credentials=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/'
    }
  },
};
</script>

<style scoped>

.button-container {
  display: flex;
  justify-content: space-between;
}

.back-to-portal-link {
  text-decoration: none;
}

.forgot-password-link {
  text-decoration: none;
}

.theme--light.v-sheet{
  color: #1a5f7a;
}
.custom-card {
  width: 92%;
  margin-left: auto;
  margin-right: auto;
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

</style>
