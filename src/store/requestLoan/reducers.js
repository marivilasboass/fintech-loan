import R from 'ramda'
import * as requestLoanTypes from './types'

export const initialState = {
  amount: 0,
  payDay: null,
  totalAvailiable: 0,
  countdown: 300,
  refeshCount: 0,
  totalToInvestmentCents: 0,
  requestedAmountCents: 0,
  initialRequestedAmountCents: 0,
  bestPayDay: null,
  numberOfInstallments: null,
  loan: null,
  error: false,
  loading: false,
  optionsOfLoan: [],
  simulationResults: {},
  motive: null
}

export const requestLoanReducers = (state = initialState, action) => {
  switch (action.type) {
  case requestLoanTypes.UPDATE:
    return R.mergeDeepRight(state, {
      ...action.payload,
      loading: false
    })
  case requestLoanTypes.LOADING:
    return {
      ...state,
      loading: true
    }
  case requestLoanTypes.RESET_TIMER:
    return {
      ...state,
      countdown: 300,
      refeshCount: state.refeshCount + 1
    }
  case requestLoanTypes.ERROR:
    return {
      ...state,
      loading: false
    }
  case requestLoanTypes.CLEAR:
    return initialState
  case requestLoanTypes.CLEAR_OPTIONS:
    return {
      ...state,
      optionsOfLoan: []
    }
  case requestLoanTypes.OPTIONS:
    return {
      ...state,
      optionsOfLoan: action.payload
    }
  default:
    return state
  }
}
