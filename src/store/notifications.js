import {recordsService} from '../services'
import { router } from '../router'

const initialState = {
  messagesStatus: {},
  messagesList: [],
}

export const notifications = {
  namespaced: true,
  state: initialState,
  mutations: {
    loadMessagesRequest (state) {
      state.messagesStatus = { loadingMessages: true }
    },
    loadMessagesSuccess (state, messages) {
      state.messagesStatus = { loadedMessages: true }
      state.messagesList = messages
    },
    loadMessagesFailure (state) {
      state.messagesStatus = { loadingMessagesFailure: true }
    },
  },
  actions: {
    receiveMessages (
      { dispatch, commit }, messages) {
      commit('loadMessagesSuccess', messages)
    },
    loadMessages(
      { dispatch, commit }) {
      commit('loadMessagesRequest')
      const patient = JSON.parse(localStorage.getItem('patient'))
      commit('loadMessagesSuccess', patient.messages)
    },
  }

}

