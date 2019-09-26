import * as investmentsTypes from './types'

export const updateFilters = (filters) => ({
  type: investmentsTypes.UPDATE_FILTERS,
  filters
})

export const append = (investments, paymentStatus) => ({
  type: investmentsTypes.APPEND,
  investments,
  paymentStatus
})

export const receive = (investmentsList, paymentStatus) => ({
  type: investmentsTypes.RECEIVE,
  investmentsList,
  paymentStatus
})

export const resetFilters = () => ({
  type: investmentsTypes.RESET_FILTERS
})

export const resetPagination = (paymentStatus) => ({
  type: investmentsTypes.RESET_PAGINATION,
  paymentStatus
})

export const loading = () => ({
  type: investmentsTypes.LOADING
})

export const error = (message) => ({
  type: investmentsTypes.ERROR,
  message
})

export const endReached = (paymentStatus) => ({
  type: investmentsTypes.END_REACHED,
  paymentStatus
})

export const goToNextPage = (paymentStatus) => ({
  type: investmentsTypes.NEXT_PAGE,
  paymentStatus
})

export const receiveInstallments = installments => ({
  type: investmentsTypes.RECEIVE_INSTALLMENTS,
  installments
})

export const selectInstallment = installment => ({
  type: investmentsTypes.SELECT_INSTALLMENT,
  installment
})

export const clearInstallment = () => ({
  type: investmentsTypes.CLEAR_INSTALLMENT
})

export const clearInvestment = () => ({
  type: investmentsTypes.CLEAR_INVESTMENT
})

export const clearInstallments = () => ({
  type: investmentsTypes.CLEAR_INSTALLMENTS
})
