<template>
  <div>
    <NavigasiBar />
    <PageValidasi />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarValidasi'
    import PageValidasi from '../components/PageValidasi.vue'
    export default {
      name: 'ValidasiPage',
  
      components: {
        PageValidasi,
        NavigasiBar,
      },
    }
  </script>
  
  