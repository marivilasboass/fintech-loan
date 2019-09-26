import React from 'react'
import { connect } from 'react-redux'

import Summary from './Summary'
import { requestLoanOperations, requestLoanSelectors } from '~/store/requestLoan'

class SummaryContainer extends React.PureComponent {
  render () {
    return (<Summary {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  countdown: requestLoanSelectors.getCountdown(state),
  refreshCount: requestLoanSelectors.getRefreshCount(state),
  simulationResults: requestLoanSelectors.getSimulationResults(state)
})

const mapDispatchToProps = {
  resetTimer: requestLoanOperations.resetTimer,
  refreshLoansReserved: requestLoanOperations.refreshLoansReserved,
  removeLoansReserved: requestLoanOperations.removeLoansReserved,
  fetchTotalAvaliableLoans: requestLoanOperations.fetchTotalAvaliableLoans,
  update: requestLoanOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryContainer)
