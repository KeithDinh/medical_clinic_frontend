import { doctorService } from '../services'
import { router } from '../router'

const initialState = {
  doctorProfileStatus: {},
  doctorProfile: {},
  doctorPatientStatus: {},
  patients: {},
  doctorApptStatus: {},
  doctorAppointmentsList:{}

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

  },
  actions: {
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
    }
  }
}
