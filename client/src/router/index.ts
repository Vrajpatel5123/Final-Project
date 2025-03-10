import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/MyActivity',
      name: 'myactivity',
      component: () => import('@/pages/MyActivity.vue')
    },
    {
      path: '/FriendActivity',
      name: 'friendactivity',
      component: () => import('@/pages/FriendActivity.vue')
    },
    {
      path: '/Admin',
      name: 'admin',
      component: () => import('@/pages/Admin.vue')
    },
    {
      path: '/User',
      name: 'user',
      component: () => import('@/pages/User.vue')
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('@/pages/Login.vue')
    },
    {
      path: '/SignUp',
      name: 'signup',
      component: () => import('@/pages/SignUp.vue')
    }
  ]
})

export default router