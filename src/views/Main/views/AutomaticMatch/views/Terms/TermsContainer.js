import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors } from '~/store/account'
import Terms from './Terms'
import { requestLoanSelectors, requestLoanOperations } from '~/store/requestLoan'

class TermContainer extends React.PureComponent {
  render () {
    return (<Terms {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  acceptedInvestorTermsAt: accountSelectors.getAccount(state).acceptedInvestorTermsAt,
  countdown: requestLoanSelectors.getCountdown(state),
  refreshCount: requestLoanSelectors.getRefreshCount(state)
})

const mapDispatchToProps = {
  resetTimer: requestLoanOperations.resetTimer,
  refreshLoansReserved: requestLoanOperations.refreshLoansReserved,
  update: requestLoanOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(TermContainer)
