import * as usersTypes from './types'

export const receive = users => ({
  type: usersTypes.RECEIVE,
  users
})

export const update = (_id, update) => ({
  type: usersTypes.UPDATE,
  _id,
  update
})
