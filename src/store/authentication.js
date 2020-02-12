import { userService } from '../services'
import { router } from '../router'

const localUser = JSON.parse(localStorage.getItem('localUser'))
const initialState = localUser
  ? { status: { loggedIn: true }, localUser: localUser }
  : { status: {}, localUser: null }

// Validate the Registration Form
const validateRegistration = (username, email, passwordOne, passwordTwo) => {
  let errors = []
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!username) {
    errors.push(new Error('Username required.'))
  }
  if (!re.test(email)) {
    errors.push(new Error('Valid email required.'))
  }
  if (!passwordOne) {
    errors.push(new Error('Password required.'))
  }
  if (!passwordTwo) {
    errors.push(new Error('Must confirm password.'))
  }
  if (passwordOne !== passwordTwo) {
    errors.push(new Error('Passwords must match.'))
  }
  return errors
}
// Validate the Login Form
const validateLogin = (username, password) => {
  let errors = []
  if (!username) {
    errors.push(new Error('Username required'))
  }
  if (!password) {
    errors.push(new Error('Password required'))
  }
  return errors
}

export const authentication = {
  namespaced: true,
  state: initialState,
  mutations: {
    loginRequest (state, localUser) {
      state.status = { loggingIn: true }
      state.localUser = localUser
    },
    loginSuccess (state, localUser) {
      state.status = { loggedIn: true }
      state.localUser = localUser
    },
    loginFailure (state) {
      state.status = {}
      state.localUser = null
    },
    logout (state) {
      state.status = {}
      state.localUser = null
    },
    registerRequest (state, localUser) {
      state.status = { registering: true }
      state.localUser = localUser
    },
    registerSuccess (state, localUser) {
      state.status = { loggedIn: true }
      state.localUser = localUser
    },
    registerFailure (state) {
      state.status = {}
      state.localUser = null
    }
  },
  actions: {
    login ({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username })
      let errors = validateLogin(username, password)
      if (errors.length === 0) {
        userService.login(username, password)
          .then(
            localUser => {
              commit('loginSuccess', localUser)
              router.push('/quote')
              dispatch('alert/success', 'Logged In', { root: true })
            },
            error => {
              commit('loginFailure', error)
              dispatch('alert/error', error, { root: true })
            }
          )
      } else {
        commit('loginFailure', errors)
        dispatch('alert/error', errors, { root: true })
      }
    },
    logout ({ dispatch, commit }) {
      userService.logout()
      commit('logout')
      router.push('/')
      dispatch('alert/success', 'Logged Out', { root: true })
    },
    register ({dispatch, commit}, { username, email, passwordOne, passwordTwo }) {
      commit('registerRequest', {username})
      let errors = validateRegistration(username, email, passwordOne, passwordTwo)
      if (errors.length === 0) {
        userService.register(username, email, passwordOne)
          .then(
            localUser => {
              commit('registerSuccess', localUser)
              router.push('/profile')
              dispatch('alert/success', 'Account Registered', { root: true })
            },
            error => {
              commit('registerFailure', error)
              dispatch('alert/error', error, { root: true })
            }
          )
      } else {
        commit('registerFailure', errors)
        dispatch('alert/error', errors, { root: true })
      }
    }
  }
}
