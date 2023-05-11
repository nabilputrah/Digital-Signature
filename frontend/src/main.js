import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
  
// import axios from 'axios';


// const axiosIns = axios.create({
//   baseURL: 'http://localhost:3000/api'
// });


Vue.config.productionTip = false

new Vue({
  router,
  // axiosIns,
  vuetify,
  render: h => h(App)
}).$mount('#app')
