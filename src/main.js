import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import bootstrap from './plugins/bootstrap'

import VueAxios from "vue-axios";
import axios from "axios";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueAxios,
  axios,
  bootstrap,
  render: h => h(App)
}).$mount('#app')
