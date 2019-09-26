import * as transactionsTypes from './types'

export const nextPage = (transactions, balances) => ({
  type: transactionsTypes.NEXT_PAGE,
  transactions,
  balances
})

export const reset = () => ({
  type: transactionsTypes.RESET
})

export const endReached = () => ({
  type: transactionsTypes.END_REACHED
})

export const error = message => ({
  type: transactionsTypes.ERROR,
  message
})
