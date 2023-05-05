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
        <v-card-title>Edit Data Tahun Ajaran</v-card-title>
        <v-card-text >
          <v-form>
            <!-- Start Form Nama NIP -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Nama NIP</span>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field 
                v-model="NIP"
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
                v-model="name"
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
                v-model="email"
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
                :type="showPassword ? 'text' : 'password'" 
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
                <v-btn color="primary" @click="changePassword" style="margin-right: 1%;">Update password</v-btn>
                <v-btn color="primary" @click="togglePasswordFields">Cancel</v-btn>
              </v-col>
            </v-row>
            <!-- End Button Simpan Passwornd Baru -->
          </v-form>
        </v-card-text>
    </div>
    </v-card>
    <!-- End Datatables -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      // Data Form Nama
      NIP : "199304262019032028",
      name : "Aprianti Nanda Sari, S.T., M.Kom.",
      email : "aprianti.nanda@polban.ac.id",
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
      passwordFieldsVisible: false
    }
  },
  methods: {
    save() {
      // your save implementation here
    },

    togglePasswordFields() {
      this.passwordFieldsVisible = !this.passwordFieldsVisible;
    },
    changePassword() {
      if (this.currentPassword !== this.password) {
        alert('Current password is incorrect!');
        return;
      }
      if (this.newPassword !== this.confirmNewPassword) {
        alert('New password and confirm password do not match!');
        return;
      }
      this.password = this.newPassword;
      alert('Password has been changed!');
      this.togglePasswordFields();
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
