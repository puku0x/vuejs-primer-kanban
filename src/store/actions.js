import * as types from './mutation-types'
import { Auth, List, Task } from '../api'

export default {
  login: ({ commit }, authInfo) => {
    console.log(authInfo);

    return Auth.login(authInfo)
      .then(({ token, userId }) => {
        console.log('yay');

        commit(types.AUTH_LOGIN, { token, userId })
      })
      .catch(err => { throw err })
  },
  logout: ({ commit }) => {
    throw new Error('logout should be implemented')
  },
  fetchAllTaskList: ({ commit }) => {
    throw new Error('fetchAllTaskList should be implemented')
  },
  addTask: ({ commit }) => {
    throw new Error('addTask should be implemented')
  },
  updateTask: ({ commit }) => {
    throw new Error('updateTask should be implemented')
  },
  removeTask: ({ commit }) => {
    throw new Error('removeTask should be implemented')
  }
}
