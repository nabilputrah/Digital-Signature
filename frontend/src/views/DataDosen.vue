<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataDosen />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBar'
    import SideBar from '../components/SideBar'
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
  