import React from 'react'
import { connect } from 'react-redux'

import Wizard from './Wizard'
import { requestLoanSelectors, requestLoanOperations } from '~/store/requestLoan'
import { paginatedLoansOperations } from '~/store/paginatedLoans'
import { accountOperations, accountSelectors } from '~/store/account'

class WizardContainer extends React.PureComponent {
  render () {
    return <Wizard {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  acceptedInvestorTermsAt: accountSelectors.getAccount(state).acceptedInvestorTermsAt,
  nickname: accountSelectors.getNickname(state),
  simulationResults: requestLoanSelectors.getSimulationResults(state)
})

const mapDispatchToProps = {
  confirmReservedLoans: requestLoanOperations.confirmReservedLoans,
  clear: requestLoanOperations.clear,
  clearFilter: paginatedLoansOperations.clear,
  verifyPassword: accountOperations.verifyPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardContainer)
