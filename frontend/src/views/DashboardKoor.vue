<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <KoorDashboard />
  </div>
  </template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBar'
    import SideBar from '../components/SideBar'
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
  