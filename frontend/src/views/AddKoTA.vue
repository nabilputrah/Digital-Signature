<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <AddDataKoTA />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoor'
    import SideBar from '../components/SideBarKoor'
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
  