import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/index'
import Content1 from '@/components/Content1'
import Content2 from '@/components/Content2-distributing'
import Content3 from '@/components/Content3-my'
import Content4 from '@/components/Content4-dis-detail'
import Content5 from '@/components/Content5-my-set'
import Content6 from '@/components/Content6-my-whole'
import Resetpass from '@/components/Resetpass'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        { path: 'content1', component: Content1 },
        { path: 'content2', component: Content2 },
        { path: 'content3', component: Content3 },
        { path: 'content4', component: Content4 },
        { path: 'content5', component: Content5 },
        { path: 'content6', component: Content6 },
      ]
    },
    {
      path: '/resetpass',
      name: 'Resetpass',
      component: Resetpass
    },
  ]
})
