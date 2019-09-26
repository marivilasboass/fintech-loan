import R from 'ramda'
import * as registerTypes from './types'

export const initialState = {
  nickname: '',
  email: '',
  username: '',
  phone: '',
  picture: '',
  code: '',
  userType: null,
  error: false,
  loading: false,
  valid: false
}

export const registerReducers = (state = initialState, action) => {
  switch (action.type) {
  case registerTypes.UPDATE:
    return R.mergeDeepRight(state, {
      ...action.registerUpdate,
      error: false,
      loading: false
    })
  case registerTypes.LOADING:
    return {
      ...state,
      loading: true
    }
  case registerTypes.RESET:
    return initialState
  case registerTypes.ERROR:
    return {
      ...state,
      error: action.message,
      loading: false
    }
  default:
    return state
  }
}
