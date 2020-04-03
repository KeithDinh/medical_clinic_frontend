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
      state.patients = returnedPatients
    },
    doctorApptRequest (state) {
      state.doctorApptStatus = { loadingAppts: true }
    },
    doctorApptSuccess (state, returnedAppts) {
      state.doctorApptStatus = { loadedAppts: true }
      state.doctorAppointmentsList= returnedAppts
      console.log(state.doctorAppointmentsList)
    },

  },
  actions: {
    loadDoctorProfile (
      { dispatch, commit }) {
      commit('doctorProfileRequest')
      const localUser = JSON.parse(localStorage.getItem('localUser'))
      const profile = localUser.profile
      commit('doctorProfileSuccess', profile)
      dispatch('alert/success', 'doctor Retreived', { root: true })
    },
    loadDoctorPatients (
      { dispatch, commit }) {
      commit('doctorPatientRequest')
      const localUser = JSON.parse(localStorage.getItem('localUser'))
      const patients = localUser.patients
      commit('doctorPatientSuccess', patients)
      dispatch('alert/success', 'patients Retreived', { root: true })
    },
    loadDoctorAppointments (
      { dispatch, commit }) {
      commit('doctorApptRequest')
      const localUser = JSON.parse(localStorage.getItem('localUser'))
      const appts = localUser.appointments
      commit('doctorApptSuccess', appts)
      dispatch('alert/success', 'appointments Retreived', { root: true })
    }
  }
}
