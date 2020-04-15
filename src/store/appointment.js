import {appointmentService, doctorService, profileService} from '../services'
import { router } from '../router'

const initialState = {
  apptStatus: {},
  appt: {},
  apptsList: {}
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
    },
    loadApptRequest (state) {
      state.apptStatus = { postingAppt: true }
    },
    loadApptSuccess (state, appts) {
      state.apptStatus = { postedAppt: true }
      state.apptsList = appts
    },
    loadApptFailure (state) {
      state.apptStatus = { apptFailure: true }
    },
    cancelApptRequest (state) {
      state.apptStatus = { cancelingAppt: true }
    },
    cancelApptSuccess (state,appts){
      state.apptStatus = { cancelAppt: true }
      state.apptsList = appts
    },
    cancelApptFailure(state) {
      state.apptStatus = { finshApptFailure: true }
    }
  },
  actions: {
    setAppointment (
      { dispatch, commit }, { doctor, office, refDoctor, date, timeslot, reason, bookingMethod }) {
      commit('apptRequest')
      appointmentService.postAppointment(doctor, office, refDoctor, date, timeslot, reason, bookingMethod)
      .then(
        response => {
          commit('apptSuccess', { doctor, office, refDoctor, date, timeslot, reason, bookingMethod })
          const localUser = JSON.parse(localStorage.getItem('localUser'))
          profileService.getProfile(localUser.patient_id).then(
            response => {
              const patient = JSON.parse(localStorage.getItem('patient'))
              patient.appointments = response.appointments
              localStorage.setItem('patient', JSON.stringify(patient))
              router.push('/dashboard')
            }
          )
          dispatch('alert/success', 'Appointment Set', { root: true })
        },
        error => {
          commit('apptFailure')
          dispatch('alert/error', error, { root: true })
        }
      )
    },
    loadAppointments (
      { dispatch, commit }) {
      commit('loadApptRequest')
      const patient = JSON.parse(localStorage.getItem('patient'))
      commit('loadApptSuccess', patient.appointments)
    },
    cancelAppointment (
      { dispatch, commit }, appt_id) {
      commit('cancelApptRequest')
      appointmentService.cancelAppointment(appt_id)
        .then(
          response => {
            const apptCancelStatus = response.msg
            commit('cancelApptSuccess', apptCancelStatus)
            dispatch('alert/success', 'Canceled Appointment', { root: true })
            commit('loadApptRequest')
            appointmentService.getAppointments().then(
              response => {
                var patient = JSON.parse(localStorage.getItem('patient'))
                patient['appointments'] = response
                localStorage.setItem('patient', JSON.stringify(patient))
                commit('loadApptSuccess', response)
              })
          },
          error => {
            commit('cancelApptFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    },

  }
}

