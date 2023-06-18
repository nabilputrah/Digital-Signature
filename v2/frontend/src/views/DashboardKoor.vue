<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <KoorDashboard />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoor'
    import SideBar from '../components/SideBarKoor'
    import KoorDashboard from '../components/KoorDashboard.vue'
  
    export default {
      name: 'DashboardKoor',
  
      components: {
        KoorDashboard,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  