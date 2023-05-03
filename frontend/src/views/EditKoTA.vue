<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <EditKoTA />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBar'
    import SideBar from '../components/SideBar'
    import EditKoTA from '../components/EditKoTA.vue'
    export default {
      name: 'KoTAEdit',
  
      components: {
        EditKoTA,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  