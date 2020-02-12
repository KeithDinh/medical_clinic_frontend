export function configureMockBackend () {
  let users = [
    {
      id: 1,
      username: 'alecTest',
      email: 'davila.alec@gmail.com',
      password: 'alecPass',
      firstName: 'Alec',
      lastName: 'Davila'
    },
    {
      id: 2,
      username: 'johnTest',
      email: 'djjonwert@gmail.com',
      password: 'johnPass',
      firstName: 'John',
      lastName: 'Wert',
      addressOne: '25533 Richards Rd',
      addressTwo: '',
      city: 'Spring',
      selectedState: 'TX',
      zipcode: '77386'
    },
    {
      id: 3,
      username: 'graderTest',
      email: 'coolgrader@uh.edu',
      password: 'graderPass',
      firstName: 'Grader',
      lastName: 'A Plus'
    }
  ]

  // Grabbing Fetch for Monkey Patching
  let realFetch = window.fetch

  let checkUnique = reqParams => {
    let filteredUsers = users.filter(user => {
      return (
        user.username === reqParams.username && user.email === reqParams.email
      )
    })
    return !filteredUsers.length
  }

  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // Setting Timeout to Simulate An External Serve Call which will
      // Be Implemented in Assignment III

      setTimeout(() => {
        // Begin Authentacation
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          // Setting Request Paramaters From Body
          let reqParams = JSON.parse(opts.body)

          // Checking Against Our Users and Their Credentials
          let filteredUsers = users.filter(user => {
            return (
              user.username === reqParams.username &&
              user.password === reqParams.password
            )
          })

          if (filteredUsers.length) {
            // When Validated Return a JWT Token
            let user = filteredUsers[0]
            let responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'mock-jwt-token'
            }
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson))
            })
          } else {
            // If Failed Error Object
            reject(new Error('Username or password is incorrect'))
          }

          return
        }

        // Creating Registration API
        if (url.endsWith('/users/register') && opts.method === 'POST') {
          // Setting Request Paramaters From Body
          let reqParams = JSON.parse(opts.body)
          if (
            reqParams.username &&
            reqParams.email &&
            reqParams.password
          ) {
            // Check if username or email already exists
            if (checkUnique(reqParams)) {
              let user = {
                id: Object.keys(users).length + 1,
                username: reqParams.username,
                email: reqParams.email,
                password: reqParams.password
              }

              users.push(user)

              let responseJson = {
                id: user.id,
                username: user.username,
                token: 'mock-jwt-token'
              }
              resolve({
                ok: true,
                text: () => Promise.resolve(JSON.stringify(responseJson))
              })
            } else {
              // If Failed Error Object
              if (!reqParams.username) {
                reject(new Error('Username is invalid'))
              } else if (!reqParams.email) {
                reject(new Error('Email is invalid'))
              } else if (!reqParams.password) {
                reject(new Error('Password is invalid'))
              } else {
                reject(new Error('Registration is invalid'))
              }
            }
          }
          return
        }

        // Creating Profile API
        if (url.endsWith('/users/profile')) {
          // For GET Request
          if (
            opts.headers &&
            opts.headers.Authorization === 'Bearer fake-jwt-token'
          ) {
            if (opts.body && opts.method === 'GET') {
              // checking user id against DB
              let params = JSON.parse(opts.body)
              // Checking For User in List By ID
              let filteredUsers = users.filter(user => {
                return user.id === params.id
              })
              if (filteredUsers.length) {
                let user = filteredUsers[0]
                let responseJson = {
                  id: user.id,
                  username: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  token: 'fake-jwt-token'
                }
                resolve({
                  ok: true,
                  text: () => Promise.resolve(JSON.stringify(responseJson))
                })
              } else {
                reject(new Error('User Does Not Exist'))
              }
            } else if (opts.body && opts.method === 'PATCH') {
              // checking user id against DB
              let params = JSON.parse(opts.body)
              // Checking For User in List By ID
              let filteredUsers = users.filter(user => {
                return user.id === params.id
              })
              if (filteredUsers.length) {
                let user = filteredUsers[0]
                user = { ...user, ...params }
                let responseJson = {
                  id: user.id,
                  username: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  token: 'fake-jwt-token',
                  addressOne: user.addressOne,
                  addressTwo: user.addressTwo,
                  city: user.city,
                  selectedState: user.selectedState,
                  zipcode: user.zipcode
                }
                resolve({
                  ok: true,
                  text: () => Promise.resolve(JSON.stringify(responseJson))
                })
              } else {
                reject(new Error('User Does Not Exist'))
              }
            } else {
              reject(new Error('Unauthorized Method'))
            }
          } else {
            reject(new Error('Unauthorized Access'))
          }
        }
        // Pass Through All Request That Do Not Follow Above Pattern to Regular Fetch
        realFetch(url, opts).then(response => resolve(response))
      }, 500)
    })
  }
}
