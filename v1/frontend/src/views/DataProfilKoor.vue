<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataProfil />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoor'
    import SideBar from '../components/SideBarKoor'
    import DataProfil from '../components/ViewDataProfilKoor.vue'
    export default {
      name: 'ProfilData',
  
      components: {
        DataProfil,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  