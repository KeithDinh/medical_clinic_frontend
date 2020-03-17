import { officeService } from '../services'
import { router } from '../router'

const initialState = {
  officeStatus: {},
  officeList: []
}

export const offices = {
  namespaced: true,
  state: initialState,
  mutations: {
    officeRequest (state) {
      state.officeStatus = { loadingOffices: true }
    },
    officeSuccess (state, offices) {
      state.officeStatus = { loadedOffices: true }
      state.officeList = offices
    },
    officeFailure (state) {
      state.officeStatus = { officesFailure: true }
    }
  },
  actions: {
    loadOffices (
      { dispatch, commit }, doctor_id ) {
      commit('officeRequest')
      officeService.getOffices(doctor_id)
        .then(
          response => {
            const offices = response.offices
            commit('officeSuccess', offices)
            dispatch('alert/success', 'Offices Retreived', { root: true })
          },
          error => {
            commit('officeFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    }
  }
}