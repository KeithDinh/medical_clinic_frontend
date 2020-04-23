import config from '../../config'
import { responseHandler } from './response-handler'
import { userToken, authorizationHeader } from '../helpers'
const handleResponse = responseHandler.handleResponse

export const doctorAppointmentsService = {
  getDoctorAppointments
}

function getDoctorAppointments () {
  const requestOptions = {
	method: 'GET',
	headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/doctor/appointments`, requestOptions)
    .then(handleResponse)
}
