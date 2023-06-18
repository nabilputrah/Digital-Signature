<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataDosen />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoor'
    import SideBar from '../components/SideBarKoor'
    import DataDosen from '../components/ViewDataDosen.vue'
    export default {
      name: 'DosenData',
  
      components: {
        DataDosen,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  