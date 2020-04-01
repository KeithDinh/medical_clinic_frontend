import { recordsService } from '../services'
import { router } from '../router'

const initialState = {
  recordsStatus: {},
  recordsList: []
}

export const medicalRecords = {
  namespaced: true,
  state: initialState,
  mutations: {
    loadRecordsRequest (state) {
      state.recordsStatus = { loadingRecords: true }
    },
    loadRecordsSuccess (state, records) {
      state.recordsStatus = { loadedRecords: true }
      state.recordsList = records
      console.log(state.recordsList)
    },
    loadRecordsFailure (state) {
      state.recordsStatus = { loadingRecordsFailure: true }
    }
  },
  actions: {
    receiveRecords (
      { dispatch, commit }, records) {
      commit('loadRecordsSuccess', records)
    },
    loadMedicalRecords (
      { dispatch, commit }) {
      commit('loadRecordsRequest')
      const localUser = JSON.parse(localStorage.getItem('localUser'))
      commit('loadRecordsSuccess', localUser.records)
    }
  }

}

