export const alert = {
  namespaced: true,
  state: {
    type: null,
    messages: null
  },
  actions: {
    success ({ commit }, messages) {
      commit('success', messages)
    },
    error ({ commit }, messages) {
      commit('error', messages)
    },
    clear ({ commit }, messages) {
      commit('success', messages)
    }
  },
  mutations: {
    success (state, messages) {
      state.type = 'alert-success'
      state.messages = messages
    },
    error (state, messages) {
      state.type = 'alert-danger'
      state.messages = messages
    },
    clear (state) {
      state.type = null
      state.messages = null
    }
  }
}
