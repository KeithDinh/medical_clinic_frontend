import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert'
import { admin } from './admin'
import { authentication } from './authentication'
import { profile } from './profile'
import { dates } from './dates'
import { doctor } from './doctor'
import { offices } from './offices'
import { appointment } from './appointment'
import { prescription } from './prescription'
import { medicalRecords } from './records'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alert,
    admin,
    authentication,
    profile,
    dates,
    doctor,
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
  module.hot.accept(['./admin','./alert', './authentication', './profile', './dates',
  './doctor','./offices', './appointment', './prescription','./records'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const newModuleAdmin = require('./admin').default
    const newModuleAlert = require('./alert').default
    const newModuleAuthentication = require('./authentication').default
    const newModuleProfile = require('./profile').default
    const newModuleDates = require('./dates').default
    const newModuleDoctor = require('./doctor').default
    const newModuleOffices = require('./offices').default
    const newModuleAppointment = require('./appointment').default
    const newModulePrescription = require('./prescription').default
    const newModuleRecords = require('./records').default
    // const newModuleRecords = require('./records').default
    // swap in the new modules and mutations
    store.hotUpdate({
      modules: {
        newModuleAdmin,
        newModuleAlert,
        newModuleAuthentication,
        newModuleProfile,
        newModuleDates,
        newModuleDoctor,
        newModuleOffices,
        newModuleAppointment,
        newModulePrescription,
        newModuleRecords
      }
    })
  })
}
