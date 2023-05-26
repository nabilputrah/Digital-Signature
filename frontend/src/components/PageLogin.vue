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
            <form >
              <v-select 
                v-model="role" 
                label="Role" 
                :items="roleOptions" 
                id="role">
              </v-select>

              <v-text-field label="Username" v-model="forgotUsername"></v-text-field>
              <p dense v-if="role === 'KoTA'">Masukkan email Ketua KoTA yang terdaftar di aplikasi</p>
              <p dense v-else-if="role === 'Dosen'">Masukkan email Anda yang terdaftar di aplikasi</p>
              <v-text-field label="Email" v-model="forgotEmail"></v-text-field>

              <v-btn color="primary" block @click="resetPassword">Submit</v-btn>
              <div dense class="text-right">
                <a href="#" class="forgot-password-link" @click="showForgotPassword = false">Kembali</a>
              </div>
            </form>
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
      role: '',
      roleOptions: ['KoTA', 'Dosen']
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
    resetPassword() {
      // Logika untuk mereset password
      // Anda dapat mengakses nilai forgotUsername, forgotEmail, dan role dengan this.forgotUsername, this.forgotEmail, dan this.role
    },

    handleEnterKey(event) {
      if (event.key === 'Enter') {
        this.login();
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

</style>
