<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Profil</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="false" 
      to="/koordinator/dashboard">
        <v-icon >mdi-home-outline</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/koordinator/profil">
        <span>Profil</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Datatables -->
    <v-card
    class="custom-card"
    >
      <div style="width: 97%;margin-left: auto;margin-right: auto;">
        <v-card-title>Profil Koordinator</v-card-title>
        <v-card-text >
          <v-form ref="form">
            <v-form ref="form" v-model="validasiProfil">
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
                  <v-select
                  v-model="formKoordinator.selectedItem"
                  :items="filteredKoordinator()"
                  outlined
                  dense
                  :menu-props="{ offsetY: true}"
                  :placeholder="'Pilih Nama Dosen'"
                >
                  <template v-slot:prepend-item>
                    <v-text-field
                    style="width: 97%;margin-left: auto;margin-right: auto;"
                      v-model="formKoordinator.search"
                      :label="'Cari Dosen'"
                      hide-details
                      @input="onSearchKoor()"
                    />
                  </template>
                </v-select>
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
                    v-model="koordinator.tahun_ajaran"
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
                  <v-btn color="primary" :disabled="!validasiProfil" @click="save">Simpan Perubahan</v-btn>
                </v-col>
              </v-row>
            </v-form>
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
                <v-btn 
                  color="primary" 
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
      validasiProfil:false,
      dataFromToken: '',
      koordinator:'',

      formKoordinator: {
        selectedItem: '',
        items: ['Dosen 1', 'Dosen 2'],
        search: '',
      },

      // Data Form Nama
      // name : "Djoko Cahyo Utomo Lieharyani",
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
      passwordFieldsVisible: false,

      // Notifikasi Berhasil
      snackbar: {
        show: false,
        message: "",
        color: "",
      },

    }
  },
  mounted() {
    const token = localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.dataFromToken= payload.user;
    }
    this.initialize()
    this.initializeKoordinatorList()
    this.generateListTahunAjaran();
  },

  computed: {
    filteredKoordinator() {
      return () => {
        const items = this.formKoordinator.items;
        const search = this.formKoordinator.search;
        if (search.length === 0) {
          return items;
        } else {
          return items.filter((item) =>
            item.text.toLowerCase().includes(search.toLowerCase())
          );
        }
      };
    },
  },
  
  methods: {
    async initializeKoordinatorList() {
      try {
        const token = localStorage.getItem('token'); 
        const headers = { Authorization: `Bearer ${token}` };
        const responseKoor = await axios.get(this.$root.BASE_URL + `/api/getkoordata/${this.dataFromToken.id_user}`, { headers });
        const KoorData = responseKoor.data.data[0]

        this.formKoordinator.selectedItem = KoorData.nama_koordinator
      
      } catch (error) {
        console.log(error.message.request)
      }
    
    },

    async save() {
      axios({
          method:'put',
          url: this.$root.BASE_URL + '/api/koordinator/'+ this.koordinator.id_koor,
          data: {
            id_koor: this.koordinator.id_koor,
            id_user: this.koordinator.id_user,
            id_prodi: this.koordinator.id_prodi,
            nama_koordinator: this.formKoordinator.selectedItem,
            tahun_ajaran: this.koordinator.tahun_ajaran,
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
          const token = localStorage.getItem('token'); 
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(this.$root.BASE_URL + `/api/getkoordata/${this.dataFromToken.id_user}`, { headers });
          const responseDosen = await axios.get(this.$root.BASE_URL + `/api/dosen`);
          this.dosen = responseDosen.data.data
          this.koordinator = response.data.data[0]
          console.log(this.koordinator.nama_koordinator)

          this.formKoordinator.items = this.dosen.map((dsn) => ({ value: dsn.nama, text: `${dsn.nama}` }));

          console.log(this.formKoordinator.items)
          console.log(this.koordinator)
        } catch (error) {
          console.error(error.message);
        }
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

    onSearchKoor() {
        if (this.formKoordinator.search.length > 0) {
          this.formKoordinator.selectedItem = null;
        }
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
      this.showPassword = false
    },
    changePassword() {
      axios({
          method:'post',
          url: this.$root.BASE_URL + '/api/checkCurrentPassword/',
          data: {
           username: this.koordinator.id_koor,
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
          url: this.$root.BASE_URL + '/api/user/change-password/'+ this.koordinator.id_user,
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
