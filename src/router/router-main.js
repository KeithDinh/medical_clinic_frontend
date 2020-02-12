// Vue Imports
import Vue from 'vue'
import Router from 'vue-router'

// User Created Imports
import Login from '@/components/Login'
import Profile from '@/components/Profile'
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
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/quote',
      name: 'Quote',
      component: Quote
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const nonAuthPages = ['/', '/register']
  const authPages = !nonAuthPages.includes(to.path)
  const loggedIn = localStorage.getItem('localUser')

  if (authPages && !loggedIn) {
    return next('/')
  }

  if (loggedIn && to.path === '/') {
    console.log(localStorage.getItem('this.profile'))
    return next('/quote')
  }

  next()
})
