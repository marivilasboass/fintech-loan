import { usersSelectors } from '../users'

export const getInvestmentsState = (state) => state.investments

export const getInvestments = (state, key) => getInvestmentsState(state)[key].investments

export const getError = (state) => getInvestmentsState(state).error

export const getInstallments = (state) => getInvestmentsState(state).installments

export const getSelectedInstallment = (state) => getInvestmentsState(state).selectedInstallment

export const getFilters = (state) => getInvestmentsState(state).filters

export const getPageSize = (state, key) => getInvestmentsState(state)[key].pageSize

export const getLoading = (state) => getInvestmentsState(state).loading

export const getPage = (state, key) => getInvestmentsState(state)[key].page

export const getEndReached = (state, key) => getInvestmentsState(state)[key].endReached

export const getInvestmentList = (state, key) => getInvestmentsState(state)[key].list

export const getById = (state, _id, key) => getInvestmentList(state, key)[_id]

export const getFullById = (state, _id, key) => {
  const loan = getById(state, _id, key)

  if (!loan) {
    return undefined
  }

  const borrower = loan.borrowerId && usersSelectors.getById(state, loan.borrowerId)
  const investor = loan.investorId && usersSelectors.getById(state, loan.investorId)

  return {
    ...loan,
    borrower,
    investor
  }
}

export const getInvestmentListFull = (state, key) => {
  const investments = getInvestments(state, key)
  return investments.map(investment => getFullById(state, investment, key))
}
