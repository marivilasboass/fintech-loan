import React from 'react'
import { connect } from 'react-redux'

import ToKnowYouBetter from './ToKnowYouBetter'
import { accountOperations } from '~/store/account'
import { requestLoanOperations } from '~/store/requestLoan'

class ToKnowYoutBetterContainer extends React.PureComponent {
  render () {
    return <ToKnowYouBetter {...this.props} />
  }
}

const mapDispatchToProps = {
  update: accountOperations.update,
  sendLoanRequest: requestLoanOperations.sendLoanRequest
}

export default connect(null, mapDispatchToProps)(ToKnowYoutBetterContainer)
