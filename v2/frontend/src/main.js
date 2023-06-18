import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
  

Vue.config.productionTip = false

new Vue({
  data() {
    return {
      BASE_URL: 'http://localhost:3000',
      // BASE_URL: 'http://192.168.43.136:3000',
    };
  },
  router,
  // axiosIns,
  vuetify,
  render: h => h(App)
}).$mount('#app')
