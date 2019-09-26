import React from 'react'
import { connect } from 'react-redux'
import { accountSelectors } from '~/store/account'
import { dashboardOperations, dashboardSelectors } from '~/store/dashboard'
import Dashboard from './Dashboard'

class DashboardContainer extends React.PureComponent {
  render () {
    return (<Dashboard {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  dashboard: dashboardSelectors.getDashboard(state),
  loading: dashboardSelectors.getLoading(state),
  error: dashboardSelectors.getError(state),
  dashboardActiveConfig: dashboardSelectors.getDashboardActiveConfig(state),
  statusActiveConfig: dashboardSelectors.getStatusActiveConfig(state),
  totalLoansApprovedPerScore: dashboardSelectors.getTotalLoansApprovedPerScore(state),
  lateLoans: dashboardSelectors.getLateLoans(state),
  topAreaInfo: dashboardSelectors.getTopAreaInfo(state),
  infoChartAreaValues: dashboardSelectors.getInfoChartAreaValues(state),
  recoveredInfo: dashboardSelectors.getRecoveredInfo(state),
  defaultsInfo: dashboardSelectors.getDefaultsInfo(state),
  statusAreaInfo: dashboardSelectors.getStatusAreaInfo(state),
  scoreAreaInfo: dashboardSelectors.getScoresAreaInfo(state),
  recurrenceAreaInfo: dashboardSelectors.getReccurenceAreaInfo(state),
  walletBalance: accountSelectors.getBalance(state),
  featureFlags: accountSelectors.getFeatureFlags(state)
})

const mapDispatchToProps = {
  fetchDashboard: dashboardOperations.fetchDashboard,
  fetchLineChartData: dashboardOperations.fetchLineChartData,
  fetchLateLoans: dashboardOperations.fetchLateLoans,
  update: dashboardOperations.update,
  clearError: dashboardOperations.clearError
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
