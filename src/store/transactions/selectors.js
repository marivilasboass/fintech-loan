import * as R from 'ramda'

export const getTransactionsState = (state) => state.transactions

export const getPage = (state) => getTransactionsState(state).page

export const getEndReached = (state) => getTransactionsState(state).endReached

export const getTransactions = (state) => {
  const transactions = Object.values(getTransactionsState(state).transactions)
  const balances = getTransactionsState(state).balances

  if (!transactions || transactions.length === 0) {
    return []
  }

  const groupedTransactions = R.pipe(
    R.groupBy((transaction) => transaction.formattedTransactionDate),
    R.toPairs,
    R.map(([date, events]) => ({ date, events, totalAmountCents: balances[date] }))
  )(transactions)

  return groupedTransactions
}

export const getTransactionsError = (state) => getTransactionsState(state).error
