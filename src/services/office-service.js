import config from 'config'
import { authorizationHeader, userToken } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const officeService = {
  getOffices,
  getOfficesByDoctor,
  putOffice,
}


function getOffices(){
    const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }// FIX THIS ENDPOINT
  return fetch(`${config.apiUrl}/offices/list`, requestOptions)
    .then(handleResponse)
}

function getOfficesByDoctor (doctor_id) {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/offices/doctor?did=` + doctor_id, requestOptions)
    .then(handleResponse)
}

function putOffice (updateOfficePayload) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + userToken(), 'Content-Type': 'application/json' },
    body: JSON.stringify(updateOfficePayload)
  }
  return fetch(`${config.apiUrl}/office/updateoffice`, requestOptions)
    .then(handleResponse)
}
