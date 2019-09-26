
import { loansOperations } from '../loans'

import * as paginatedLoansActions from './actions'
import * as paginatedLoansSelectors from './selectors'
import { fetchPastCompletedLoans } from '~/store/loans/operations'

export const updateFilters = paginatedLoansActions.updateFilters
export const resetFilters = paginatedLoansActions.resetFilters
export const clear = paginatedLoansActions.clear

export const startPagination = () =>
  async (dispatch, getState) => {
    dispatch(paginatedLoansActions.resetPagination())
    dispatch(paginatedLoansActions.loading())

    const pageSize = paginatedLoansSelectors.getPageSize(getState())
    const filters = paginatedLoansSelectors.getFilters(getState())

    const options = { skip: 0, limit: pageSize + 1, filters }
    const loans = await dispatch(loansOperations.fetchFromMarketplace(options))

    if (!loans || !loans.length === 0) {
      dispatch(paginatedLoansActions.endReached())
      dispatch(fetchPastCompletedLoans())
    }

    if (loans.length < pageSize) {
      dispatch(paginatedLoansActions.endReached())
      dispatch(fetchPastCompletedLoans())
    }

    dispatch(paginatedLoansActions.append(loans))
  }

export const fetchNextPage = () =>
  async (dispatch, getState) => {
    dispatch(paginatedLoansActions.loading())

    const page = paginatedLoansSelectors.getPageNumber(getState()) + 1
    const pageSize = paginatedLoansSelectors.getPageSize(getState())
    const filters = paginatedLoansSelectors.getFilters(getState())

    const skip = page * pageSize
    const limit = pageSize + 1

    const options = { skip, limit, filters }
    const loans = await dispatch(loansOperations.fetchFromMarketplace(options))

    if (!loans || !loans.length === 0) {
      dispatch(paginatedLoansActions.endReached())
      dispatch(fetchPastCompletedLoans())
      return
    }

    dispatch(paginatedLoansActions.append(loans))

    dispatch(paginatedLoansActions.goToNextPage())

    if (loans.length < pageSize) {
      dispatch(paginatedLoansActions.endReached())
      dispatch(fetchPastCompletedLoans())
    }

    return loans
  }

export const setCurrentIndexFlatLoans = paginatedLoansActions.updateCurrentIndexFlatLoans
