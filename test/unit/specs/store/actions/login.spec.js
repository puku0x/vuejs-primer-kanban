import Vue from 'vue'
import * as types from '@/store/mutation-types'

const mockLoginAction = login => {
  const actionInjector = require('inject-loader!@/store/actions')
  const actionsMock = actionInjector({
    '../api': {
      Auth: { login }
    }
  })
  return actionsMock.default.login
}

describe('login action', () => {
  const address = 'foo@domain.com'
  const password = '12345678'
  let commit
  let future

  describe('Auth.login success', () => {
    const token = '1234567890abcdef'
    const userId = 1

    beforeEach(done => {
      const login = authInfo => Promise.resolve({ token, userId })
      const action = mockLoginAction(login)
      commit = sinon.spy()
      future = action({ commit }, { address, password })
      Vue.nextTick().then(done)
    })

    it('success', () => {
      expect(commit.called).to.equal(true)
      expect(commit.args[0][0]).to.equal(types.AUTH_LOGIN)
      expect(commit.args[0][1].token).to.equal(token)
      expect(commit.args[0][1].userId).to.equal(userId)
    })
  })

  describe('Auth.login failed', () => {
    beforeEach(done => {
      const login = authInfo => Promise.reject(new Error('login failed'))
      const action = mockLoginAction(login)
      commit = sinon.spy()
      future = action({ commit })
      Vue.nextTick().then(done)
    })

    it ('failed', done => {
      expect(commit.called).to.equal(false)
      future.catch(err => {
        expect(err.message).to.equal('login failed')
        done()
      })
    })
  })

})
