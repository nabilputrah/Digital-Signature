<template>
  <nav>
  
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2" style="padding-top: 5px;width: 100%;margin-left: auto;margin-right: auto;">

        <v-img class="sidebar-logo" src="../assets/Logo_DSign.png" contain></v-img>


        <v-list-item-title class="logo-style font-weight-bold">D-Sign<br>JTK POLBAN</v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini"
          
        >
          <v-icon color="text_main">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-list
        dense >
        <v-list-item
          @click.stop="mini = !mini"
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          :active-class="'active-item'" :class="{'custom-item': item.customClass}"
          style="width: 90%;margin-left: auto;margin-right: auto;"
        >
          <v-list-item-icon >
            <v-icon style="margin-left: -15%;margin-right: auto;">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -10%;">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>
  </nav>

  
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Beranda', icon: 'mdi-home-outline', link:'/koordinator/dashboard'},
          { title: 'Data KoTA', icon: 'mdi-account-multiple-outline', link:'/koordinator/KoTA'},
          { title: 'Data Mahasiswa', icon: 'mdi-account-school-outline', link:'/koordinator/mahasiswa' },
          { title: 'Data Dosen', icon: 'mdi-account-tie-outline', link:'/koordinator/dosen'},
        ],
        mini: true,
        status_sidebar:false,
        // if route = '/portal':
        //   status_sidebar = false
        // koordinator:false,
        kota:false,
      }
    },
    methods: {
    closeSidebar() {
      this.miniVariant = true;
      this.drawer = false;
    },
  },
  }
</script>

<style scoped>
.costum-color{
  color:#1a5f7a
}
.v-list-item__title{
  font-size: 1rem !important;
  color:#1a5f7a
}

.active-item .v-list-item__title{
  color: #FFFFFF;
}

.theme--light.v-icon{
  color:#1a5f7a
}

.active-item .theme--light.v-icon{
  color: #FFFFFF;
}

.sidebar-logo {
  width: 40px;
  height: 40px;
  /* object-fit: cover; */
}
.logo-style {
  font-style:normal;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: -0.428571px;
  margin-left: 1.5vh;
  color: #1A5F7A;  
}
.v-list .v-list-item--active{
  background-color:#1A5F7A;
  border-radius: 6px;
}

</style>
