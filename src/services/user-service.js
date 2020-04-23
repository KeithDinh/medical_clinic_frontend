import config from '../../config'
import { responseHandler } from './response-handler'
const handleResponse = responseHandler.handleResponse

export const userService = {
  login,
  logout,
  register,
  registerDoctor
}

function login (email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }
  return fetch(`${config.apiUrl}/patients/authenticate`, requestOptions)
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
  localStorage.removeItem('patient')
  localStorage.removeItem('doctor')
}
// Format the Date
function formatDate (birthdate) {
  let dob = birthdate.toString()
  var dateArr = dob.split(' ')
  var month = dateArr[1]
  var day = dateArr[2]
  var year = dateArr[3]
  if (month === 'Jan') {
    month = '01'
  } else if (month === 'Feb') {
    month = '02'
  } else if (month === 'Mar') {
    month = '03'
  } else if (month === 'Apr') {
    month = '04'
  } else if (month === 'May') {
    month = '05'
  } else if (month === 'Jun') {
    month = '06'
  } else if (month === 'Jul') {
    month = '07'
  } else if (month === 'Aug') {
    month = '08'
  } else if (month === 'Sep') {
    month = '09'
  } else if (month === 'Oct') {
    month = '10'
  } else if (month === 'Nov') {
    month = '11'
  } else if (month === 'Dec') {
    month = '12'
  } else {
    month = '00'
  }
  return year + '-' + month + '-' + day
}

function register (email, password, firstName, middleInit, lastName, street, city, state, zipcode, phone, dob, gender, marital, race) {
  dob = formatDate(dob)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, middleInit, lastName, street, city, state, zipcode, phone, dob, gender, marital, race })
  }
  return fetch(`${config.apiUrl}/patients/register`, requestOptions)
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

function registerDoctor (firstName, middleInit, lastName,phone, specialistId,gender,email,password, race,dob, street, city, state, zipcode, image ) {
  dob = formatDate(dob)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, middleInit, lastName,phone, specialistId,gender,email,password, race,dob, street, city, state, zipcode, image })
  }
  return fetch(`${config.apiUrl}/doctors/register`, requestOptions)
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
