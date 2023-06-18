<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataDokumen />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarDosen'
    import SideBar from '../components/SideBarDosen'
    import DataDokumen from '../components/ViewDaftarDokumen.vue'
    export default {
      name: 'DosenDataDokumen',
  
      components: {
        DataDokumen,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  