import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const officeService = {
  getOffices,
  getOfficesByDoctor
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
