import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert'
import { authentication } from './authentication'
import { profile } from './profile'
import { quote } from './quote'
import { history } from './history'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alert,
    authentication,
    profile,
    quote,
    history

  }
})

// Hot Reloading Modules For Development
// This Should Never Hit Production

if (module.hot) {
// accept actions and mutations as hot modules
  module.hot.accept(['./alert', './authentication', './profile', './quote', './history'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const newModuleAlert = require('./alert').default
    const newModuleAuthentication = require('./authentication').default
    const newModuleProfile = require('./profile').default
    const newModuleQuote = require('./quote').default
    const newModuleHistory = require('./history').default
    // swap in the new modules and mutations
    store.hotUpdate({
      modules: {
        newModuleAlert,
        newModuleAuthentication,
        newModuleProfile,
        newModuleQuote,
        newModuleHistory
      }
    })
  })
}
