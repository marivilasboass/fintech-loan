import * as dashboardTypes from './types'

export const receive = dashboard => ({
  type: dashboardTypes.RECEIVE,
  dashboard
})

export const update = dashboardUpdate => ({
  type: dashboardTypes.UPDATE,
  dashboardUpdate
})

export const reset = () => ({
  type: dashboardTypes.RESET
})

export const loading = () => ({
  type: dashboardTypes.LOADING
})

export const error = message => ({
  type: dashboardTypes.ERROR,
  message
})

export const clearError = () => ({
  type: dashboardTypes.CLEAR_ERROR
})
