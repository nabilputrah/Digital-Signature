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

Vue.use(VueRouter)

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
    component: DataMahasiswa
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
    path: '/KoTA',
    name: 'KoTA',
    component: DataKoTA
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
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
