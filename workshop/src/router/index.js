import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '',
    name: 'toolbar',
    component: () => import('../views/Toolbar.vue'),
    children:[
      {
        path: '/me',
        name: 'me',
        component: () => import('../views/Me.vue')
      },
      {
        path: '/apicon',
        name: 'apicon',
        component: () => import('../views/Apicon.vue')
      },
      {
        path: '/simple',
        name: 'simple',
        component: () => import('../views/Simple.vue')
      },
      {
        path: '/grade',
        name: 'grade',
        component: () => import('../views/Grade.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/product-view',
        name: 'product-view',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: '/product-emp',
        name: 'product-emp',
        component: () => import('../views/ProductViewEmp.vue')
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
