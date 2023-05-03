<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DetailKoTA />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBar'
    import SideBar from '../components/SideBar'
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
  