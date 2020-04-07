import { adminService } from '../services'
import { router } from '../router'

const initialState = {
  adminProfileStatus: {},
  adminProfile: {},
  adminPatientStatus: {},
  patients: {},
  adminApptStatus: {},
  adminAppointmentsList:{},
  adminDoctorStatus: {},
  doctors:{},
  adminOfficeStatus: {},
  offices:{}
}


export const admin = {

    namespaced: true,
    state: initialState,
    mutations: {
      adminProfileRequest (state) {
        state.adminProfileStatus = { loadingAdmin: true }
      },
      adminProfileSuccess (state, returnedAdmin) {
        state.adminProfileStatus = { loadedAdmin: true }
        state.adminProfile = returnedAdmin
      },
      adminProfileFailure (state) {
        state.adminProfileStatus = { adminFailure: true }
      },

      adminPatientRequest (state) {
        state.adminProfileStatus = { loadingPatients: true }
      },
      adminPatientSuccess (state, returnedPatients) {
        state.adminPatientStatus = { loadedPatients: true }
        state.patients = returnedPatients
      },
      adminDoctorRequest (state) {
        state.adminProfileStatus = { loadingDoctors: true }
      },
      adminDoctorSuccess (state, returnedDoctors) {
        state.adminDoctorStatus = { loadedDoctor: true }
        state.doctors = returnedDoctors
      },
      adminOfficeRequest (state) {
        state.adminProfileStatus = { loadingOffices: true }
      },
      adminOfficeSuccess (state, returnedOffices) {
        state.adminOfficeStatus = { loadedOffice: true }
        state.offices = returnedOffices
      },
      adminApptRequest (state) {
        state.adminApptStatus = { loadingAppts: true }
      },
      adminApptSuccess (state, returnedAppts) {
        state.adminApptStatus = { loadedAppts: true }
        state.adminAppointmentsList= returnedAppts
      },


    },

    actions: {
        loadAdminProfile (
          { dispatch, commit }) {
          commit('adminProfileRequest')
          const localUser = JSON.parse(localStorage.getItem('localUser'))
          const profile = localUser.profile
          commit('adminProfileSuccess', profile)
          dispatch('alert/success', 'admin Retreived', { root: true })
        },
        loadAdminPatients (
          { dispatch, commit }) {
          commit('adminPatientRequest')
          const localUser = JSON.parse(localStorage.getItem('localUser'))
          const patients = localUser.patients
          commit('adminPatientSuccess', patients)
          dispatch('alert/success', 'patients Retreived', { root: true })
        },
        loadAdminAppointments (
          { dispatch, commit }) {
          commit('adminApptRequest')
          const localUser = JSON.parse(localStorage.getItem('localUser'))
          const appts = localUser.appointments
          commit('adminApptSuccess', appts)
          dispatch('alert/success', 'appointments Retreived', { root: true })
        },
        loadAdminDoctors (
            { dispatch, commit }) {
            commit('adminDoctorRequest')
            const localUser = JSON.parse(localStorage.getItem('localUser'))
            const doctors = localUser.doctors
            commit('adminDoctorSuccess', doctors)
            dispatch('alert/success', 'doctors Retreived', { root: true })
        },
        loadAdminOffices (
            { dispatch, commit }) {
            commit('adminOfficeRequest')
            const localUser = JSON.parse(localStorage.getItem('localUser'))
            const offices = localUser.offices
            commit('adminOfficeSuccess', offices)
            dispatch('alert/success', 'offices Retreived', { root: true })
        },

      }

}
