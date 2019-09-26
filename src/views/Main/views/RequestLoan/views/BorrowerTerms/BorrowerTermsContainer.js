import React from 'react'
import { connect } from 'react-redux'

import { accountOperations } from '~/store/account'

import BorrowerTerms from './BorrowerTerms'

class BorrowerTermsContainer extends React.PureComponent {
  render () {
    return (<BorrowerTerms {...this.props} />)
  }
}

const mapDispatchToProps = {
  fetchAccount: accountOperations.fetchAccount,
  acceptTerms: accountOperations.acceptTerms
}

export default connect(null, mapDispatchToProps)(BorrowerTermsContainer)
