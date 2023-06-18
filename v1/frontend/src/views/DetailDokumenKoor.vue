<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DokumenKoor />
  </div>
</template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoor'
    import SideBar from '../components/SideBarKoor'
    import DokumenKoor from '../components/ViewDokumenKoor.vue'
    export default {
      name: 'DetailDokumenDosen',
  
      components: {
        DokumenKoor,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  