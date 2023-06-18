<template>
    <div>
      <SideBar />
      <NavigasiBar />
      <CreatePengesahan />
    </div>
  </template>
    
    <script>
      import NavigasiBar from '../components/NavigasiBarKoTA'
      import SideBar from '../components/SideBarKoTA'
      import CreatePengesahan from '../components/CreatePengesahan.vue'
      export default {
        name: 'CreateLembarPengesahan',
    
        components: {
            CreatePengesahan,
          NavigasiBar,
          SideBar
        },
      }
    </script>
    