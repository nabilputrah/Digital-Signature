<template>
  <div>
    <SideBar />
    <NavigasiBar />
    <DataMahasiswa />
  </div>
</template>
  
  <script>
    import NavigasiBar from '../components/NavigasiBarKoor'
    import SideBar from '../components/SideBarKoor'
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
  