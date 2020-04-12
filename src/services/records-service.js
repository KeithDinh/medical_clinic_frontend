import config from 'config'
import { responseHandler } from './response-handler'
import { userToken, authorizationHeader } from '../helpers'
const handleResponse = responseHandler.handleResponse

export const recordsService = {
  getMedicalRecords
}

function getMedicalRecords () {
  const requestOptions = {
	method: 'GET',
	headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/patients/records`, requestOptions)
    .then(handleResponse)
}

function putRecord (apptId, patientId, height, weight,diagnoses,labTesting, treatment,newPrescriptions, actualStartTime, actualEndTime) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify({apptId, patientId, height, weight,diagnoses,labTesting, treatment,newPrescriptions, actualStartTime, actualEndTime})
  }
  alert("start to send request")
  return fetch(`${config.apiUrl}/doctor/addrecord`, requestOptions)
    .then(handleResponse)
}
