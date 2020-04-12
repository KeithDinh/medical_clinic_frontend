import {appointmentService, prescriptionService, profileService, userService} from '../services'
import { router } from '../router'
import {doctor} from "./doctor";

const initialState = {
  messageStatus: {},
  messageList: [],
}

export const notification = {
  namespaced: true,
  state: initialState,
  mutations: {
    loadMessageRequest (state) {
      state.messageStatus = { loadingMessage: true }
    },
    loadMessageSuccess (state, messages) {
      state.messageStatus = { loadedMessages: true }
      state.messageList = messages
      console.log(state.messageList)
    },
    loadMessageFailure (state) {
      state.messageStatus = { loadingMessageFailure: true }
    },
    receiveMessage (state, messages) {
      state.messageStatus = { loadedRx: true }
      state.messageList = messages
    }
  },
  actions: {
    loadNotification ({ dispatch, commit,state}) {
      commit('loadMessageRequest')
      const patient = JSON.parse(localStorage.getItem('patient'))
      commit('loadMessageSuccess', patient.messages)
    },
  }
}

