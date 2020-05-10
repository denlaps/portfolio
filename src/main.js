import Vue from 'vue'
import App from './App.vue'
import { VueRouter, router } from './routes.js'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueRouter);
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDS1NrAVdHVvC0xnJO9dbkiGB6ZzFju8W8',
    libraries: 'places'
  }
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
