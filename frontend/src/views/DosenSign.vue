<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <SignDosen />
  </div>
</template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarDosen'
    import SideBar from '../components/SideBarDosen'
    import SignDosen from '../components/SignDosen.vue'
    export default {
      name: 'DosenSign',
  
      components: {
        SignDosen,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  