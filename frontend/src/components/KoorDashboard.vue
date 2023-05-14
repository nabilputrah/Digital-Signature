<template>
    <!-- Header Component -->
    <!-- <v-app-bar app color="primary">
      <v-toolbar-title>My Website</v-toolbar-title>
    </v-app-bar> -->

    <!-- Sidebar Component -->
    <!-- <v-navigation-drawer app color="white" width="240">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- Main Content Area -->
    <v-main>
      <v-container fluid>
        <h1>Welcome to my website!</h1>
        <p>Here is some content for the main area of the page.</p>

         <embed v-if="previewUrl" :src="previewUrl" type="application/pdf" width="100%" height="500px" />
      </v-container>
    </v-main>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({

    dokumen:'',
    previewUrl:'',

    items: [
      { title: 'Home', icon: 'mdi-home' },
      { title: 'About', icon: 'mdi-information' },
      { title: 'Contact', icon: 'mdi-email' },
    ],
  }),

  mounted(){
    this.initizialize()
  },
  methods:{
    async initizialize() {
      try {
        const response = await axios.get('http://localhost:3000/api/dokumen/Dokumen_testing2',{responseType:'blob'})
       

        this.previewUrl = URL.createObjectURL(response.data);
        console.log(this.previewUrl)
      } catch (error) {
        console.log(error.message.request)
      }
    

    
    }
  }
}
</script>

<style>
/* Add your custom styles here */
</style>
