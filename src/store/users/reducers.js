import * as usersTypes from './types'

export const initialState = {
  users: {}
}

export const usersReducers = (state = initialState, action) => {
  switch (action.type) {
  case usersTypes.RECEIVE:
    return {
      ...state,
      users: { ...state.users, ...action.users }
    }
  case usersTypes.UPDATE:
    const user = state.users[action._id]
    const updatedUser = { [action._id]: { ...user, ...action.update } }
    return {
      ...state,
      users: { ...state.users, ...updatedUser }
    }
  default:
    return state
  }
}
