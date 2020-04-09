import { officeService } from '../services'
import { router } from '../router'

const initialState = {
  officeStatus: {},
  officeList: [],
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
    updateOffice ({ dispatch, commit, state },office) {
      commit('updateOfficeRequest')

      let tempList = [...state.officeList]
      /* alert(state.offices) */
      for (let i=0; i<state.officeList.length; i++) {
        if (tempList[i].office_id === office.office_id )
        {
          /* alert("inside if") */
          tempList[i] = office

        }
      }
      /* alert("After Loop") */
      commit('updateOfficeSuccess',tempList)
    },
  }
}
