<template>
  <nav>
    <v-toolbar 
    class="custom-toolbar" 
    style="border-radius: 5px;">
      <v-spacer></v-spacer>
      <v-toolbar-title class="text_main--text text-end" style="line-height:1.25rem;">

        <v-row no-gutters style="justify-content: end;">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ loggedIn.nama }}
              </span>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
                <v-list-item-title v-if="item.title === 'Keluar'" @click="logoutAction">
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-title v-else>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row no-gutters style="justify-content: end; ">
          <span class="font-weight-light" >Dosen</span>
        </v-row>

      </v-toolbar-title>
    </v-toolbar>
  </nav>

  
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      items: [
        { title: 'Profil Saya' , link:'/dosen/profil'},
        { title: 'Keluar' , link:'/login'},
        
      ],
      status_navbar:false,
      loggedIn:'',
      navbar:''
    }),

    mounted (){
      const token = localStorage.getItem('token');

      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.navbar= payload.user;
      }

      this.initializeNavbarLoggedIn()
    },

    methods:{
      async initializeNavbarLoggedIn() {
        //  const token = localStorage.getItem('token'); 
        //  const headers = { Authorization: `Bearer ${token}` };

          try {
            const response = await axios.get(this.$root.BASE_URL + `/api/getdosendata/${this.navbar.id_user}`)
            this.loggedIn = response.data.data[0]
          } catch (error) {
            console.error(error.message);
          }
        },

      logoutAction() {
        localStorage.removeItem('token')
      },
        

      }
    }


</script>

<style scoped>
.costum_dropdown{
  margin-top: 50%;
  margin-right: auto;
}

.custom-toolbar {
  width: 97%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
}

.v-list .v-list-item{
  border-radius: 6px;
}

.v-list .v-list-item--active{
  background-color: white !important;
  border-radius: 6px;
}

</style>
