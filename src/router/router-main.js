// Vue Imports
import Vue from 'vue'
import Router from 'vue-router'

// User Created Imports
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UpdateProfile from '@/components/UpdateProfile'
import Dashboard from '@/components/Dashboard'
import SearchDoctor from '@/components/SearchDoctor'
import DoctorProfile from '@/components/DoctorProfile'
import BookAppointment from '@/components/BookAppointment'
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
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/update-profile',
      name: 'UpdateProfile',
      component: UpdateProfile
    },
    {
      path: '/appointment',
      name: 'BookAppointment',
      component: BookAppointment
    },
    {
      path: '/search-doctor',
      name: 'SearchDoctor',
      component: SearchDoctor
    },
    {
      path: '/doctor-profile',
      name: 'DoctorProfile',
      component: DoctorProfile
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
  var loggedIn = localStorage.getItem('localUser')
  if (to.path === '/dashboard' || to.path === '/update-profile' || to.path === '/appointment' || to.path === '/doctor-profile') {
    if (loggedIn) {
      next()
      return
    } else {
      router.push('/login')
      return
    }
  }
  next()
})
