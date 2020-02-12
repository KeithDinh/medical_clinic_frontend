import { quoteService } from '../services'

const initialState = {
  quotesStatus: {},
  quotesList: []
}

export const history = {
  namespaced: true,
  state: initialState,
  mutations: {
    historyRequest (state) {
      state.quotesStatus = { loadingHist: true }
    },
    historySuccess (state, quotesList) {
      state.quotesStatus = { loadedHist: true }
      state.quotesList = {...state.quotesList, ...quotesList}
    },
    historyFailure (state) {
      state.quotesStatus = {}
      state.quotesList = initialState.quotesList
    }
  },
  actions: {
    getQuoteHistory (
      { dispatch, commit, rootGetters }) {
      commit('historyRequest')
      quoteService
        .getHistory()
        .then(
          response => {
            const quotes = JSON.parse(response.quotes)
            commit('historySuccess', quotes)
            dispatch('alert/success', 'History Retreived', { root: true })
          }
        )
    }
  }
}
