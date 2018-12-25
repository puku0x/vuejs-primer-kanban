import mutations from '@/store/mutations'

describe('AUTH_LOGIN', () => {
  it('payload', () => {
    const state = {}
    const token = '123457890abcdef'
    const userId = 1
    mutations.AUTH_LOGIN(state, { token, userId })
    expect(state.auth.token).to.equal(token)
    expect(state.auth.userId).to.equal(userId)
  })
})
