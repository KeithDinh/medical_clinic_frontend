import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const datesService = {
  getDates
}

function getDates () {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/doctors/dates`, requestOptions)
    .then(handleResponse)
}
