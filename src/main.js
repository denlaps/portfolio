import Vue from 'vue'
import App from './App.vue'
import { VueRouter, router } from './routes.js'

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
