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
    },
    receiveRx (state, rxs) {
      state.rxStatus = { loadedRx: true }
      state.rxList = rxs
    }
  },
  actions: {
    loadPrescriptions (
      { dispatch, commit }) {
      commit('loadRxRequest')
      const localUser = JSON.parse(localStorage.getItem('localUser'))
      commit('loadRxSuccess', localUser.prescriptions)
    }
  }
}

