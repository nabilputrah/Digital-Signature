<template>
  <v-app>
    <v-container>
      <h1>Welcome to my website!</h1>
      <p>Here is some content for the main area of the page.</p>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Home', icon: 'mdi-home' },
      { title: 'About', icon: 'mdi-information' },
      { title: 'Contact', icon: 'mdi-email' },
    ],
  }),
}
</script>



<style>
/* Add your custom styles here */
</style>
