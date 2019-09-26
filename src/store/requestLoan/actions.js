import * as requestLoanTypes from './types'

export const update = requestLoanUpdate => ({
  type: requestLoanTypes.UPDATE,
  payload: requestLoanUpdate
})

export const loading = () => ({
  type: requestLoanTypes.LOADING
})

export const clear = () => ({
  type: requestLoanTypes.CLEAR
})

export const resetTimer = () => ({
  type: requestLoanTypes.RESET_TIMER
})

export const clearOptions = () => ({
  type: requestLoanTypes.CLEAR_OPTIONS
})

export const options = option => ({
  type: requestLoanTypes.OPTIONS,
  payload: option
})
