import { datesService } from '../services'
import { router } from '../router'

const initialState = {
  datesStatus: {},
  dates: []
}

/*const formatDates = dates => {
//format the dates to work with vue-fullcalendar
}*/

export const dates = {
  namespaced: true,
  state: initialState,
  mutations: {
    datesRequest (state) {
      state.datesStatus = { loadingDates: true }
    },
    datesSuccess (state, dates) {
      state.datesStatus = { loadedDates: true }
      state.dates = dates
    },
    datesFailure (state) {
      state.datesStatus = { datesFailure: true }
    }
  },
  actions: {
    loadDates (
      { dispatch, commit }) {
      commit('datesRequest')
      datesService.getDates()
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
