import R from 'ramda'

import { accountSelectors } from '../account'
import { usersSelectors } from '../users'

export const getLoansState = (state) => state.loans

export const getLoans = (state) => getLoansState(state).loans

export const getById = (state, _id) => getLoans(state)[_id]

export const getFullById = (state, _id) => {
  const loan = getById(state, _id)

  if (!loan) {
    return undefined
  }

  const borrower = loan.borrowerId && usersSelectors.getById(state, loan.borrowerId)
  const investor = loan.investorId && usersSelectors.getById(state, loan.investorId)

  const accountEmail = accountSelectors.getEmail(state)

  const directed = R.is(Array, loan.to) && loan.to.some((directedInvestor) => directedInvestor.email === accountEmail)

  return {
    ...loan,
    borrower,
    investor,
    directed
  }
}

export const getPastCompletedLoans = (state) => getLoansState(state).pastCompletedLoans

export const getLoansList = (state) => Object.values(getLoans(state))

export const getDirected = (state) => {
  const loans = getLoansList(state)
  const accountEmail = accountSelectors.getEmail(state)

  const directedLoans = loans.filter((loan) =>
    loan && loan.to && loan.to.includes(accountEmail)
  )

  return directedLoans
}

export const getOwnedByBorrower = (state) => {
  const loans = getLoansList(state)
  const _id = accountSelectors.getId(state)

  return loans.filter(loan => loan.borrowerId && loan.borrowerId === _id)
}

export const getFullBorrowerLoans = (state) => {
  const loans = getOwnedByBorrower(state)

  return loans.map(loan => getFullById(state, loan._id))
}

export const getLoading = (state) => getLoansState(state).loading
