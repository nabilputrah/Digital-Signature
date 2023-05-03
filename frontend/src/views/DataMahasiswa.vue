<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataMahasiswa />
  </div>
</template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBar'
    import SideBar from '../components/SideBar'
    import DataMahasiswa from '../components/ViewDataMahasiswa.vue'
    export default {
      name: 'MahasiswaData',
  
      components: {
        DataMahasiswa,
        NavigasiBar,
        SideBar
      },
    }
  </script>
  