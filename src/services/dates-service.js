import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const datesService = {
  getDates
}

function getDates (office_id, doctor_id) {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/doctors/dates?did=` + doctor_id + `&oid=` + office_id, requestOptions)
    .then(handleResponse)
}
