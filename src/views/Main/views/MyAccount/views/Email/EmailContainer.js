import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'
import { registerOperations } from '~/store/register'

import Email from './Email'

class EmailContainer extends React.PureComponent {
  render () {
    return (<Email {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  error: accountSelectors.getError(state),
  oldEmails: accountSelectors.getOldEmails(state),
  email: accountSelectors.getEmail(state)
})

const mapDispatchToProps = {
  checkIfAccountExists: registerOperations.checkIfAccountExists,
  updateEmail: accountOperations.updateEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer)
