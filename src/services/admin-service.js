import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const adminService = {
  getAdmin,
  getDoctor
}

function getAdmin () {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/admin/profile`, requestOptions)
    .then(handleResponse)
}

function getDoctor (doctor_id) {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/admin/doctor/data?did=` + doctor_id, requestOptions)
    .then(handleResponse)
    .then(doctor => {
      localStorage.setItem('doctor', JSON.stringify(doctor))
      return doctor
    })
}
