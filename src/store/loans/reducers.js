import R from 'ramda'

import * as loansTypes from './types'

export const initialState = {
  loans: {},
  pastCompletedLoans: {},
  loading: true,
  error: false
}

export const loansReducers = (state = initialState, action) => {
  switch (action.type) {
  case loansTypes.UPDATE:
    return R.mergeDeepRight(state, {
      ...action.loanUpdate,
      error: false,
      loading: false
    })
  case loansTypes.UPDATE_PROFILE_PICTURE: {
    return {
      ...state,
      pastCompletedLoans: state.pastCompletedLoans.map((loan, index) => index === action.index ? { ...loan, ...action.profilePicture } : loan)
    }
  }
  case loansTypes.RECEIVE:
    return {
      ...state,
      loans: R.mergeDeepRight(state.loans, action.loans),
      error: false,
      loading: false
    }
  case loansTypes.REMOVE:
    return {
      ...state,
      loans: R.dissoc(action._id, state.loans),
      error: false,
      loading: false
    }
  case loansTypes.LOADING:
    return { ...state, loading: true }
  case loansTypes.ERROR:
    return { ...state, error: action.message, loading: false }
  default:
    return state
  }
}
