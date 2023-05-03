<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <AddDataKoTA />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBar'
    import SideBar from '../components/SideBar'
    import AddDataKoTA from '../components/AddDataKoTA.vue'
    export default {
      name: 'KoTAAdd',
  
      components: {
        AddDataKoTA,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  