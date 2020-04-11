import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const deleteAppointmentService = {
  deleteAppointment
}


function deleteAppointment (appt_id) {
    const requestOptions = {
      method: 'DELETE',
      headers: authorizationHeader()
    }
    return fetch(`${config.apiUrl}/patient/deleteappointment?aid=` + appt_id, requestOptions)
      .then(handleResponse)
      
  }

