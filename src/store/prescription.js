import { prescriptionService } from '../services'
import { router } from '../router'

const initialState = {
  rxStatus: {},
  rxList: []
}

export const prescription = {
  namespaced: true,
  state: initialState,
  mutations: {
    loadRxRequest (state) {
      state.rxStatus = { loadingRx: true }
    },
    loadRxSuccess (state, rxs) {
      state.rxStatus = { loadedRx: true }
      state.rxList = rxs
      // document.write(state.rxList)
      console.log(state.rxList)
    },
    loadRxFailure (state) {
      state.rxStatus = { loadingRxFailure: true }
    }
  },
  actions: {
    loadPrescriptions (
      { dispatch, commit }) {
      commit('loadRxRequest')
      prescriptionService.getPrescriptions()
      .then(
        response => {
          commit('loadRxSuccess', response)
          dispatch('alert/success', 'Prescriptions Loaded', { root:true })
        },
        error => {
          commit('loadRxFailure')
          dispatch('alert/error', error, { root:true })
        }
      )
    }
  }
}

