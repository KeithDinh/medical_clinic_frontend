import config from 'config'
import { responseHandler } from './response-handler'
import { userToken, authorizationHeader } from '../helpers'
const handleResponse = responseHandler.handleResponse

export const prescriptionService = {
  getPrescriptions,
  addPrescription,
  updatePrescription,
  getMedications
}

function getPrescriptions (patient_id) {
  const requestOptions = {
	method: 'GET',
	headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/patients/prescriptions?patient_id=` + patient_id, requestOptions)
    .then(handleResponse)
}

function addPrescription (apptId, patientId, medicationId, doseFormId, dosage, indication, datePrescribed) {
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

function updatePrescription (updateRxPayload) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'PUT',
    headers: reqHeader,
    body: JSON.stringify(updateRxPayload)
  }
  return fetch(`${config.apiUrl}/patients/updateprescription`, requestOptions)
    .then(handleResponse)
}

function getMedications(){
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'GET',
    headers: reqHeader,
  }
  return fetch(`${config.apiUrl}/medications`, requestOptions).then(handleResponse)
}
