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
  doctorsList: [],
  doctorMedsStatus:{},
  doctorMedsList:[],
  specializationStatus: {},
  specializationList: []
}

// Validate the Profile Form
const validateProfile = doctorProfile => {
  const {
    firstName,
    middleInit,
    lastName,
    street,
    city,
    state,
    zipcode,
    phone,
    dob,
    gender,
    specialist,
    race
  } = doctorProfile
  let errors = []
  if (!firstName) {
    errors.push(new Error('First name required.'))
  }
  if (!lastName) {
    errors.push(new Error('Last name required.'))
  }
  if (!street) {
    errors.push(new Error('Street address required.'))
  }
  if (!city) {
    errors.push(new Error('city required.'))
  }
  if (!state) {
    errors.push(new Error('State required.'))
  }
  if (!zipcode) {
    errors.push(new Error('Zipcode required.'))
  }
  if (!phone) {
    errors.push(new Error('Phone number required.'))
  }
  if (!dob) {
    errors.push(new Error('Date of birth required.'))
  }
  if (!gender) {
    errors.push(new Error('Gender required.'))
  }
  if (!specialist) {
    errors.push(new Error('Specialization required.'))
  }
  if (!race) {
    errors.push(new Error('Race required.'))
  }
  return errors
}

const checkComplete = (doctorProfile) => {
  let complete = true
  for (let [key, value] of Object.entries(doctorProfile)) {
    if (key !== 'middleInit' && value.length === 0) {
      complete = false
    }
  }
  return complete
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
    updateDoctorProfileRequest (state, submittedProfile) {
      state.doctorProfileStatus = { updatingProfile: true }
      state.doctorProfile = submittedProfile
    },
    updateDoctorProfileSuccess (state, returnedProfile) {
      state.doctorProfileStatus = {
        updatedProfile: true,
      }
      state.doctorProfile = returnedProfile
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
    createProfileRequest (state, submittedProfile) {
      state.doctorProfileStatus = { creatingProfile: true }
      state.doctorProfile = submittedProfile
    },
    createProfileSuccess (state, returnedProfile) {
      state.doctorProfileStatus = {
        createdProfile: true,
        profileComplete: checkComplete(doctorProfile)
      }
      state.doctorProfile = returnedProfile
    },
    createProfileFailure (state) {
      state.doctorProfileStatus = { createProfileFailure: true }
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
      commit('updateDoctorProfileRequest', doctorProfile) 
        doctorService.putDoctor(doctorProfile).then(
          response => {
            commit('updateDoctorProfileSuccess', doctorProfile)
            dispatch('alert/success', 'Profile Updated', { root: true })
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

    createDoctorProfile ({ dispatch, commit }, doctorProfile) {
      commit('createProfileRequest', doctorProfile)
      const validationErrors = validateProfile(doctorProfile)
      if (validationErrors.length > 0) {
        commit('createProfileFailure')
        dispatch('alert/error', validationErrors, { root: true })
      } else {
        doctorService.postProfile(doctorProfile).then(
          response => {
            commit('createProfileSuccess', response.profile)
            router.push('/doctor-dashboard')
            dispatch('alert/success', 'Profile Created', { root: true })
          },
          error => {
            commit('createProfileFailure')
            dispatch('alert/error', error, { root: true })
          }
        )
      }
    },
  }
}
