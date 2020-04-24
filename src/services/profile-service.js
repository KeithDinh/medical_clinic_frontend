import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const profileService = {
  getProfile,
  postProfile,
  putProfile,
  updatePatientProfile
}

function updatePatientProfile (updatePatientPayload) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'PUT',
    headers: reqHeader,
    body: JSON.stringify(updatePatientPayload)
  }
  return fetch(`${config.apiUrl}/patient/updatepatient`, requestOptions)
    .then(handleResponse)
}

function getProfile (patient_id) {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/patients/profile?pid=` + patient_id, requestOptions)
    .then(handleResponse)
    .then(patient => {
      localStorage.setItem('patient', JSON.stringify(patient))
      return patient
    })
}

function postProfile (profile) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify(profile)
  }
  return fetch(`${config.apiUrl}/patients/profile`, requestOptions)
    .then(handleResponse)
}

function putProfile (profile) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'PUT',
    headers: reqHeader,
    body: JSON.stringify(profile)
  }
  return fetch(`${config.apiUrl}/doctor/updatedoctor`, requestOptions)
    .then(handleResponse)
}
