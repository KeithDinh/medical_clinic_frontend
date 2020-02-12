import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const quoteService = {
  requestPrice,
  requestQuote,
  getHistory
}

function requestPrice (gallons, deliveryDate) {
  let localUser = JSON.parse(localStorage.getItem('localUser'))
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localUser.access_token
    },
    body: JSON.stringify({gallons, deliveryDate})
  }
  return fetch(`${config.apiUrl}/price`, requestOptions).then(
    handleResponse
  )
}

function requestQuote (gallons, deliveryDate) {
  let localUser = JSON.parse(localStorage.getItem('localUser'))
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localUser.access_token
    },
    body: JSON.stringify({gallons, deliveryDate})
  }
  return fetch(`${config.apiUrl}/quote`, requestOptions).then(
    handleResponse
  )
}

function getHistory () {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/quote/history`, requestOptions).then(
    handleResponse
  )
}
