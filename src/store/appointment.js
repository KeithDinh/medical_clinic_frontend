import { appointmentService } from '../services'
import { router } from '../router'

const initialState = {
  apptStatus: {},
  appt: {}
}

export const appointment = {
  namespaced: true,
  state: initialState,
  mutations: {
    apptRequest (state) {
      state.apptStatus = { postingAppt: true }
    },
    apptSuccess (state, appt) {
      state.apptStatus = { postedAppt: true }
      state.appt = appt
    },
    apptFailure (state) {
      state.apptStatus = { apptFailure: true }
    }
  },
  actions: {
    setAppointment (
      { dispatch, commit }, { doctor, office, date, timeslot, reason, bookingMethod }) {
      commit('apptRequest')
      appointmentService.postAppointment(doctor, office, date, timeslot, reason, bookingMethod)
      .then(
        response => {
          commit('apptSuccess', { doctor, office, date, timeslot, reason, bookingMethod })
          dispatch('alert/success', 'Appointment Set', { root: true })
        },
        error => {
          commit('apptFailure')
          dispatch('alert/error', error, { root: true })
        }
      )
    }
  }
}
