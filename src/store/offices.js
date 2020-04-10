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
    updateOfficeRequest (state, submittedOffice) {
      state.OfficeStatus = { updatingOffice: true }
      state.officeList = submittedOffice
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
    updateOffice ({ dispatch, commit, state },office) {
      commit('updateOfficeRequest', state.officeList)
      const tempList = state.officeList
       alert(state.officeList[0]) 
       alert(state.officeList) 
       alert(context.state.officeList) 
      for (let i=0;i<state.officeList.length;i++)
      {
        if(tempList[i].office_id == office.office_id)
            tempList[i] = office
      }
       // tempList = tempList.map(item =>{
      //   var temp = Object.assign({}, item);
      //   if(item.office_id == office.office_id)
      //   {
      //     temp.name = name;
      //     alert("inside if")
      //   }
      //   return temp
      // })
      alert("After Loop")
      commit('updateOfficeSuccess',tempList)
    },
  }
}
