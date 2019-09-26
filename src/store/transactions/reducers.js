import * as transactionsTypes from './types'

export const initialState = {
  transactions: {},
  balances: {},
  page: 0,
  endReached: false,
  error: ''
}

export const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
  case transactionsTypes.NEXT_PAGE:
    return {
      ...state,
      page: state.page + 1,
      balances: { ...state.balances, ...action.balances },
      transactions: { ...state.transactions, ...action.transactions }
    }
  case transactionsTypes.ERROR:
    return {
      ...state,
      error: action.message
    }
  case transactionsTypes.END_REACHED:
    return { ...state, endReached: true }
  case transactionsTypes.RESET:
    return initialState
  default:
    return state
  }
}
