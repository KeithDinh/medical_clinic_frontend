import { doctorService } from '../services'
import { router } from '../router'

const initialState = {
  doctorProfileStatus: {},
  doctorProfile: {},
  doctorPatientStatus: {},
  patients: {},
  doctorApptStatus: {},
  doctorAppointmentsList:{},
  doctorsStatus: {},
  doctorsList: []
}

export const doctor = {
  namespaced: true,
  state: initialState,
  mutations: {
    doctorProfileRequest (state) {
      state.doctorProfileStatus = { loadingDoctor: true }
    },
    doctorProfileSuccess (state, returnedDoctor) {
      state.doctorProfileStatus = { loadedDoctor: true }
      state.doctorProfile = returnedDoctor
    },
    doctorProfileFailure (state) {
      state.doctorProfileStatus = { doctorFailure: true }
    },
    doctorPatientRequest (state) {
      state.doctorProfileStatus = { loadingPatients: true }
    },
    doctorPatientSuccess (state, returnedPatients) {
      state.doctorPatientStatus = { loadedPatients: true }
      state.patients = {...state.patients, ...returnedPatients}
      console.log("Patient List",state.patients)
    },
    doctorApptRequest (state) {
      state.doctorApptStatus = { loadingAppts: true }
    },
    doctorApptSuccess (state, returnedAppts) {
      state.doctorApptStatus = { loadedAppts: true }
      state.doctorAppointmentsList= {...state.doctorAppointmentsList, ...returnedAppts}

    },
    doctorsRequest (state) {
      state.doctorsStatus = { loadingDoctors: true }
    },
    doctorsSuccess (state, returnedDoctors) {
      state.doctorsStatus = { loadedDoctors: true }
      state.doctorsList = returnedDoctors
    },
    doctorsFailure (state) {
      state.doctorsStatus = { doctorsFailure: true }
    }
  },
  actions: {
    loadDoctorById (
      { dispatch, commit }, doctor_id) {
      commit('doctorProfileRequest')
      doctorService.getDoctor(doctor_id).then(
        response => {
          commit('doctorProfileSuccess', response.profile)
          dispatch('alert/success', 'doctor Retreived', { root: true })
        })
    },
    loadDoctorFromList (
      { dispatch, commit, state }, doctor_id) {
      commit('doctorProfileFromList')
      state.doctorsList.forEach(doc => {
        if (doc.doctor_id === doctor_id) {
          commit('doctorProfileSuccess', doc)
        }
      })
    },
    loadDoctorProfile (
      { dispatch, commit }) {
      commit('doctorProfileRequest')
      const doctor = JSON.parse(localStorage.getItem('doctor'))
      commit('doctorProfileSuccess', doctor.profile)
      dispatch('alert/success', 'doctor Retreived', { root: true })
    },
    loadDoctorPatients (
      { dispatch, commit }) {
      commit('doctorPatientRequest')
      const doctor = JSON.parse(localStorage.getItem('doctor'))
      commit('doctorPatientSuccess', doctor.patients)
      dispatch('alert/success', 'patients Retreived', { root: true })
    },
    loadDoctorAppointments (
      { dispatch, commit }) {
      commit('doctorApptRequest')
      const doctor = JSON.parse(localStorage.getItem('doctor'))
      commit('doctorApptSuccess', doctor.appointments)
      dispatch('alert/success', 'appointments Retreived', { root: true })
    },
    loadDoctors (
      { dispatch, commit }) {
      commit('doctorsRequest')
      doctorService.getDoctors()
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
      doctorService.getDoctorsByOffice(office_id)
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
    }
  }
}
