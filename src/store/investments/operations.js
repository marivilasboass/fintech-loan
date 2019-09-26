import Sentry from 'sentry-expo'
import { normalize } from 'normalizr'
import R from 'ramda'

import { loansSchema } from '../loans/schema'
import { usersOperations } from '../users'
import * as investmentsActions from './actions'
import * as investmentsSelectors from './selectors'

export const updateFilters = investmentsActions.updateFilters
export const resetFilters = investmentsActions.resetFilters
export const selectInstallment = investmentsActions.selectInstallment
export const clearInstallment = investmentsActions.clearInstallment
export const clearInvestment = investmentsActions.clearInvestment
export const clearInstallments = investmentsActions.clearInstallments

export const getFilterBody = ({ skip, limit, filters }) => {
  const { paymentStatus, ...rest } = filters

  const filter = {
    skip,
    limit,
    paymentStatus: paymentStatus !== 'all' && [paymentStatus],
    ...rest
  }

  return R.filter((value) => {
    if (R.is(Object, value) && !(value instanceof Array)) return true
    if (R.is(Number, value)) return true
    if (!value) return false
    if (!value.length) return false
    return true
  }, filter)
}

export const fetchInvestmentsList = (options, paymentStatus) =>
  async (dispatch, getState, { api }) => {
    dispatch(investmentsActions.loading())

    try {
      const body = getFilterBody(options)

      const { data: investmentsResults } = await api.post('loan/my/investments/filtered', body)
      const { data: investments } = investmentsResults

      if (!investments) {
        return []
      }

      const { entities, result } = normalize(investments, loansSchema)

      await dispatch(usersOperations.receive(entities.user))
      await dispatch(investmentsActions.receive(entities.loan, paymentStatus))
      return result
    } catch (err) {
      Sentry.captureException(err)
      dispatch(investmentsActions.error('Erro ao buscar a lista de investimentos'))
      return []
    }
  }

export const startPagination = (paymentStatus) =>
  async (dispatch, getState) => {
    dispatch(investmentsActions.loading())
    dispatch(investmentsActions.resetPagination(paymentStatus))

    const pageSize = investmentsSelectors.getPageSize(getState(), paymentStatus)
    const filters = investmentsSelectors.getFilters(getState())

    const options = {
      skip: 0,
      limit: pageSize + 1,
      filters: { ...filters, paymentStatus }
    }
    const investments = await dispatch(fetchInvestmentsList(options, paymentStatus))
    dispatch(investmentsActions.append(investments, paymentStatus))
  }

export const fetchNextPage = (paymentStatus) =>
  async (dispatch, getState) => {
    dispatch(investmentsActions.loading())

    const page = investmentsSelectors.getPage(getState(), paymentStatus) + 1
    const pageSize = investmentsSelectors.getPageSize(getState(), paymentStatus)
    const filters = investmentsSelectors.getFilters(getState())

    const skip = page * pageSize
    const limit = pageSize + 1

    const options = {
      skip,
      limit,
      filters: { ...filters, paymentStatus }
    }
    const loans = await dispatch(fetchInvestmentsList(options, paymentStatus))

    if (!loans || !loans.length === 0) {
      await dispatch(investmentsActions.endReached(paymentStatus))
      return []
    }

    dispatch(investmentsActions.append(loans, paymentStatus))

    dispatch(investmentsActions.goToNextPage(paymentStatus))

    if (loans.length < pageSize) {
      await dispatch(investmentsActions.endReached(paymentStatus))
    }

    return loans
  }

export const fetchInstallments = (_id) =>
  async (dispatch, getState, { api }) => {
    try {
      dispatch(investmentsActions.loading())
      const url = `collection/negotiations/${_id}/installmentSlices`
      const { data: installmentsResult } = await api.get(url)
      await dispatch(investmentsActions.receiveInstallments(installmentsResult.data || []))
    } catch (err) {
      await dispatch(investmentsActions.receiveInstallments([]))
      Sentry.captureException(err)
      dispatch(investmentsActions.error('Erro ao buscar a lista de parcelas'))
    }
  }
