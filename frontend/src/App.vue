<template>
  <v-app>
    <v-main>
      <SideBar />
      <NavigasiBar />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigasiBar from './components/NavigasiBar'
import SideBar from './components/SideBar'
export default {
  name: 'App',
  components:{
    NavigasiBar,
    SideBar
  }
};
</script>
