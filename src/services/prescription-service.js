import config from 'config'
import { responseHandler } from './response-handler'
import { userToken, authorizationHeader } from '../helpers'
const handleResponse = responseHandler.handleResponse

export const prescriptionService = {
  getPrescriptions,
  addPrescription
}

function getPrescriptions () {
  const requestOptions = {
	method: 'GET',
	headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/patients/prescriptions`, requestOptions)
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
    headers: { 'Authorization': 'Bearer ' + userToken(), 'Content-Type': 'application/json' },
    body: JSON.stringify(updateRxPayload)
  }
  alert("alert something plzzzzzzzzzz")
  return fetch(`${config.apiUrl}/patients/updateprescription`, updateRxPayload)
    .then(handleResponse)
}

// NEED GET MEDICATIONS TO SUBSTITUTE THE medication_names IN PrescriptionUpdate.VUE
