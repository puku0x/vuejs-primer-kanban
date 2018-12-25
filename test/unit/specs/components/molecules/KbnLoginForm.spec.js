import { mount } from '@vue/test-utils'
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue'

describe('KbnLoginForm', () => {
  describe('プロパティ', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: {
            onlogin: () => {}
          }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('email', () => {
        describe('required', () => {
          describe('none', () => {
            it ('validation.email.required === invalid', () => {
              loginForm.setData({ email: '' })
              expect(loginForm.vm.validation.email.required).to.equal(false)
            })
          })
          describe('has input', () => {
            it ('validation.email.required === valid', () => {
              loginForm.setData({ email: 'foo@domain.com' })
              expect(loginForm.vm.validation.email.required).to.equal(true)
            })
          })
        })

        describe('format', () => {
          describe('invalid', () => {
            it ('validation.email.format === invalid', () => {
              loginForm.setData({ email: 'foobar' })
              expect(loginForm.vm.validation.email.format).to.equal(false)
            })
          })
          describe('valid', () => {
            it ('validation.email.format === valid', () => {
              loginForm.setData({ email: 'foo@domain.com' })
              expect(loginForm.vm.validation.email.format).to.equal(true)
            })
          })
        })
      })

      describe('password', () => {
        describe('required', () => {
          describe('none', () => {
            it ('validation.password.required === invalid', () => {
              loginForm.setData({ password: '' })
              expect(loginForm.vm.validation.password.required).to.equal(false)
            })
          })
          describe('has password', () => {
            it ('validation.password.required === valid', () => {
              loginForm.setData({ password: 'xxxx' })
              expect(loginForm.vm.validation.password.required).to.equal(true)
            })
          })
        })
      })
    })


    describe('valid', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: {
            onlogin: () => {}
          }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('ok', () => {
        it ('valid', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678'
          })
          expect(loginForm.vm.valid).to.equal(true)
        })
      })

      describe('ng', () => {
        it ('valid', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: ''
          })
          expect(loginForm.vm.valid).to.equal(false)
        })
      })
    })
    describe('disableLoginAction', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: {
            onlogin: () => {}
          }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('ng', () => {
        it ('loginForm.vm.disableLoginAction === true', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: ''
          })
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })

      describe('ok', () => {
        it ('loginForm.vm.disableLoginAction === false', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678'
          })
          expect(loginForm.vm.disableLoginAction).to.equal(false)
        })
      })

      describe('loginning', () => {
        it ('loginForm.vm.disableLoginAction === true', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678',
            progress: true
          })
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })
    })

    describe('onlogin', () => {
      let loginForm
      let onloginStub
      beforeEach(done => {
        onloginStub = sinon.stub()
        loginForm = mount(KbnLoginForm, {
          propsData: {
            onlogin: onloginStub
          }
        })
        loginForm.setData({
          email: 'foo@domain.com',
          password: '12345678'
        })
        loginForm.vm.$nextTick(done)
      })

      describe('resolve', () => {
        it ('resolved', done => {
          onloginStub.resolves()

          loginForm.find('button').trigger('click')
          expect(onloginStub.called).to.equal(false)
          expect(loginForm.vm.error).to.equal('')
          expect(loginForm.vm.disableLoginAction).to.equal(true)

          loginForm.vm.$nextTick(() => {
            expect(onloginStub.called).to.equal(true)
            const authInfo = onloginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)

            loginForm.vm.$nextTick().then(() => {
              expect(loginForm.vm.error).to.equal('')
              expect(loginForm.vm.disableLoginAction).to.equal(false)
              done()
            })
          })
        })
      })

      describe('reject', () => {
        it ('rejected', done => {
          onloginStub.rejects(new Error('login error!'))

          loginForm.find('button').trigger('click')
          expect(onloginStub.called).to.equal(false)
          expect(loginForm.vm.error).to.equal('')
          expect(loginForm.vm.disableLoginAction).to.equal(true)

          loginForm.vm.$nextTick(() => {
            expect(onloginStub.called).to.equal(true)
            const authInfo = onloginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)

            loginForm.vm.$nextTick().then(() => {
              expect(loginForm.vm.error).to.equal('login error!')
              expect(loginForm.vm.disableLoginAction).to.equal(false)
              done()
            })
          })
        })
      })
    })
  })
})
