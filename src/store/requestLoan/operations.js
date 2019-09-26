import Sentry from 'sentry-expo'

import { track } from '~/services/analytics'

import { accountSelectors } from '../account'

import * as requestLoanActions from './actions'
import * as requestLoanSelectors from './selectors'

import { paginatedLoansSelectors } from '~/store/paginatedLoans'
import { loansOperations } from '../loans'

export const clear = requestLoanActions.clear
export const resetTimer = requestLoanActions.resetTimer
export const clearOptions = requestLoanActions.clearOptions

export const update = requestLoanActions.update

export const sendLoanRequest = (location) =>
  async (dispatch, getState, { api }) => {
    dispatch(requestLoanActions.loading())

    const loan = requestLoanSelectors.getLoan(getState())
    const motive = requestLoanSelectors.getMotive(getState())
    const initialRequestedAmountCents = requestLoanSelectors.getInitialRequestedAmountCents(getState())
    const { requestedAmountCents, numberOfInstallments, bestPayDay } = loan
    const financialService = accountSelectors.getFinancialService(getState())

    if (!location) {
      return false
    }

    try {
      await api.post('loan/create', {
        requestedAmountCents,
        numberOfInstallments,
        bestPayDay,
        borrowerLocation: location,
        motive,
        initialRequestedAmountCents,
        financialService
      })

      track('RequestLoan', {
        value: loan.requestedAmountCents / 100,
        requestedAmount: loan.requestedAmountCents / 100,
        bestPayDay,
        numberOfInstallments,
        motive,
        initialRequestedAmount: initialRequestedAmountCents / 100
      })

      return true
    } catch (err) {
      Sentry.captureException(err)
    }
    return false
  }

export const checkIfHasActiveLoan = () =>
  async (dispatch, getState, { api }) => {
    try {
      const { data: hasActiveResponse } = await api.get(`loan/hasActive`)
      return hasActiveResponse.data
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const fetchTotalAvaliableLoans = () =>
  async (dispatch, getState, { api }) => {
    try {
      const { data: response } = await api.get('loan/automaticMatch/marketplace/totalAvailable')
      dispatch(requestLoanActions.update({ totalAvailiable: response.data }))
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const getAutomaticMatchResults = () =>
  async (dispatch, getState, { api }) => {
    try {
      const filters = paginatedLoansSelectors.getFilters(getState())
      const totalToInvestmentCents = requestLoanSelectors.getTotalToInvestmentCents(getState())
      const { data: result } = await api.post('loan/automaticMatch/marketplace/results',
        {
          totalToInvestmentCents,
          ...loansOperations.getFilterQuery({ filters })
        }
      )
      return result.data
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const refreshLoansReserved = () =>
  async (dispatch, getState, { api }) => {
    try {
      await api.post('loan/automaticMatch/marketplace/refresh')
      return true
    } catch (err) {
      Sentry.captureException(err)
    }
  }

export const removeLoansReserved = () =>
  async (dispatch, getState, { api }) => {
    try {
      await api.post('loan/automaticMatch/marketplace/removeReserved')
      return true
    } catch (err) {
      Sentry.captureException(err)
    }
  }

export const confirmReservedLoans = () =>
  async (dispatch, getState, { api }) => {
    try {
      await api.post('loan/automaticMatch/marketplace/confirm')
      return true
    } catch (err) {
      Sentry.captureException(err)
    }
  }

export const simulateLoan = () =>
  async (dispatch, getState, { api }) => {
    try {
      const bestPayDay = requestLoanSelectors.getBestPayDay(getState())
      const numberOfInstallments = requestLoanSelectors.getNumberOfInstallments(getState())
      const creditReport = requestLoanSelectors.getCreditReport(getState())
      const requestedAmountCents = requestLoanSelectors.getRequestedAmountCents(getState())
      const financialService = accountSelectors.getFinancialService(getState())

      const { data: simulationResult } = await api.post('credit-score/analyzeLoanRequest', {
        bestPayDay,
        creditReport,
        requestedAmountCents,
        numberOfInstallments,
        financialService
      })

      await dispatch(clearOptions())
      if (simulationResult.data.result === 'optionsAvailable') {
        const { simulations } = simulationResult.data
        dispatch(requestLoanActions.options(simulations))
      }
      return simulationResult.data
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }
