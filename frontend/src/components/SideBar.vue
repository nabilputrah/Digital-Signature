<template>
  <nav>
  
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
    >
      <v-list-item class="px-2" style="padding-top: 5px;">

        <v-img class="sidebar-logo" src="../assets/Logo_DSign.png" contain></v-img>


        <v-list-item-title class="logo-style font-weight-bold">D-Sign<br>JTK POLBAN</v-list-item-title>
        <!-- <v-row >
          <v-col cols="20">
            <v-list-item-title>D-Sign</v-list-item-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="20">
            <v-list-item-title>JTK POLBAN</v-list-item-title>            
          </v-col>
        </v-row> -->


        <v-btn
          icon
          @click.stop="mini = !mini"
          
        >
          <v-icon color="text_main">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-list dense >
        <v-list-item
          @click.stop="mini = !mini"
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon >
            <v-icon color="text_main">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title class="costum-color">{{ item.title }}</v-list-item-title>
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
          { title: 'Beranda', icon: 'mdi-home-outline', link:'/about'},
          { title: 'Data KoTA', icon: 'mdi-account-multiple-outline' },
          { title: 'Data Mahasiswa', icon: 'mdi-account-outline' },
          { title: 'Data Dosen', icon: 'mdi-account-outline' },
        ],
        mini: true,
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

<style>
.costum-color{
  color:#1a5f7a
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
</style>
