import config from 'config'
import { authorizationHeader } from '../helpers'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const profileService = {
  getProfile,
  postProfile,
  putProfile
}

function getProfile () {
  const requestOptions = {
    method: 'GET',
    headers: authorizationHeader()
  }
  return fetch(`${config.apiUrl}/clients/profile`, requestOptions)
    .then(handleResponse)
}

function postProfile (profile) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify(profile)
  }
  return fetch(`${config.apiUrl}/clients/profile`, requestOptions)
    .then(handleResponse)
}

function putProfile (profile) {
  let reqHeader = authorizationHeader()
  reqHeader['Content-Type'] = 'application/json'
  const requestOptions = {
    method: 'PUT',
    headers: reqHeader,
    body: JSON.stringify(profile)
  }
  return fetch(`${config.apiUrl}/clients/profile`, requestOptions)
    .then(handleResponse)
}
