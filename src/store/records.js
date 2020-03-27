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
    },
    loadRecordsFailure (state) {
      state.recordsStatus = { loadingRecordsFailure: true }
    }
  },
  actions: {
    loadMedicalRecords (
      { dispatch, commit }) {
      commit('loadRecordsRequest')
      recordsService.getMedicalRecords()
      .then(
        response => {
          commit('loadRecordsSuccess', response)
          dispatch('alert/success', 'Records Loaded', { root:true })
        },
        error => {
          commit('loadRecordsFailure')
          dispatch('alert/error', error, { root:true })
        }
      )
    }
  }
}

