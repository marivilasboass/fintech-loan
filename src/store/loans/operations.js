import { normalize } from 'normalizr'
import Sentry from 'sentry-expo'
import R from 'ramda'

import { usersOperations } from '../users'
import * as loansActions from './actions'
import { loansSchema } from './schema'
import { accountOperations } from '../account'
import { allCityValue } from '~/components/AdvancedFilter/views/City/constants/allCitiesValue'
import { asyncGetCachedImageURI } from '~/services/cache'

export const receive = loansActions.receive
export const updateFilters = loansActions.updateFilters
export const resetFilters = loansActions.resetFilters

export const getFilterQuery = ({ skip, limit, filters }) => {
  const { state, incomeCents: income, city, financedAmountCents: financedAmount, ...rest } = filters
  const incomeCents = {
    min: income.min * 100,
    max: income.max * 100
  }
  const financedAmountCents = {
    min: financedAmount.min * 100,
    max: financedAmount.max * 100
  }

  const filter = {
    skip,
    limit,
    incomeCents,
    financedAmountCents,
    state: state.id,
    city: city.name === allCityValue ? undefined : city.name,
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

export const fetchFromMarketplace = (options) =>
  async (dispatch, getState, { api }) => {
    dispatch(loansActions.loading())

    try {
      const query = getFilterQuery(options)

      const { data: marketplaceResponse } = await api.post('loan/marketplace', query)
      const { data: loans } = marketplaceResponse

      const filteredLoans = loans.filter(loan => !!loan.borrower)

      const { entities, result } = normalize(filteredLoans, loansSchema)

      await dispatch(usersOperations.receive(entities.user))
      await dispatch(loansActions.receive(entities.loan))

      return result
    } catch (err) {
      Sentry.captureException(err)
      dispatch(loansActions.error('Erro ao buscar empréstimos'))
      return []
    }
  }

export const cancel = (_id) =>
  async (dispatch, getState, { api }) => {
    dispatch(loansActions.loading())

    try {
      await api.post(`loan/cancel/${_id}`)

      dispatch(loansActions.remove(_id))
    } catch (err) {
      Sentry.captureException(err)
      dispatch(loansActions.error('Erro ao remover empréstimo'))
    }
  }

export const fetchBorrowerLoans = () =>
  async (dispatch, getState, { api }) => {
    dispatch(loansActions.loading())

    try {
      const { data: request } = await api.get('loan/my/loans')

      const { data: loans } = request

      if (!loans) {
        dispatch(loansActions.receive([]))
        return
      }
      const { entities } = normalize(loans, loansSchema)

      await dispatch(usersOperations.receive(entities.user))

      await dispatch(loansActions.receive(entities.loan))
    } catch (err) {
      Sentry.captureException(err)
      dispatch(loansActions.error('Erro ao buscar empréstimos'))
    }
  }

export const confirmInvestment = (loanId, quotasQty) =>
  async (dispatch, getState, { api }) => {
    const response = await api.post('loan/quotas/confirmInvestment', {
      loanId,
      quotasQty
    })

    dispatch(accountOperations.fetchIuguBalance())

    return response
  }

export const fetchAvailableLots = (loanId) =>
  async (dispatch, getState, { api }) => {
    try {
      const { data: availableLots } = await api.post(`loan/availableLots/${loanId}`)
      return availableLots.data
    } catch (err) {
      Sentry.captureException(err)
      return false
    }
  }

export const fetchPastCompletedLoans = () =>
  async (dispatch, getState, { api }) => {
    try {
      const { data: response } = await api.post(`loan/loansApproved`)
      const { data: pastCompletedLoans } = response

      dispatch(loansActions.update({ pastCompletedLoans }))
      pastCompletedLoans.map((loan, index) => {
        dispatch(fetchPastCompletedLoanProfilePicture(loan, index))
      })
    } catch (err) {
      Sentry.captureException(err)
      return []
    }
  }

export const fetchPastCompletedLoanProfilePicture = (loan, index) =>
  async (dispatch, getState, { api }) => {
    const smallProfilePicture = await asyncGetCachedImageURI(loan.borrowerMarketplaceData.profilePicture.small)
    dispatch(loansActions.updateProfilePicture(index, { smallProfilePicture }))
  }
