import React from 'react'
import { connect } from 'react-redux'
import { accountOperations, accountSelectors } from '~/store/account'

import Login from './Login'
import { registerOperations } from '~/store/register'

class LoginContainer extends React.PureComponent {
  render () {
    return (<Login {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  _id: accountSelectors.getId(state),
  username: accountSelectors.getUsername(state),
  password: accountSelectors.getPassword(state),
  loading: accountSelectors.getLoading(state),
  error: accountSelectors.getError(state),
  status: accountSelectors.getStatus(state)
})

const mapDispatchToProps = {
  login: accountOperations.login,
  update: accountOperations.update,
  clearError: accountOperations.clearError,
  sendEmailToResetPassword: registerOperations.sendEmailToResetPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
