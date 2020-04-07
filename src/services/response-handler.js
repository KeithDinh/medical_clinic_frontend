import { userService } from '../services'
import { router } from '../router'

export const responseHandler = {
  handleResponse
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      if (error === "UNAUTHORIZED") {
      	router.push('/login')
      }
      return Promise.reject(error)
    }
    return data
  })
}
    