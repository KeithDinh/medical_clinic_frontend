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
import DoctorDashboard from "../components/DoctorDashboard";
import BookAppointment from '@/components/BookAppointment'
import NotFound from '@/components/NotFound'
import AdminPage from '@/components/AdminPage'
import Office from '@/components/Office'
import DoctorPatients from "../components/DoctorPatients";

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
      path: '/office',
      name: 'Office',
      component: Office
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage
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
      path: '/doctor-dashboard',
      name: 'DoctorDashboard',
      component: DoctorDashboard
    },
    {
      path: '/doctor-patients',
      name: 'DoctorPatients',
      component: DoctorPatients
    }
    ,
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
  if (to.path === '/dashboard' || to.path === '/update-profile' || to.path === '/appointment'
    || to.path === '/doctor-dashboard' || to.path === '/admin' || to.path==='/doctor-patients') {
    if (loggedIn) {
      next()
      return
    }else if(to.path === '/office' || to.path === '/search-doctor') {
      next()
      return
    } else {
      router.push('/login')
      return
    }
  }
  next()
})
