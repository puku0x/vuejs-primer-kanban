import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN] (state, payload) {
    state.auth = payload
  },
  [types.AUTH_LOGOUT] (state, payload) {
    throw new Error('AUTH_LOGOUT should be implemented')
  },
  [types.FETCH_ALL_TASKLIST] (state, payload) {
    throw new Error('FETCH_ALL_TASKLIST should be implemented')
  },
  [types.ADD_TASK] (state, payload) {
    throw new Error('ADD_TASK should be implemented')
  },
  [types.UPDATE_TASK] (state, payload) {
    throw new Error('UPDATE_TASK should be implemented')
  },
  [types.REMOVE_TASK] (state, payload) {
    throw new Error('REMOVE_TASK should be implemented')
  }
}
