<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DetailKoTA />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoor'
    import SideBar from '../components/SideBarKoor'
    import DetailKoTA from '../components/ViewDetailKoTA.vue'
    export default {
      name: 'KoTADetail',
  
      components: {
        DetailKoTA,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  