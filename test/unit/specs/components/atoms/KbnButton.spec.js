import { mount } from '@vue/test-utils'
import KbnButton from '@/components/atoms/KbnButton.vue'

describe('KbnButton', () => {
  describe('プロパティ', () => {
    describe('type', () => {
      describe('default', () => {
        it ('button.kbn-button', () => {
          const button = mount(KbnButton)
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('kbn-button')
        })
      })

      describe('button', () => {
        it ('button.kbn-button', () => {
          const button = mount(KbnButton, {
            propsData: {
              type: 'button'
            }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('kbn-button')
        })
      })

      describe('text', () => {
        it ('button.kbn-button-text', () => {
          const button = mount(KbnButton, {
            propsData: {
              type: 'text'
            }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('kbn-button-text')
        })
      })
    })

    describe('disabled', () => {
      describe('default', () => {
        it ('not disabled', () => {
          const button = mount(KbnButton)
          expect(button.attributes().disabled).to.be.an('undefined')
        })
      })

      describe('true', () => {
        it ('disabled', () => {
          const button = mount(KbnButton, {
            propsData: {
              disabled: true
            }
          })
          expect(button.attributes().disabled).to.equal('disabled')
        })
      })

      describe('false', () => {
        it ('not disabled', () => {
          const button = mount(KbnButton, {
            propsData: {
              disabled: false
            }
          })
          expect(button.attributes().disabled).to.be.an('undefined')
        })
      })
    })
  })

  describe('event', () => {
    describe('click', () => {
      it ('not disabled', () => {
        const button = mount(KbnButton)
        button.trigger('click')
        expect(button.emitted().click.length).to.equal(1)
      })
    })
  })

  describe('slot', () => {
    describe('content', () => {
      it ('has content', () => {
        const button = mount(KbnButton, {
          slots: {
            default: '<p>hello</p>'
          }
        })
        expect(button.text()).to.equal('hello')
      })

      it ('has no content', () => {
        const button = mount(KbnButton)
        expect(button.text()).to.equal('')
      })
    })
  })

})
