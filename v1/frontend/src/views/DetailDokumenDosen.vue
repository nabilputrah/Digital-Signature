<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DokumenDosen />
  </div>
</template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarDosen'
    import SideBar from '../components/SideBarDosen'
    import DokumenDosen from '../components/ViewDokumenDosen.vue'
    export default {
      name: 'DetailDokumenDosen',
  
      components: {
        DokumenDosen,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  