import axios from 'axios'

const mockAuth = adapter => {
  const injector = require('inject-loader!@/api/auth')
  const clientMock = injector({
    './client': axios.create({ adapter })
  })
  return clientMock.default
}

describe('Auth API', () => {
  describe('login', () => {
    const token = '1234567890abcdef'
    const userId = 1
    const address = 'foo@domain.com'
    const password = '1245678'

    describe('success', () => {
      it('token userId', done => {
        const adapter = config => {
          return new Promise((resolve, reject) => {
            resolve({ data: { token, userId }, status: 200 })
          })
        }

        const auth = mockAuth(adapter)

        auth.login({ address, password })
          .then(res => {
            expect(res.token).to.equal(token)
            expect(res.userId).to.equal(userId)
          })
          .then(done)
      })
    })

    describe('failed', () => {
      it('error', done => {
        const message = 'login failed'
        const adapter = config => {
          return new Promise((resolve, reject) => {
            const err = new Error(message)
            err.response = { data: { message }, status: 400 }
            reject(err)
          })
        }

        const auth = mockAuth(adapter)

        auth.login({ address, password })
          .catch(err => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })
})
