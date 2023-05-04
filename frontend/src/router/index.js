import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginPage.vue'
import DashboardKoor from '../views/DashboardKoor.vue'
import DataMahasiswa from '../views/DataMahasiswa.vue'
import DataDosen from '../views/DataDosen.vue' 
import DataProfil from '../views/DataProfil.vue'
import DataKoTA from '../views/DataKoTA.vue'
import AddKoTA from '../views/AddKoTA.vue'
import DetailKoTA from '../views/DetailKoTA.vue'
import EditKoTA from '../views/EditKoTA.vue'

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
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardKoor
  },
  {
    path: '/mahasiswa',
    name: 'mahasiswa',
    component: DataMahasiswa,
    meta: {
      requiresAuthKoordinator: true,
    },
  },
  {
    path: '/KoTA/tambah_KoTA',
    name: 'AddKoTA',
    component: AddKoTA
  },
  {
    path: '/KoTA/detail_KoTA',
    name: 'DetailKoTA',
    component: DetailKoTA
  },
  {
    path: '/KoTA/edit_KoTA',
    name: 'EditKoTA',
    component: EditKoTA
  },
  {
    path: '/KoTA',
    name: 'KoTA',
    component: DataKoTA,
    meta: {
      requiresAuthKoordinator: true,
    },
  },
  {
    path: '/dosen',
    name: 'dosen',
    component: DataDosen
  },
  {
    path: '/profil',
    name: 'profil',
    component: DataProfil
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
