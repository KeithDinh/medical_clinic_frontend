import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert'
import { authentication } from './authentication'
import { profile } from './profile'
import { dates } from './dates'
import { doctor } from './doctor-profile'
import { doctors } from './doctors'
import { offices } from './offices'
import { appointment } from './appointment'
import { prescription } from './prescription'
import { medicalRecords } from './records'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alert,
    authentication,
    profile,
    dates,
    doctor,
    doctors,
    offices,
    appointment,
    prescription,
    medicalRecords
  }
})

// Hot Reloading Modules For Development
// This Should Never Hit Production

if (module.hot) {
// accept actions and mutations as hot modules
  module.hot.accept(['./alert', './authentication', './profile', './dates', './doctor-profile', './doctors'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const newModuleAlert = require('./alert').default
    const newModuleAuthentication = require('./authentication').default
    const newModuleProfile = require('./profile').default
    const newModuleDates = require('./dates').default
    const newModuleDoctor = require('./doctor-profile').default
    const newModuleDoctors = require('./doctors').default
    const newModuleOffices = require('./offices').default
    const newModuleAppointment = require('./appointment').default
    const newModulePrescription = require('./prescription').default
    // swap in the new modules and mutations
    store.hotUpdate({
      modules: {
        newModuleAlert,
        newModuleAuthentication,
        newModuleProfile,
        newModuleDates,
        newModuleDoctor,
        newModuleDoctors,
        newModuleOffices,
        newModuleAppointment,
        newModulePrescription
      }
    })
  })
}
