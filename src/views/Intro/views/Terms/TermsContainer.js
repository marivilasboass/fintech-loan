import React from 'react'
import { connect } from 'react-redux'

import { registerOperations, registerSelectors } from '~/store/register'
import { accountSelectors, accountOperations } from '~/store/account'

import Terms from './Terms'

class TermsContainer extends React.PureComponent {
  render () {
    return (<Terms {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  accountError: accountSelectors.getError(state),
  registerError: registerSelectors.getError(state),
  _id: accountSelectors.getId(state),
  status: accountSelectors.getStatus(state),
  userType: accountSelectors.getUserType(state)
})

const mapDispatchToProps = {
  update: accountOperations.update,
  register: registerOperations.register
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsContainer)
