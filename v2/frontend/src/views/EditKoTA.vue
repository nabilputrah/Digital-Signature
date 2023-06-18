<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <EditKoTA />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoor'
    import SideBar from '../components/SideBarKoor'
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
  