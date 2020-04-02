// import { doctorAppointmentsService } from '../services'
import { router } from '../router'

const initialState = {
  doctorApptStatus: {},
  appointments: [],
  doctorTodayApptStatus:{},
  todayAppts:[],
  doctorPastApptStatus:{},
  pastAppts:[],
  doctorFutureApptStatus:{},
  futureAppts:[],
  doctorAllApptStatus: {},
  allAppointmentsList:{}
}

export const doctorAppointments = {
  namespaced: true,
  state: initialState,
  mutations: {
    // doctorApptRequest (state) {
    //   state.doctorApptStatus = { loadingAppts: true }
    // },
    // doctorApptSuccess (state, returnedAppts) {
    //   state.doctorApptStatus = { loadedAppts: true }
    //   state.appointments = returnedAppts
    // },
    // doctorTodayApptRequest (state) {
    //   state.doctorTodayApptStatus = { loadingTodayAppts: true }
    // },
    // doctorTodayApptSuccess (state, returnedTodayAppts) {
    //   state.doctorApptStatus = { loadedTodayAppts: true }
    //   state.todayAppts = returnedTodayAppts
    // },
    // doctorFutureApptRequest (state) {
    //   state.doctorFutureApptStatus = { loadingFutureAppts: true }
    // },
    // doctorFutureApptSuccess (state, returnedFutureAppts) {
    //   state.doctorFutureApptStatus = { loadedFutureAppts: true }
    //   state.futureAppts = returnedFutureAppts
    //    console.log(state.futureAppts)
    // },
    // doctorPastApptStatus (state) {
    //   state.doctorPastApptStatus= { loadingPastAppts: true }
    // },
    // doctorPastApptSuccess (state, returnedPastAppts) {
    //   state.doctorPastApptStatus = { loadedPastAppts: true }
    //   state.pastAppts = returnedPastAppts
    //    console.log(state.pastAppts)
    // },

       doctorAllApptRequest (state) {
      state.doctorAllApptStatus = { loadingAllAppts: true }
    },
    doctorAllApptSuccess (state, returnedAllAppts) {
      state.doctorAllApptStatus = { loadedAllAppts: true }
      state.allAppointmentsList = returnedAllAppts
      console.log(state.allAppointmentsList)
    },


  },
  actions: {

    // loadDoctorAppointments (
    //   { dispatch, commit }) {
    //   commit('doctorApptRequest')
    //    const localUser = JSON.parse(localStorage.getItem('localUser'))
    //   console.log(localUser)
    //   commit('doctorApptSuccess', localUser.appointments)
    //   commit('doctorTodayApptRequest')
    //   commit('doctorTodayApptSuccess', localUser.todayAppts)
    //   commit('doctorFutureApptRequest')
    //   commit('doctorFutureApptSuccess',localUser.futureAppts)
    //   commit('doctorPastApptRequest')
    //   commit('doctorPastApptSuccess',localUser.pastAppts)
    //
    //
    //   doctorAppointmentsService.getDoctorAppointments()
    //     .then(
    //       response => {
    //         const appts = response.appointments
    //         const todayAppts = response.todayAppointments
    //         const futureAppts = response.futureAppointments
    //         const pastAppts = response.pastAppointments
    //         commit('doctorApptSuccess', appts)
    //         dispatch('alert/success', 'appointments Retreived', { root: true })
    //         commit('doctorTodayApptSuccess', todayAppts)
    //         dispatch('alert/success', 'today appointments Retreived', { root: true })
    //          commit('doctorFutureApptSuccess', futureAppts)
    //         dispatch('alert/success', 'future appointments Retreived', { root: true })
    //          commit('doctorPastApptSuccess', pastAppts)
    //         dispatch('alert/success', 'past appointments Retreived', { root: true })
    //
    //       }
    //     )
    // }

    loadDoctorAppointments (
      { dispatch, commit }) {
      commit('loadAllApptsRequest')
      const localUser = JSON.parse(localStorage.getItem('localUser'))
      commit('loadALlApptsSuccess', localUser.appointments)
    }
  }
}
