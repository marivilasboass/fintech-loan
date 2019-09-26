import React from 'react'
import { connect } from 'react-redux'
import { registerOperations, registerSelectors } from '~/store/register'
import { accountSelectors, accountOperations } from '~/store/account'

import Welcome from './Welcome'

class WelcomeContainer extends React.PureComponent {
  render () {
    return (<Welcome {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  accountError: accountSelectors.getError(state),
  registerError: registerSelectors.getError(state),
  _id: accountSelectors.getId(state),
  status: accountSelectors.getStatus(state),
  userType: accountSelectors.getUserType(state),
  firstName: accountSelectors.getFirstName(state),
  gender: accountSelectors.getGender(state)
})

const mapDispatchToProps = {
  register: registerOperations.register,
  update: accountOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)
