import { officeService } from '../services'
import { router } from '../router'

const initialState = {
  officeStatus: {},
  officeList: [],
  officeProfileStatus:{},
  officeProfile:{}
}

export const offices = {
  namespaced: true,
  state: initialState,
  mutations: {
    
    officeProfileRequest (state){
      state.officeProfile = {loadingOffice: true}
    },
    officeProfileSuccess (state, office){
      state.officeProfileStatus = { loadedOffice: true }
      state.officeProfile = office
    },
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
    updateOfficeSuccess (state, returnedOfficeList) {
      state.officeStatus = {
        updatedOffice: true,
      }
      state.officeList = returnedOfficeList
    },
    updateOfficeFailure (state) {
      state.officeStatus = { updateOfficeFailure: true }
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
    updateOffice ({ dispatch, commit, state },office) {
      commit('updateOfficeRequest')
      var tempList = state.officeList
      for (let i=0; i<state.officeList.length; i++) {
        if (off[i].office_id === office.office_id )
          tempList[i] = office
      }
      
      commit('updateOfficeSuccess',tempList)
        
      
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

    loadOfficeProfile (
      { dispatch, commit }, office_id ) {
      commit('officeProfileRequest')
      officeService.getOffice(office_id)
        .then(
          response => {
            const officeProfile = response.office
            commit('officeProfileSuccess', officeProfile)
            dispatch('alert/success', 'Office Retreived', { root: true })
          },
          error => {
            commit('officeProfileFailure')
            dispatch('alert/error', error, { root: true })
          }
        )    
    }
  }
}
