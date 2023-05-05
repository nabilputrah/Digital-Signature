<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataProfil />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoTA'
    import SideBar from '../components/SideBarKoTA'
    import DataProfil from '../components/ViewDataProfilKoTA.vue'
    export default {
      name: 'ProfilData',
  
      components: {
        DataProfil,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  