import { adminService, appointmentService } from '../services'
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
  offices:{},
  reportStatus: {},
  reports: {},
  reportInformation:{}
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
    deleteApptRequest (state) {
      state.apptStatus = { deletingAppt: true }
    },
    deleteApptSuccess (state){
      state.apptStatus = { deleteAppt: true }
    },
    deleteApptFailure(state) {
      state.apptStatus = { deleteApptFailure: true }
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
    },
    reportRequest (state) {
      state.reportStatus = { requestingReport: true }
    },
    reportSuccess (state, report){
      state.reportStatus = { reportSuccess: true }
      state.reports = report
    },
    reportFailure(state) {
      state.reportStatus = { reportFailure: true }
    },
    reportInformationSuccess (state, report){
      state.reportInformation = report
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
      deleteAppointment (
        { dispatch, commit }, appt_id) {
        commit('deleteApptRequest')
        appointmentService.deleteAppointment(appt_id)
          .then(
            response => {
              const apptDeleteStatus = response.msg
              commit('deleteApptSuccess', apptDeleteStatus)
              dispatch('alert/success', 'Deleted Appointment', { root: true })
              commit('adminApptRequest')
              appointmentService.getAdminAppointments().then(
                response => {
                  var localUser = JSON.parse(localStorage.getItem('localUser'))
                  localUser['appointments'] = response.appointments
                  localStorage.setItem('localUser', JSON.stringify(localUser))
                  commit('adminApptSuccess', response.appointments)
                })
            },
            error => {
              commit('deleteApptFailure')
              dispatch('alert/error', error, { root: true })
            }
          )
      },
      cancelAppointment (
        { dispatch, commit }, appt_id) {
        commit('cancelApptRequest')
        appointmentService.cancelAppointment(appt_id)
          .then(
            response => {
              const apptCancelStatus = response.msg
              alert(response.msg)
              commit('cancelApptSuccess', apptCancelStatus)
              dispatch('alert/success', 'Canceled Appointment', { root: true })
              commit('adminApptRequest')
              appointmentService.getAdminAppointments().then(
                response => {
                  var localUser = JSON.parse(localStorage.getItem('localUser'))
                  localUser['appointments'] = response.appointments
                  localStorage.setItem('localUser', JSON.stringify(localUser))
                  commit('adminApptSuccess', response.appointments)
                })
            },
            error => {
              commit('cancelApptFailure')
              dispatch('alert/error', error, { root: true })
            }
          )
      },
      loadUserReport (
          { dispatch, commit }, {reportType,firstDate, secondDate, roleId}) {
          commit('reportRequest')

          adminService.getUserReport(reportType,firstDate, secondDate, roleId).then(
            response => {
              commit('reportSuccess', response.report)
              commit('reportInformationSuccess', response.information)
              dispatch('alert/success', 'Report Retreived', { root: true })
            },
            error => {
              commit('reportFailure')
            })
      },
      loadReport (
        { dispatch, commit }, {reportType, patient, doctor, office,start,end}) {
        commit('reportRequest')
        adminService.getReport(reportType, patient, doctor, office,start,end).then(
          response => {
            commit('reportSuccess', response.report)
            dispatch('alert/success', 'Report Retreived', { root: true })
          },
          error => {
            commit('reportFailure')
          })
      }
  }
}
