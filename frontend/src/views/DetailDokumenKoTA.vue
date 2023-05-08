<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DokumenKoTA />
  </div>
</template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoTA'
    import SideBar from '../components/SideBarKoTA'
    import DokumenKoTA from '../components/ViewDokumenKoTA.vue'
    export default {
      name: 'DetailDokumenKoTA',
  
      components: {
        DokumenKoTA,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  