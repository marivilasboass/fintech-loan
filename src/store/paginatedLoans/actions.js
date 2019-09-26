import * as paginatedLoansTypes from './types'

export const goToNextPage = () => ({
  type: paginatedLoansTypes.NEXT_PAGE
})

export const changePageSize = (newSize) => ({
  type: paginatedLoansTypes.CHANGE_PAGE_SIZE,
  newSize
})

export const updateFilters = (filters) => ({
  type: paginatedLoansTypes.UPDATE_FILTERS,
  filters
})

export const append = (loans) => ({
  type: paginatedLoansTypes.APPEND,
  loans
})

export const resetPagination = () => ({
  type: paginatedLoansTypes.RESET_PAGINATION
})

export const resetFilters = () => ({
  type: paginatedLoansTypes.RESET_FILTERS
})

export const loading = () => ({
  type: paginatedLoansTypes.LOADING
})

export const clear = () => ({
  type: paginatedLoansTypes.CLEAR
})

export const updateCurrentIndexFlatLoans = (currentIndexFlatLoan) => ({
  type: paginatedLoansTypes.UPDATE_CURRENT_INDEX_FLAT_LOANS,
  currentIndexFlatLoan
})

export const endReached = () => ({
  type: paginatedLoansTypes.END_REACHED
})
