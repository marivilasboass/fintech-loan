import React from 'react'
import { connect } from 'react-redux'

import { requestLoanOperations, requestLoanSelectors } from '~/store/requestLoan'
import { accountSelectors } from '~/store/account'
import BasicInformation from './BasicInformation'

class BasicInformationContainer extends React.PureComponent {
  render () {
    return (<BasicInformation {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  requestedAmountCents: requestLoanSelectors.getRequestedAmountCents(state),
  numberOfInstallments: requestLoanSelectors.getNumberOfInstallments(state),
  bestPayDay: requestLoanSelectors.getBestPayDay(state),
  isRefused: requestLoanSelectors.isRefused(state),
  hasFirstOptionApproved: requestLoanSelectors.hasFirstOptionApproved(state),
  hasSimulated: accountSelectors.getFlags(state).hasSimulated
})

const mapDispatchToProps = {
  update: requestLoanOperations.update,
  clearOptions: requestLoanOperations.clearOptions,
  simulateLoan: requestLoanOperations.simulateLoan,
  sendLoanRequest: requestLoanOperations.sendLoanRequest,
  checkIfHasActiveLoan: requestLoanOperations.checkIfHasActiveLoan
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInformationContainer)
