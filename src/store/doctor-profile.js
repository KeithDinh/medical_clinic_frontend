import { doctorService } from '../services'
import { router } from '../router'

const initialState = {
  doctorProfileStatus: {},
  doctorProfile: {},
  doctorPatientStatus: {},
  patients: {},
  doctorApptStatus: {},
  appointments: {},
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
      state.appointments = returnedAppts
    }
  },
  actions: {
    loadDoctorProfile (
      { dispatch, commit }) {
      commit('doctorProfileRequest')
      commit('doctorPatientRequest')
      commit('doctorApptRequest')
      doctorService.getDoctor()
        .then(
          response => {
            const doc = response.doctors
            const pat = response.patients
            const appts = response.appointments
            commit('doctorProfileSuccess', doc)
            dispatch('alert/success', 'doctor Retreived', { root: true })
            commit('doctorPatientSuccess', pat)
            dispatch('alert/success', 'patients Retreived', { root: true })
            commit('doctorApptSuccess', appts)
            dispatch('alert/success', 'appointments Retreived', { root: true })
          },
          error => {
            commit('doctorProfileFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    }
  }
}
