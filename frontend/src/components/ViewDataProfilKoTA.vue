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
        <v-card-title>Profil KoTA</v-card-title>
        <v-card-text >
          <v-form>
            <!-- Start Form ID KoTA -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >ID KoTA</span>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field 
                v-model="kota.nama_KoTA"
                :rules="rules"
                placeholder="Id KoTA"
                dense
                outlined
                disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- End Form ID KoTA -->
            <!-- Start Form Tahun Ajaran -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Tahun Ajaran</span>
                  <v-text-field__details></v-text-field__details>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field 
                v-model="kota.tahun_ajaran"
                :rules="rules"
                placeholder="Tahun Ajaran"
                dense
                outlined
                disabled
                ></v-text-field>
              </v-col>
            </v-row>
  
            <!-- End Form Tahun Ajaran -->
            <!-- Start Form Anggota -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Anggota</span>
                  <v-text-field__details></v-text-field__details>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-row v-for="(item, index) in listAnggota" :key="index">
                  <v-col>
                    <v-text-field 
                    v-model="item.nama"
                    :rules="rules"
                    placeholder="Anggota"
                    dense
                    outlined
                    disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <!-- End Form Anggota -->
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
                  v-model="password"
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
      kota: '',
      // Data Form Nama
      
      listAnggota: [],
      rules: [
        value => !!value || 'Required.',
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],

      // Data Form password
      password: 'PasswordKoTA',
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

  mounted(){
     const token = localStorage.getItem('token');

      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.dataFromToken= payload.user;
      }

      this.initialize()
      // this.initializeListAnggota()
  },
  methods: {

    async initialize() {
      try {
          const response = await axios.get(this.$root.BASE_URL + `/api/getkotadata/${this.dataFromToken.id_user}`)
          this.kota = response.data.data[0]
          const id_kota = response.data.data[0].id_KoTA

          const responseList = await axios.get(this.$root.BASE_URL + '/api/mahasiswakota/' +id_kota)
          this.listAnggota = responseList.data.data

         

        } catch (error) {
          console.error(error.message);
        }
    },
    // async initializeListAnggota() {
    //   try {
          
    //       console.log(response.data.data)

    //     } catch (error) {
    //       console.error(error.message);
    //     }
    // },
    save() {
      // your save implementation here
    },

    togglePasswordFields() {
      this.passwordFieldsVisible = !this.passwordFieldsVisible;
      this.showPassword = false
    },
    changePassword() {
      axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/checkCurrentPassword/',
          data: {
           username: this.kota.id_KoTA,
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
          url: this.$root.BASE_URL + '/api/user/change-password/'+ this.kota.id_user,
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
