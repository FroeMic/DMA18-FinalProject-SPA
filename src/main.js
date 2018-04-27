// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueProgressBar from 'vue-progressbar'

// components
import Mapbox from 'mapbox-gl-vue'

// store
import store from './store.js'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

// component registration
Vue.component('mapbox', Mapbox)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.Vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    this.$store.dispatch('loadApiVersion')
  }
})
