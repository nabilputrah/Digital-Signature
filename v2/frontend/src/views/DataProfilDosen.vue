<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataProfil />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarDosen'
    import SideBar from '../components/SideBarDosen'
    import DataProfil from '../components/ViewDataProfilDosen.vue'
    export default {
      name: 'ProfilData',
  
      components: {
        DataProfil,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  