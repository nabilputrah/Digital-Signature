<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataProfil />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBar'
    import SideBar from '../components/SideBar'
    import DataProfil from '../components/ViewDataProfil.vue'
    export default {
      name: 'PofilData',
  
      components: {
        DataProfil,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  