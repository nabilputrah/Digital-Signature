<template>
  <nav>
    <v-toolbar 
    v-if="status_navbar"
    class="custom-toolbar" 
    style="border-radius: 5px;">
      <v-spacer></v-spacer>
      <v-toolbar-title class="text_main--text text-end" style="line-height:1.25rem;">

        <v-row no-gutters style="justify-content: end;">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <span               
              v-bind="attrs"
              v-on="on"
              >
              Koordinator D4-2023</span>
            </template>
            <v-list >
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :to="item.link"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row no-gutters style="justify-content: end; ">
          <span class="font-weight-light" >Koordinator</span>
        </v-row>

      </v-toolbar-title>
    </v-toolbar>
  </nav>

  
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Profil Saya' , link:'/profil'},
        { title: 'Keluar' , link:'/dashboard'},
        
      ],
      status_navbar:false,
    }),
    created() {
      if (this.$route.path === '/portal' || this.$route.path === '/login') {
        this.status_sidebar = false
      }
      else{
        this.status_navbar = true
      }
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
