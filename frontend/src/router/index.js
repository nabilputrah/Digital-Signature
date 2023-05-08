import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import Login from '../views/LoginPage.vue'
import ValidasiPage from '../views/ValidasiPage.vue'

// Role KoTA
import DashboardKoor from '../views/DashboardKoor.vue'
import DataMahasiswa from '../views/DataMahasiswa.vue'
import DataDosen from '../views/DataDosen.vue' 
import DataProfilKoor from '../views/DataProfilKoor.vue'
import DataKoTA from '../views/DataKoTA.vue'
import AddKoTA from '../views/AddKoTA.vue'
import DetailKoTA from '../views/DetailKoTA.vue'
import EditKoTA from '../views/EditKoTA.vue'
import DokumenKoor from '../views/DetailDokumenKoor.vue'

// Role Dosen
import DaftarDokumen from '../views/DaftarDokumen.vue'
import DataProfilDosen from '../views/DataProfilDosen.vue'
import DokumenDosen from '../views/DetailDokumenDosen.vue'

//Role KoTA
import DataProfilKoTA from '../views/DataProfilKoTA.vue'
import DokumenKoTA from '../views/DetailDokumenKoTA.vue'

Vue.use(VueRouter)

const checkAuthKoordinator = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    console.log(decodedToken);
    const userRole = decodedToken.user.role;
    if (userRole === 'Koordinator') {
      // Jika "role" dari token sesuai dengan "dosen", maka lanjutkan ke halaman yang diminta
      next();
    } else {
      // Jika "role" dari token tidak sesuai, maka arahkan pengguna kembali ke halaman login
      next( {name:'login'} );
    }
  } else {
    // Jika pengguna tidak memiliki token, maka arahkan pengguna kembali ke halaman login
    next( {name:'login'} );
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: ValidasiPage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

// Role KoTA
  {
    path: '/KoTA/profil',
    name: 'profil',
    component: DataProfilKoTA
  },
  {
    path: '/KoTA/dokumen_detail',
    name: 'dokumenKoTA',
    component: DokumenKoTA
  },

// Role Dosen 
  {
    path: '/dosen/daftar_dokumen',
    name: 'daftar_dokumen',
    component: DaftarDokumen
  },
  {
    path: '/dosen/profil',
    name: 'profil',
    component: DataProfilDosen
  },
  {
    path: '/dosen/daftar_dokumen/dokumen_detail/:id',
    name: 'dokumenDosen',
    component: DokumenDosen
  },

// Role Koordinator
  {
    path: '/koordinator/KoTA/dokumen_detail/:id',
    name: 'dokumenKoor',
    component: DokumenKoor
  },
  {
    path: '/koordinator/dashboard',
    name: 'dashboard',
    component: DashboardKoor
  },
  {
    path: '/koordinator/mahasiswa',
    name: 'mahasiswa',
    component: DataMahasiswa,
    meta: {
      requiresAuthKoordinator: true,
    },
  },
  {
    path: '/koordinator/KoTA/tambah_KoTA',
    name: 'AddKoTA',
    component: AddKoTA
  },
  {
    path: '/koordinator/KoTA/detail_KoTA/:id',
    name: 'DetailKoTA',
    component: DetailKoTA
  },
  {
    path: '/koordinator/KoTA/edit_KoTA/:id',
    name: 'EditKoTA',
    component: EditKoTA
  },
  {
    path: '/koordinator/KoTA',
    name: 'KoTA',
    component: DataKoTA,
    meta: {
      requiresAuthKoordinator: true,
    },
  },
  {
    path: '/koordinator/dosen',
    name: 'dosen',
    component: DataDosen
  },
  {
    path: '/koordinator/profil',
    name: 'profil',
    component: DataProfilKoor
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuthKoordinator)) {
    checkAuthKoordinator(to, from, next);
  } else {
    next();
  }
});
export default router
