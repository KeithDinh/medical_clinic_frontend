import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const doctorsService = {
  getDoctors,
  getDoctorsByOffice,
  getDoctorById
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

function getDoctorById (doctor_id) {
  const requestOptions = {
    method: 'GET'
  }
  return fetch(`${config.apiUrl}/doctor/profile?did=` + doctor_id, requestOptions)
    .then(handleResponse)
}
