import { quoteService } from '../services'

const initialState = {
  quoteStatus: {},
  quoteForm: {
    deliveryDate: '',
    gallons: '',
    price: '',
    quote_id: '',
    requestDate: '',
    total: ''
  }
}

// Validate the Quote Form
const validateQuote = (gallons, deliveryDate) => {
  // string of date user is requesting
  var myDate = String(deliveryDate)
  // check if needs formatting
  if (myDate.length > 10) {
    myDate = formatDate(myDate)
  }
  // array of month, day, year
  var dateArr = myDate.split('/')
  var reqMonth = parseInt(dateArr[0], 10)
  var reqDay = parseInt(dateArr[1], 10)
  var reqYear = parseInt(dateArr[2], 10)
  // today's date for checking against past dates
  var today = new Date()
  var dd = parseInt(String(today.getDate()).padStart(2, '0'), 10)
  var mm = parseInt(String(today.getMonth() + 1).padStart(2, '0'), 10)
  var yyyy = parseInt(today.getFullYear(), 10)
  let errors = []
  if (!gallons) {
    errors.push(new Error('Gallons required'))
  }
  if (!deliveryDate) {
    errors.push(new Error('Date required'))
  } else {
    if (reqYear < yyyy) {
      errors.push(new Error('Past dates not allowed'))
    } else if (reqMonth < mm && reqYear === yyyy) {
      errors.push(new Error('Past dates not allowed'))
    } else if (reqDay < dd && reqMonth <= mm && reqYear === yyyy) {
      errors.push(new Error('Past dates not allowed'))
    }
  }
  return errors
}

// Format the Date
const formatDate = (deliveryDate) => {
  deliveryDate = String(deliveryDate)
  var dateArr = deliveryDate.split(' ')
  var month = dateArr[1]
  var day = dateArr[2]
  var year = dateArr[3]
  if (month === 'Jan') {
    month = '01'
  } else if (month === 'Feb') {
    month = '02'
  } else if (month === 'Mar') {
    month = '03'
  } else if (month === 'Apr') {
    month = '04'
  } else if (month === 'May') {
    month = '05'
  } else if (month === 'Jun') {
    month = '06'
  } else if (month === 'Jul') {
    month = '07'
  } else if (month === 'Aug') {
    month = '08'
  } else if (month === 'Sep') {
    month = '09'
  } else if (month === 'Oct') {
    month = '10'
  } else if (month === 'Nov') {
    month = '11'
  } else if (month === 'Dec') {
    month = '12'
  } else {
    month = '00'
  }
  return month + '/' + day + '/' + year
}

export const quote = {
  namespaced: true,
  state: initialState,
  mutations: {
    newPriceRequest (state, quoteForm) {
      state.quoteStatus = { loadingQuote: true }
      state.quoteForm = quoteForm
    },
    newPriceSuccess (state, quoteForm) {
      state.quoteStatus = { loadedQuote: true }
      state.quoteForm = { ...state.quoteForm, ...quoteForm }
    },
    newPriceFailure (state) {
      state.quoteStatus = {}
      state.quoteForm = initialState.quoteForm
    },
    newQuoteRequest (state, quoteForm) {
      state.quoteStatus = { loadingQuote: true }
      quoteForm = { ...state.quoteForm, ...quoteForm }
    },
    newQuoteSuccess (state, quoteForm) {
      state.quoteStatus = { loadedQuote: true }
      state.quoteForm = { ...state.quoteForm, ...quoteForm }
    },
    newQuoteFailure (state) {
      state.quoteStatus = {}
      state.quoteForm = initialState.quoteForm
    }
  },
  actions: {
    getPrice ({ dispatch, commit, rootGetters }, { gallons, deliveryDate }) {
      let errors = validateQuote(gallons, deliveryDate)
      if (errors.length === 0) {
        deliveryDate = formatDate(deliveryDate)
        commit('newPriceRequest', {
          gallons,
          deliveryDate
        })
        quoteService
          .requestPrice(gallons, deliveryDate)
          .then(
            response => {
              const quoteForm = response
              commit('newPriceSuccess', quoteForm)
              dispatch('alert/success', 'Price Retrieved', { root: true })
            },
            error => {
              commit('newPriceFailure')
              dispatch('alert/failure', error, { root: true })
            }
          )
      } else {
        commit('newPriceFailure')
        dispatch('alert/error', errors, { root: true })
      }
    },
    newQuote ({ dispatch, commit, rootGetters }, { gallons, deliveryDate }) {
      let errors = validateQuote(gallons, deliveryDate)
      if (errors.length === 0) {
        let myDate = String(deliveryDate)
        if (myDate.length > 10) {
          deliveryDate = formatDate(deliveryDate)
        }
        commit('newQuoteRequest', {
          gallons,
          deliveryDate
        })
        quoteService
          .requestQuote(gallons, deliveryDate)
          .then(
            response => {
              const quoteForm = response
              commit('newQuoteSuccess', quoteForm)
              dispatch('alert/success', 'Quote Retrieved', { root: true })
              dispatch('history/getQuoteHistory', null, {root: true})
            },
            error => {
              commit('newQuoteFailure')
              dispatch('alert/failure', error, { root: true })
            }
          )
      } else {
        commit('newQuoteFailure')
        dispatch('alert/error', errors, { root: true })
      }
    }
  }
}
