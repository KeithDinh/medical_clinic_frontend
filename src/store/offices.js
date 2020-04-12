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
    },
    updateOfficeRequest (state) {
      state.OfficeStatus = { updatingOffice: true }
    },
    updateOfficeSuccess (state) {
      state.officeStatus = {
        updatedOffice: true,
      }
    },
    updateOfficeFailure (state) {
      state.officeStatus = { updateOfficeFailure: true }
    }

  },
  getters:{
    getOfficeList: state => {
      return state.officeList
    }
  },
  actions: {
    loadOfficesByDoctor (
      { dispatch, commit }, doctor_id ) {
      commit('officeRequest')
      officeService.getOfficesByDoctor(doctor_id)
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
    },
    loadOffices (
      { dispatch, commit } ) {
      commit('officeRequest')
      officeService.getOffices()
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
    },
    updateOffice ({ dispatch, commit, state }, office) {
      commit('updateOfficeRequest')
      officeService.putOffice(office).then(
        response => {
          commit('updateOfficeSuccess')
          commit('officeRequest')
          officeService.getOffices()
            .then(
              response => {
                const localUser = JSON.parse(localStorage.getItem('localUser'))
                localUser.offices = response
                localStorage.setItem('localUser', JSON.stringify(localUser))
                commit('officeSuccess', response.offices)
                dispatch('alert/success', 'Offices Retreived', { root: true })
              },
              error => {
                commit('officeFailure')
                dispatch('alert/error', error, { root: true })
              }
            )  
          dispatch('alert/success', 'Offices Retreived', { root: true })
        })
    },
  }
}
