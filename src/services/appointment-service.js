import config from 'config'
import { responseHandler } from './response-handler'
import { userToken, authorizationHeader } from '../helpers'
const handleResponse = responseHandler.handleResponse

export const appointmentService = {
  postAppointment,
  getAppointments,
  cancelAppointment,
  deleteAppointment,
  getAdminAppointments,
  finishAppointment
}

function postAppointment (doctor, office, refDoctor, date, timeslot, reason, bookingMethod) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + userToken(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ doctor, office, refDoctor, date, timeslot, reason, bookingMethod })
  }
  return fetch(`${config.apiUrl}/patients/appointment`, requestOptions)
    .then(handleResponse)
}

function getAppointments () {
  const requestOptions = {
	method: 'GET',
	headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/patients/appointment`, requestOptions)
    .then(handleResponse)
}

function getAdminAppointments () {
  const requestOptions = {
  method: 'GET',
  headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/admin/appointments`, requestOptions)
    .then(handleResponse)
}

function cancelAppointment (appt_id) {
  let reqHeader = authorizationHeader()
    reqHeader['Content-Type'] = 'application/json'
    const requestOptions = {
      method: 'POST',
      headers: reqHeader,
      body: JSON.stringify({"appt_id":appt_id})
    }
    return fetch(`${config.apiUrl}/patient/cancel/appointment`, requestOptions)
      .then(handleResponse)

  }

function deleteAppointment (appt_id) {
  let reqHeader = authorizationHeader()
    reqHeader['Content-Type'] = 'application/json'
    const requestOptions = {
      method: 'POST',
      headers: reqHeader,
      body: JSON.stringify({"appt_id":appt_id})
    }
    return fetch(`${config.apiUrl}/admin/delete/appointment`, requestOptions)
      .then(handleResponse)

  }

  function finishAppointment (appt_id,appt_end_time) {
  let reqHeader = authorizationHeader()
    reqHeader['Content-Type'] = 'application/json'
    const requestOptions = {
      method: 'PUT',
      headers: reqHeader,
      body: JSON.stringify({"appt_id":appt_id,"appt_end_time":appt_end_time})
    }
    return fetch(`${config.apiUrl}/doctor/finish/appointment`, requestOptions)
      .then(handleResponse)
  }
