import config from 'config'
import { responseHandler } from './response-handler'
import { userToken, authorizationHeader } from '../helpers'
const handleResponse = responseHandler.handleResponse

export const prescriptionService = {
  getPrescriptions,
  putPrescription
}

function getPrescriptions () {
  const requestOptions = {
	method: 'GET',
	headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/patients/prescriptions`, requestOptions)
    .then(handleResponse)
}

function putPrescription (prescription) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'PUT',
    headers: reqHeader,
    body: JSON.stringify(prescription)
  }
  return fetch(`${config.apiUrl}/doctor/addprescription`, requestOptions)
    .then(handleResponse)
}
