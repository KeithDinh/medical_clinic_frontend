import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const doctorsService = {
  getDoctors
}

function getDoctors () {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/doctors/list`, requestOptions)
    .then(handleResponse)
}
