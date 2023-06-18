<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataKoTA />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoor'
    import SideBar from '../components/SideBarKoor'
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
  