import * as dashboardActions from './actions'
import Sentry from 'sentry-expo'

export const update = dashboardActions.update
export const clearError = dashboardActions.clearError

export const fetchDashboard = () =>
  async (dispatch, getState, { api }) => {
    dispatch(dashboardActions.loading())
    try {
      const dashboardInfoResponse = await api.get('investor-analytics/dashboard/base')
      const { data: dashboardData } = dashboardInfoResponse
      const dashboardBase = dashboardData.data

      const lineGraphicResponse = await api.get('investor-analytics/dashboard/profitGraphicLines')
      const { data: lineGraphicData } = lineGraphicResponse
      const lineGraphicInfo = { lineGraphicValues: lineGraphicData.data }

      const lateLoansResponse = await api.get('investor-analytics/dashboard/lateLoans')
      const { data: lateLoansData } = lateLoansResponse
      const lateLoansInfo = { lateLoans: lateLoansData.data }

      const dashboard = { ...dashboardBase, ...lineGraphicInfo, ...lateLoansInfo }

      dispatch(dashboardActions.update(dashboard))
    } catch (error) {
      dispatch(dashboardActions.error(error))
      Sentry.captureException(error)
    }
  }
