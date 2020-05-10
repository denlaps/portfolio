import Vue from 'vue'
import App from './App.vue'
import { VueRouter, router } from './routes.js'
import * as VueGoogleMaps from 'vue2-google-maps'
import MAP_SETTINGS from './data/map.settings'

Vue.use(VueRouter);
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, MAP_SETTINGS);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
