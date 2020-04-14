import { doctorService, adminService } from '../services'
import { router } from '../router'

const initialState = {
  doctorProfileStatus: {},
  doctorProfile: {},
  doctorPatientStatus: {},
  patients: {},
  doctorApptStatus: {},
  doctorAppointmentsList:{},
  doctorsStatus: {},
  doctorsList: [],
  doctorMedsStatus:{},
  doctorMedsList:[],
  specializationStatus: {},
  specializationList: []
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
    },
    doctorMedsRequest (state) {
      state.doctorMedStatus = { loadingMeds: true }
    },
    doctorMedsSuccess (state, returnedMeds) {
      state.doctorMedsStatus = { loadedMeds: true }
      state.doctorMedsList = returnedMeds
    },
    doctorMedsFailure (state) {
      state.doctorMedsStatus = { medsFailure: true }
    },
    updateDoctorProfileRequest (state) {
      state.doctorProfileStatus = { updatingProfile: true }
    },
    updateDoctorProfileSuccess (state, returnedProfile) {
      state.doctorProfileStatus = {
        updatedProfile: true,
      }
    },
    updateDoctorProfileFailure (state) {
      state.doctorProfileStatus = { updateProfileFailure: true }
    },
    specializationRequest (state) {
      state.specializationStatus = { loadingspecialization: true }
    },
    specializationSuccess (state, specialization) {
      state.specializationStatus = { loadedSpecialization: true }
      state.specializationList = specialization
    },
    specializationFailure (state) {
      state.specializationStatus = { specializationFailure: true }
    },
    approveApptRequest (state) {
      state.doctorApptStatus = { approvingAppt: true }
    },
    approveApptSuccess (state,appts){
      state.doctorApptStatus = { approvingAppt: true }
      state.doctorAppointmentsList = appts
    },
    approveApptFailure(state) {
      state.doctorApptStatus = { approvingApptFailure: true }
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
      commit('doctorProfileRequest')
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
    loadDoctorAppointment (
      { dispatch, commit }) {
      commit('doctorsRequest')
      doctorService.getDoctorForAppointment()
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
    loadPhysician (
      { dispatch, commit }) {
      commit('doctorsRequest')
      doctorService.getPhysician()
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
    },
    loadDoctorMedications (
      { dispatch, commit }) {
      commit('doctorMedsRequest')
      const doctor = JSON.parse(localStorage.getItem('doctor'))
      commit('doctorMedsSuccess', doctor.medications)
      dispatch('alert/success', 'medications Retreived', { root: true })
    },
    updateProfile ({ dispatch, commit }, doctorProfile) {
      commit('updateDoctorProfileRequest')
        doctorService.updateDoctorProfile(doctorProfile).then(
          response => {
            commit('updateDoctorProfileSuccess')
            dispatch('alert/success', 'Profile Updated', { root: true })
            commit('doctorProfileRequest')
            doctorService.getDoctor(doctorProfile.doctorId).then(
              response => {
                const doctor = JSON.parse(localStorage.getItem('doctor'))
                doctor.profile = response.profile
                localStorage.setItem('doctor', JSON.stringify(doctor))
                commit('doctorProfileSuccess', response.profile)
                dispatch('alert/success', 'doctor Retreived', { root: true })
              })
          },
          error => {
            commit('updateDoctorProfileFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    },
    loadSpecializations (
      { dispatch, commit }) {
      commit('specializationRequest')
      doctorService.getSpecialization()
        .then(
          response => {
            const specializations = response.specializations
            commit('specializationSuccess', specializations)
            dispatch('alert/success', 'specializations Retreived', { root: true })
          },
          error => {
            commit('specializationFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    },
    reloadDoctor (
      { dispatch, commit }, doctor_id) {
      adminService.getDoctor(doctor_id).then(
        response => {
          router.push('/doctor-dashboard')
          return response
        })
    },
    approveAppt (
      { dispatch, commit},appt_id){
       commit('approveApptRequest')
        doctorService.approveSpecialistAppt(appt_id).then(
          response => {
            commit('approveApptSuccess')
            dispatch('alert/success', 'approve appt success', { root: true })
            commit('doctorProfileRequest')
             const localUser = JSON.parse(localStorage.getItem('localUser'))
            alert(localUser.doctor_id)
           doctorService.getDoctorData(localUser.doctor_id).then(
              response => {
                const doctor = JSON.parse(localStorage.getItem('doctor'))
                doctor.profile = response.profile
                localStorage.setItem('doctor', JSON.stringify(doctor))
                console.log(JSON.stringify(doctor))
                commit('doctorProfileSuccess', response.profile)
                dispatch('alert/success', 'doctor Retreived', { root: true })
              })
          },
          error => {
            commit('approveApptFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
    }
  }
}
