<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Profil</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="false" 
      to="/">
        <v-icon >mdi-home-outline</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/profil">
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
            <!-- Start Form Nama Koordinator -->
            <v-row>
              <v-col cols="4">
                <div class="justify-center">
                  <span 
                  style="font-size:1rem;"
                  >Nama Koordinator</span>
                  <v-text-field__details></v-text-field__details>
                </div>
              </v-col>
              <v-col cols="8" >
                <v-text-field 
                v-model="name"
                :rules="rules"
                placeholder="Nama Koordinator"
                dense
                outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- End Form Nama Koordinator -->
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
              <v-col>
                <v-select
                  v-model="tahunAjaran"
                  :items="listTahunAjaran"
                  item-text="tahunAjaran"
                  item-value="tahunAjaran"
                  @change="onChangeTahunAjaran"
                  dense
                  outlined
                  :menu-props="{ offsetY: true, maxHeight: '200px' }"
                />
              </v-col>
            </v-row>
            <!-- End Form Tahun Ajaran -->
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
      name : "Djoko Cahyo Utomo Lieharyani",
      rules: [
        value => !!value || 'Required.',
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],

      tahunAjaran: '2023/2024',
      listTahunAjaran: [],

      // Data Form password
      password: 'PasswordKoordinator',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      showPassword: false,
      passwordFieldsVisible: false
    }
  },
  mounted() {
    this.generateListTahunAjaran();
  },

  methods: {
    save() {
      // your save implementation here
    },

    generateListTahunAjaran() {
      const currentYear = new Date().getFullYear();
      const list = [];
      for (let i = currentYear - 3; i < currentYear + 4; i++) {
        const tahunAjaran = `${i}/${i + 1}`;
        list.push({ tahunAjaran });
      }
      this.listTahunAjaran = list;
    },

    onChangeTahunAjaran() {
      console.log(`Anda memilih tahun ajaran ${this.tahunAjaran}`);
    },

    updateValue(value) {
      this.inputValue = value;
      this.showYearsDropdown = false;
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
