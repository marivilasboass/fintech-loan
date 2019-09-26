import { loansSelectors } from '../loans'

export const getPaginatedLoansState = (state) => state.paginatedLoans

export const getPageNumber = (state) => getPaginatedLoansState(state).page

export const getEndReached = (state) => getPaginatedLoansState(state).endReached

export const getPageSize = (state) => getPaginatedLoansState(state).pageSize

export const getLoans = (state) => getPaginatedLoansState(state).loans

export const getFilters = (state) => getPaginatedLoansState(state).filters

export const getLoading = (state) => getPaginatedLoansState(state).loading

export const getListView = (state) => getPaginatedLoansState(state).listView

export const getCurrentIndexFlatLoan = (state) => getPaginatedLoansState(state).currentIndexFlatLoan

export const getHasFiltered = (state) => getPaginatedLoansState(state).hasFiltered

export const getCurrentPage = (state) => {
  const pageNumber = getPageNumber(state)
  const pageSize = getPageSize(state)

  const loans = getLoans(state)

  const start = pageNumber * pageSize
  const end = start + pageSize

  const loansPage = loans.slice(start, end)

  const fullLoansPage = loansPage.map(loan => loansSelectors.getFullById(state, loan)).filter(loan => !!loan)

  return fullLoansPage
}

export const getFullLoans = (state) => {
  const loans = getLoans(state)

  const fullLoans = loans.map(loan => loansSelectors.getFullById(state, loan)).filter(loan => !!loan)

  return fullLoans
}
