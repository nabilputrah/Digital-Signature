<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataKoTA />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBar'
    import SideBar from '../components/SideBar'
    import DataKoTA from '../components/ViewDataKoTA.vue'
    export default {
      name: 'KoTAData',
  
      components: {
        DataKoTA,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  