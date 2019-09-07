import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/views/admin'
import Staff from '@/views/staff'
import Login from '@/views/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
