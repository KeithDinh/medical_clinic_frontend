import { doctorsService } from '../services'
import { router } from '../router'

const initialState = {
  doctorsStatus: {},
  doctorsList: [],
  doctorProfileStatus: {},
  doctorProfile: {}
}

export const doctors = {
  namespaced: true,
  state: initialState,
  mutations: {
    doctorsRequest (state) {
      state.doctorsStatus = { loadingDoctors: true }
    },
    doctorsSuccess (state, returnedDoctors) {
      state.doctorsStatus = { loadedDoctors: true }
      state.doctorsList = returnedDoctors
    },
    doctorsFailure (state) {
      state.doctorsStatus = { doctorsFailure: true }
    },
    doctorsProfileRequest (state) {
      state.doctorProfileStatus = { loadingDoctor: true }
    },
    doctorsProfileSuccess (state, returnedDoctor) {
      state.doctorProfileStatus = { loadedDoctor: true }
      state.doctorsProfile = returnedDoctor
    },
    doctorsProfileFailure (state) {
      state.doctorProfileStatus = { doctorFailure: true }
    }
  },
  actions: {
    loadDoctors (
      { dispatch, commit }) {
      commit('doctorsRequest')
      doctorsService.getDoctors()
        .then(
          response => {
            const doctors = response.doctors
            commit('doctorsSuccess', doctors)
            dispatch('alert/success', 'doctors Retreived', { root: true })
          },
          error => {
            commit('doctorsFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    },
    loadDoctorsByOffice (
      { dispatch, commit }, office_id ) {
      commit('doctorsRequest')
      doctorsService.getDoctorsByOffice(office_id)
        .then(
          response => {
            const doctors = response.doctors
            commit('doctorsSuccess', doctors)
            dispatch('alert/success', 'doctors Retreived', { root: true })
          },
          error => {
            commit('doctorsFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    },
    loadDoctorById (
      { dispatch, commit }, doctor_id) {
      commit('doctorsProfileRequest')
      doctorsService.getDoctorById(doctor_id)
        .then(
          response => {
            const doctor = response.profile
            commit('doctorProfileSuccess', doctor)
            dispatch('alert/success', 'doctor profile Retreived', { root: true })
          })
    }
  }
}
