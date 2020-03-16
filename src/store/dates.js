import { datesService } from '../services'
import { router } from '../router'

const initialState = {
  datesStatus: {},
  datesList: [],
  disabledStatus: {},
  disabledDates: {}
}

// Validate the Login Form
const getDisabledDates = (dates) => {
  var beg = dates['av_dates'][0]['datetime']
  var end = dates['av_dates'][dates['av_dates'].length - 1]['datetime']
  var datesList = []
  dates['dis_dates'].forEach(date => {
    datesList.push(new Date(date['year'], date['month'] - 1, date['day']))
  })
  var disabledDates = {
    to: new Date(beg['year'], beg['month'] - 1, beg['day']),
    from: new Date(end['year'], end['month'] - 1, end['day']),
    dates: datesList
  }
  return disabledDates
}

export const dates = {
  namespaced: true,
  state: initialState,
  mutations: {
    datesRequest (state) {
      state.datesStatus = { loadingDates: true }
    },
    datesSuccess (state, dts) {
      state.datesStatus = { loadedDates: true }
      state.datesList = dts['av_dates']
    },
    datesFailure (state) {
      state.datesStatus = { datesFailure: true }
    },
    disabledRequest (state) {
      state.disabledStatus = { loadingDisabled: true }
    },
    disabledSuccess (state, disabledDates) {
      state.datesStatus = { loadedDisabled: true }
      state.disabledDates = disabledDates
    },
  },
  actions: {
    loadDates (
      { dispatch, commit }, d) {
      commit('datesRequest')
      datesService.getDates(d[0], d[1])
        .then(
          response => {
            const datesReturn = response.dates
            commit('datesSuccess', datesReturn)
            dispatch('alert/success', 'Dates Retreived', { root: true })
            commit('disabledRequest')
            const disabledDatesReturn = getDisabledDates(datesReturn)
            commit('disabledSuccess', disabledDatesReturn)
            dispatch('alert/success', 'Disabled Loaded', { root: true })
          },
          error => {
            commit('datesFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    }
  }
}
