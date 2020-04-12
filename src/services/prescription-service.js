import config from 'config'
import { responseHandler } from './response-handler'
import { userToken, authorizationHeader } from '../helpers'
const handleResponse = responseHandler.handleResponse

export const prescriptionService = {
  getPrescriptions,
  putPrescription
}

function getPrescriptions () {
  const requestOptions = {
	method: 'GET',
	headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/patients/prescriptions`, requestOptions)
    .then(handleResponse)
}

function putPrescription (apptId, patientId, medicationId, doseFormId, dosage, indication, datePrescribed) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify({apptId, patientId, medicationId, doseFormId, dosage, indication, datePrescribed})
  }
  return fetch(`${config.apiUrl}/doctor/addprescription`, requestOptions)
    .then(handleResponse)
}
