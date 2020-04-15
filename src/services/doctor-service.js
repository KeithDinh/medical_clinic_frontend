import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const doctorService = {
  getDoctor,
  getDoctorData,
  getDoctors,
  getDoctorsByOffice,
  updateDoctorProfile,
  getSpecialization,
  postDoctor,
  getDoctorForAppointment,
  approveSpecialistAppt,
  getPhysician
}

function getPhysician () {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/doctor/physician/list`, requestOptions)
    .then(handleResponse)
}

function postDoctor (profile) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify(profile)
  }
  return fetch(`${config.apiUrl}/doctor/data`, requestOptions)
    .then(handleResponse)
}

function getSpecialization () {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/doctor/specialization`, requestOptions)
    .then(handleResponse)
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
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/doctor/data`, requestOptions)
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

function updateDoctorProfile (updateDoctorPayload) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'PUT',
    headers: reqHeader,
    body: JSON.stringify(updateDoctorPayload)
  }
  return fetch(`${config.apiUrl}/doctor/updatedoctor`, requestOptions)
    .then(handleResponse)
}

function getDoctorForAppointment () {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/appointment/doctor/list`, requestOptions)
    .then(handleResponse)
}

function approveSpecialistAppt (appt_id) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'PUT',
    headers: reqHeader,
    body: JSON.stringify({appt_id})
  }
  return fetch(`${config.apiUrl}/doctor/approveappt`, requestOptions)
    .then(handleResponse)
}
