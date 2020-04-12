import { datesService } from '../services'
import { router } from '../router'

const initialState = {
  datesStatus: {},
  datesList: [],
  timeslotsStatus: {},
  timeslots: [],
  disabledStatus: {},
  disabledDates: {}
}

// Validate the Login Form
const getDisabledDates = (dts) => {
  var beg = dts['av_dates'][0]['datetime']
  var end = dts['av_dates'][dts['av_dates'].length - 1]['datetime']
  var datesList = []
  dts['dis_dates'].forEach(date => {
    datesList.push(new Date(date['year'], date['month'] - 1, date['day']))
  })
  var disabledDates = {
    to: new Date(beg['year'], beg['month'] - 1, beg['day']),
    from: new Date(end['year'], end['month'] - 1, end['day']),
    dates: datesList
  }
  return disabledDates
}

const getTimeslots = (dt) => {
  var day = dt.getDate()
  var month = dt.getMonth() + 1
  var year = dt.getFullYear()
  var dts = dates['state']['datesList']
  alert(year)
  var timeslots = []
  var ts = []
  var hour = 0
  var shour = ""
  for (var i = 0; i < dts.length; i++) {
    if (day == dts[i]['datetime']['day'] && month == dts[i]['datetime']['month'] && year == dts[i]['datetime']['year']) {
      ts = dts[i]['timeslots']
      for (var j = 0; j < ts.length; j++) {
        shour = ""
        if (ts[j] == "Y") {
          hour = j + 9
          shour = hour + ":00am"
          if (hour >= 12) {
            if (hour > 12)
            {
              hour -= 12
            }
            shour = hour + ":00pm"
          }
          timeslots.push({slot:j+1,time:shour})
        }
      }
      break
    }
  }
  return timeslots
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
    timeslotsRequest (state) {
      state.timeslotsStatus = { loadingTimeslots: true }
    },
    timeslotsSuccess (state, ts) {
      state.timeslotsStatus = { loadedTimeslots: true }
      state.timeslots = ts
    }
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
          getDisabledDates(datesReturn).then(
            response => {
              commit('disabledSuccess', response)
              dispatch('alert/success', 'Disabled Loaded', { root: true })
            })
        },
        error => {
          commit('datesFailure')
          dispatch('alert/error', error, { root: true })
        }
      )
    },
    loadTimeslots (
    { dispatch, commit }, d) {
      commit('timeslotsRequest')
      const timeslotsReturn = getTimeslots(d)
      if (timeslotsReturn.length > 0) {
        commit('timeslotsSuccess', timeslotsReturn)
        dispatch('alert/success', 'Timeslots Loaded', { root: true })
      }
    }
  }
}
