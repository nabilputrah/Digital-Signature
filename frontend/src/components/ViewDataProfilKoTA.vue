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
                v-model="ID_KoTA"
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
                v-model="tahun_ajaran"
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
                    v-model="item.anggota"
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
export default {
  data() {
    return {
      // Data Form Nama
      ID_KoTA : 402,
      tahun_ajaran : "2022/2023",
      listAnggota: [
        { anggota: 'Andika Yudha'},
        { anggota: 'Nabil Putra H'},
      ],
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
  methods: {
    save() {
      // your save implementation here
    },

    togglePasswordFields() {
      this.passwordFieldsVisible = !this.passwordFieldsVisible;
      this.showPassword = false
    },
    changePassword() {
      if (this.currentPassword !== this.password) {
        this.snackbar.show = true;
        this.snackbar.color = "error";
        this.snackbar.message = "Current password is incorrect!";
        // alert('Current password is incorrect!');
        return;
      }
      if (this.newPassword !== this.confirmNewPassword) {
        this.snackbar.show = true;
        this.snackbar.color = "error";
        this.snackbar.message = "New password and confirm password do not match!";
        // alert('New password and confirm password do not match!');
        return;
      }
      this.password = this.newPassword;
      this.snackbar.show = true;
      this.snackbar.color = "primary";
      this.snackbar.message = "Password baru berhasil disimpan!";
      // alert('Password has been changed!');
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
