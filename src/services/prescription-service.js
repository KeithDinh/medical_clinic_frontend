import config from 'config'
import { responseHandler } from './response-handler'
import { userToken, authorizationHeader } from '../helpers'
const handleResponse = responseHandler.handleResponse

export const prescriptionService = {
  getPrescriptions
}

function getPrescriptions () {
  const requestOptions = {
	method: 'GET',
	headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/patients/prescriptions`, requestOptions)
    .then(handleResponse)
}
