// Vue Imports
import Vue from 'vue'
import Router from 'vue-router'

// User Created Imports
import Main from '@/components/Main'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Dashboard from '@/components/Dashboard'
import Quote from '@/components/Quote'
import Register from '@/components/Register'
import NotFound from '@/components/NotFound'

// Letting Vue Know To Use Router
Vue.use(Router)

// Creating the Router to Be Exported
export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: { transition: 'fade', breadcrumb: 'Home'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { transition: 'fade', breadcrumb: 'Login'}
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { transition: 'fade', breadcrumb: 'Dashboard' }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { transition: 'fade', breadcrumb: 'Profile'}
    },
    {
      path: '/quote',
      name: 'Quote',
      component: Quote,
      meta: { transition: 'fade'}
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { transition: 'fade', breadcrumb: 'Register'}
    },
    {
      path: '/404',
      component: NotFound,
      meta: { transition: 'fade'}
    },
    {
      path: '*',
      redirect: '/404',
      meta: { transition: 'fade'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  const nonAuthPages = ['/', '/register', '/login']
  const authPages = !nonAuthPages.includes(to.path)
  const loggedIn = localStorage.getItem('localUser')

  if (authPages && !loggedIn) {
    next('/')
  }

  if (loggedIn && to.path === '/') {
    next('/dashboard')
  }

  next()
})
