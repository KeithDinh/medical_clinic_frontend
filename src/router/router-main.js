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
      component: Main,
      meta: {transition: 'fade', breadcrumb: 'Home'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {transition: 'fade', breadcrumb: 'Login'}
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {transition: 'fade', breadcrumb: 'Register'}
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {transition: 'fade', breadcrumb: 'Dashboard'}
    },
    {
      path: '/update-profile',
      name: 'UpdateProfile',
      component: UpdateProfile,
      meta: {transition: 'fade', breadcrumb: 'Update Profile'}
    },
    {
      path: '/appointment',
      name: 'BookAppointment',
      component: BookAppointment,
      meta: {transition: 'fade', breadcrumb: 'Book Appointment'}
    },
    {
      path: '/search-doctor',
      name: 'SearchDoctor',
      component: SearchDoctor,
      meta: {transition: 'fade', breadcrumb: 'Search Doctor'}
    },
    {
      path: '/404',
      component: NotFound,
      meta: {transition: 'fade'}
    },
    {
      path: '*',
      redirect: '/404',
      meta: {transition: 'fade'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  var loggedIn = localStorage.getItem('localUser')
  if(to.path == '/dashboard' || to.path == '/update-profile' || to.path == '/appointment') {
    if(loggedIn) { 
        next()
    } else {
      router.push('/login')
    }
    return
  }
  next()
})