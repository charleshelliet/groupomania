import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(sessionStorage.getItem('token') == null) {
        next("/login")
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if(sessionStorage.getItem('isAdmin') === 'false') {
        next("/login")
      } else {
        next();
      }
    }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: {
      name: 'Home'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
