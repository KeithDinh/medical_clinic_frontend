import { officeService } from '../services'
import { router } from '../router'

const initialState = {
  officeStatus: {},
  officeList: [],
  officeDays: []
}


export const offices = {
  namespaced: true,
  state: initialState,
  mutations: {
    officeDaysSuccess(state, office){
      state.officeDays = office;
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
    loadOfficeDays({dispatch,commit,state})
    {
      var size = state.officeList.length
      var offs = []
      for(let n=0; n<size; n++){
        var office_struct = {
          office_id: '',
          office_name: '',
          office_selected: false,
          office_days: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false }
        }
        office_struct.office_id = state.officeList[n].office_id
        office_struct.office_name = state.officeList[n].office_name
        offs.push(office_struct)
      }
      commit('officeDaysSuccess', offs)
    },
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
      { dispatch, commit, state } ) {
      commit('officeRequest')
      officeService.getOffices()
        .then(
          response => {
            const offices = response.offices
            commit('officeSuccess', offices)
            dispatch('alert/success', 'Offices Retreived', { root: true })
            dispatch('loadOfficeDays')
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
                localUser.offices = response.offices
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
