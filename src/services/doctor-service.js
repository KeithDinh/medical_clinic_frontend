import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const doctorService = {
  getDoctor
}

function getDoctor (doctor_id) {
  const requestOptions = {
    method: 'GET'
  }
  return fetch(`${config.apiUrl}/doctor/profile?did=` + doctor_id, requestOptions)
    .then(handleResponse)
    .then(doctor => {
      localStorage.setItem('doctor', JSON.stringify(doctor))
      alert(doctor)
      return doctor
    })
}
