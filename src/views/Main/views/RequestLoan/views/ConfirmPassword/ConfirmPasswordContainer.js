import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'
import { requestLoanOperations } from '~/store/requestLoan'

import ConfirmPassword from './ConfirmPassword'

class ConfirmPasswordContainer extends React.PureComponent {
  render () {
    return (<ConfirmPassword {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  username: accountSelectors.getUsername(state)
})

const mapDispatchToProps = {
  changeFlagStatus: accountOperations.changeFlagStatus,
  sendLoanRequest: requestLoanOperations.sendLoanRequest,
  verifyPassword: accountOperations.verifyPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordContainer)
