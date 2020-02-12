export function authorizationHeader () {
  let localUser = JSON.parse(localStorage.getItem('localUser'))
  if (localUser && localUser.access_token) {
    return {'Authorization': 'Bearer ' + localUser.access_token}
  } else {
    return {}
  }
}
