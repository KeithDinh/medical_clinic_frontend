import { datesService } from '../services'
import { router } from '../router'

const initialState = {
  datesStatus: {},
  datesList: []
}

export const dates = {
  namespaced: true,
  state: initialState,
  mutations: {
    datesRequest (state) {
      state.datesStatus = { loadingDates: true }
    },
    datesSuccess (state, dates) {
      state.datesStatus = { loadedDates: true }
      state.datesList = dates
    },
    datesFailure (state) {
      state.datesStatus = { datesFailure: true }
    }
  },
  actions: {
    loadDates (
      { dispatch, commit }, d) {
      commit('datesRequest')
      datesService.getDates(d[0], d[1])
        .then(
          response => {
            const dates = response.dates
            commit('datesSuccess', dates)
            dispatch('alert/success', 'Dates Retreived', { root: true })
          },
          error => {
            commit('datesFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    }
  }
}
