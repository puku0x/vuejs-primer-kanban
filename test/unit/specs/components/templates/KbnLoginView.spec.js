import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'

const localVue = createLocalVue()

describe('KbnLoginView', () => {
  let $router
  let actions
  let store
  let LoginFormComponentStub

  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('foo@domain.com', '12345678')
  }

  beforeEach(() => {
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }

    $router = {
      push: sinon.spy()
    }

    actions = {
      login: sinon.stub()
    }

    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('login', () => {
    let loginView
    describe('success', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it ('redirect home', done => {
        actions.login.resolves()
        triggerLogin(loginView, LoginFormComponentStub)
        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })

    describe('failed', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
        sinon.spy(loginView.vm, 'throwReject')
      })

      afterEach(() => {
        loginView.vm.throwReject.restore()
      })

      it ('handle error', done => {
        const message = 'login failed'
        actions.login.rejects(new Error(message))
        triggerLogin(loginView, LoginFormComponentStub)
        loginView.vm.$nextTick().then(() => {
          expect(loginView.vm.throwReject.called).to.equal(true)
          expect(loginView.vm.throwReject.args[0][0].message).to.equal(message)
          done()
        })
      })
    })

  })



})
