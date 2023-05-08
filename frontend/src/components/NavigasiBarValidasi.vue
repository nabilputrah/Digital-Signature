<template>
  <nav>
    <v-toolbar 
    class="custom-toolbar" 
    style="border-radius: 5px;">
      <v-toolbar-items>
        <v-img class="sidebar-logo" src="../assets/Logo_DSign.png" contain></v-img>
        <v-toolbar-title class="logo-style font-weight-bold">D-Sign<br>JTK POLBAN</v-toolbar-title>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :to="`/login`"
        style="margin-top: auto;margin-bottom: auto;width: 8%;" 
      >
        Login
      </v-btn>
    </v-toolbar>
  </nav>

  
</template>

<script>
  export default {
  }
</script>

<style scoped>
.v-toolbar__title{
  /* font-size: 1rem !important; */
  color:#1a5f7a
}
.sidebar-logo {
  width: 3.8rem;
  height: 100%;
  /* object-fit: cover; */
}

.custom-toolbar {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}


</style>
