import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const doctorsService = {
  getDoctors,
  getDoctorsByOffice
}

function getDoctors () {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/doctors/list`, requestOptions)
    .then(handleResponse)
}

function getDoctorsByOffice (office_id) {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/doctors/office?oid=` + office_id, requestOptions)
    .then(handleResponse)
}
