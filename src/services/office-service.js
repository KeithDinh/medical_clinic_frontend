import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const officeService = {
  getOffices,
  getOfficesByDoctor,
  putOffice,
  getOffice
}

function getOffice(office_id){
  const requestOptions = {
  method: 'GET',
  headers: authorizationHeader()
}
return fetch(`${config.apiUrl}/offices/office?oid=` + office_id, requestOptions)
  .then(handleResponse)
}

function getOffices(){
    const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }// FIX THIS ENDPOINT
  return fetch(`${config.apiUrl}/offices/list`, requestOptions)
    .then(handleResponse)
}

function getOfficesByDoctor (doctor_id) {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/offices/doctor?did=` + doctor_id, requestOptions)
    .then(handleResponse)
}

function putOffice (updateOfficePayload) {
  alert(updateOfficePayload)
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'PUT',
    headers: reqHeader,
    body: JSON.stringify(updateOfficePayload)
  }
  return fetch(`${config.apiUrl}/office/updateoffice`, requestOptions)
    .then(handleResponse)
}
// # {
// 	# 	"payload":{
// 	# 		"oid": id,
// 	# 		"oname": "name",
// 	# 		"address": "main street",
// 	# 		"city": "HT",
// 	# 		"state": "TX",
// 	# 		"zipcode": "23422",
// 	# 		"phone": "29329383838"
// 	# 	}
// 	# }
