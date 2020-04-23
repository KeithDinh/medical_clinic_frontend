import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const adminService = {
  getAdmin,
  getDoctor,
  getReport,
  getUserReport
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

function getReport (reportType, patient, doctor, office,start,end) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify({reportType, patient, doctor, office,start,end})
  }
  return fetch(`${config.apiUrl}/admin/reports`, requestOptions)
    .then(handleResponse)
}

function getUserReport (reportType,firstDate, secondDate, roleId) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify({reportType,firstDate, secondDate, roleId})
  }
  return fetch(`${config.apiUrl}/admin/reports`, requestOptions)
    .then(handleResponse)
}
