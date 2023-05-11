<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Profil</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/dosen/profil">
        <span>Profil</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Datatables -->
    <v-card
    class="custom-card"
    >
      <div style="width: 97%;margin-left: auto;margin-right: auto;">
        <v-card-title>Profil Dosen</v-card-title>
        <v-card-text >
          <v-form>
            <!-- Start Form Nama NIP -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >NIP</span>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field 
                v-model="dosen.NIP"
                :rules="rules"
                placeholder="Nama NIP"
                dense
                outlined
                disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- End Form Nama NIP -->
            <!-- Start Form Nama Dosen -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Nama Dosen</span>
                  <v-text-field__details></v-text-field__details>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field 
                v-model="dosen.nama"
                :rules="rules"
                placeholder="Nama Dosen"
                dense
                outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- End Form Nama Dosen -->
            <!-- Start Form Email -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Email</span>
                  <v-text-field__details></v-text-field__details>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field 
                v-model="dosen.email"
                :rules="rules"
                placeholder="Email"
                dense
                outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- End Form Email -->
            <!-- Start Button Simpan Perubahan -->
            <v-row >
              <v-col class="text-right" >
                <v-btn color="primary" @click="save">Simpan Perubahan</v-btn>
              </v-col>
            </v-row>
            <!-- End Button Simpan Perubahan -->
            <!-- Start Form Password -->
            <v-form ref="form" v-model="validasiFormPass">
              <v-row>
                <v-col cols="4">
                  <div class="justify-center">
                    <span 
                    style="font-size:1rem;"
                    >Password</span>
                    <v-text-field__details></v-text-field__details>
                  </div>
                </v-col>
                <v-col cols="8" v-if="!passwordFieldsVisible">
                  <v-text-field 
                  v-model="dosen.nama"
                  :type="'password'"
                  placeholder="Password"
                  dense
                  outlined
                  disabled
                  ></v-text-field>
                </v-col>
                <v-col v-if="passwordFieldsVisible">
                  <v-text-field 
                  v-model="currentPassword" 
                  @click:append="showPassword = !showPassword"
                  placeholder="Current Password"
                  :rules = rules
                  dense
                  outlined
                  :type="showPassword ? 'text' : 'password'" 
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  ></v-text-field>
                </v-col>  
                <v-col v-if="passwordFieldsVisible">
                  <v-text-field 
                  v-model="newPassword" 
                  @click:append="showPassword = !showPassword"
                  placeholder="New Password"
                  :rules = rules
                  dense
                  outlined
                  :type="showPassword ? 'text' : 'password'" 
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  ></v-text-field>
                </v-col>  
                <v-col v-if="passwordFieldsVisible">
                  <v-text-field 
                  v-model="confirmNewPassword" 
                  @click:append="showPassword = !showPassword"
                  placeholder="Confirm New Password"
                  dense
                  outlined
                  :type="showPassword ? 'text' : 'password'" 
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <!-- End Form Password -->
            <!-- Start Button Change Password -->
            <v-row v-if="!passwordFieldsVisible">
              <v-col class="text-right" >
                <v-btn color="primary" @click="togglePasswordFields">Ubah password</v-btn>
              </v-col>
            </v-row>
            <!-- End Button Change Password -->
            <!-- Start Button Simpan Passwornd Baru -->
            <v-row v-if="passwordFieldsVisible">
              <v-col class="text-right" >
                <v-btn color="primary" 
                  @click="changePassword" 
                  style="margin-right: 1%;"
                  :disabled="!validasiFormPass"
                  >Update password</v-btn>
                <v-btn color="primary" @click="togglePasswordFields">Cancel</v-btn>
              </v-col>
            </v-row>
            <!-- End Button Simpan Passwornd Baru -->
          </v-form>
        </v-card-text>
    </div>
    </v-card>
    <!-- End Datatables -->
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
  data() {
    return {

      validasiFormPass: false,
      dataFromToken: '',
      dosen:'',
      // // Data Form Nama
      // NIP : "199304262019032028",
      // name : "Aprianti Nanda Sari, S.T., M.Kom.",
      // email : "aprianti.nanda@polban.ac.id",
      rules: [
        value => !!value || 'Required.',
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],

      // Data Form password
      password: 'PasswordDosen',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      showPassword: false,
      passwordFieldsVisible: false,

      // Notifikasi Berhasil
      snackbar: {
        show: false,
        message: "",
        color: "",
      },

    }
  },

  mounted (){
      const token = localStorage.getItem('token');

      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.dataFromToken= payload.user;
      }

      this.initialize()
    },

  methods: {
    async save() {
      axios({
          method:'put',
          url: 'http://localhost:3000/api/dosen/'+ this.dosen.NIP,
          data: {
            NIP: this.dosen.NIP,
            nama: this.dosen.nama,
            email: this.dosen.email
          }
        })
        .then(response => {
        
          console.log(response.data)
          window.location.reload()
          this.snackbar.show = true;
          this.snackbar.color = "primary";
          this.snackbar.message = "Data profil berhasil diperbarui!";
  
        })
        .catch(error => {
            console.log(error.request.response)
        })
    },

    async initialize() {
       try {
            const response = await axios.get(`http://localhost:3000/api/getdosendata/${this.dataFromToken.id_user}`)
            this.dosen = response.data.data[0]
          } catch (error) {
            console.error(error.message);
          }
    },

    togglePasswordFields() {
      this.passwordFieldsVisible = !this.passwordFieldsVisible;
      this.showPassword = false
    },
    changePassword() {
      axios({
          method:'post',
          url: 'http://localhost:3000/api/checkCurrentPassword/',
          data: {
           username: this.dosen.NIP,
           password: this.currentPassword
          }
        })
        .then(response => {
        
          console.log(response.data)
          
        })
        .catch(error => {
          
          
          if (this.currentPassword !== this.password) {
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.message = "Current password is incorrect!";
            console.log(error.request.response)
          return;
        }
        })

     
        if (this.newPassword !== this.confirmNewPassword) {
          // alert('New password and confirm password do not match!');
          this.snackbar.show = true;
          this.snackbar.color = "error";
          this.snackbar.message = "New password and confirm password do not match!";
          return;
        }
      
      // change password in db
      axios({
          method:'put',
          url: 'http://localhost:3000/api/user/change-password/'+ this.dosen.id_user,
          data: {
           currentPassword: this.currentPassword,
           newPassword: this.newPassword
          }
        })
        .then(response => {
        
          console.log(response.data)
          // alert('Password has been changed!');
          this.snackbar.show = true;
          this.snackbar.color = "primary";
          this.snackbar.message = "Password baru berhasil disimpan!";
          this.currentPassword = ''
          this.newPassword = ''
          this.confirmNewPassword = ''
          this.togglePasswordFields();
        })
        .catch(error => {
            console.log(error.request.response)
        })
    }
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
