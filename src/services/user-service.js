import config from 'config'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const userService = {
  login,
  logout,
  register
}

function login (username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }
  return fetch(`${config.apiUrl}/clients/authenticate`, requestOptions)
    .then(handleResponse)
    .then(localUser => {
      // login successful if there's a jwt token in the response
      if (localUser.access_token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('localUser', JSON.stringify(localUser))
      }
      return localUser
    })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('localUser')
}

function register (username, email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  }

  return fetch(`${config.apiUrl}/clients/register`, requestOptions)
    .then(handleResponse)
    .then(localUser => {
    // Registrations is successful if a jwt token is returned
      if (localUser.access_token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('localUser', JSON.stringify(localUser))
      }
      return localUser
    })
}
