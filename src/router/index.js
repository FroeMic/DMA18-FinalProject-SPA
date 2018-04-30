import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import HMDAForm from '@/components/HMDAForm'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    },
    {
      path: '/form',
      name: 'HMDAForm',
      component: HMDAForm
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
