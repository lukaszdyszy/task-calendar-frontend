import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Panel from './views/Panel.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/panel',
      name: 'Panel',
      component: Panel
    }
  ]
})
