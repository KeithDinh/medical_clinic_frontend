import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const doctorService = {
  getDoctor,
  getDoctorData,
  getDoctors,
  getDoctorsByOffice
}

function getDoctor (doctor_id) {
  const requestOptions = {
    method: 'GET'
  }
  return fetch(`${config.apiUrl}/doctor/profile?did=` + doctor_id, requestOptions)
    .then(handleResponse)
}

function getDoctorData (doctor_id) {
  const requestOptions = {
    method: 'GET'
  }
  return fetch(`${config.apiUrl}/doctor/data?did=` + doctor_id, requestOptions)
    .then(handleResponse)
    .then(doctor => {
      localStorage.setItem('doctor', JSON.stringify(doctor))
      return doctor
    })
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