import React from 'react'
import { connect } from 'react-redux'

import { accountOperations } from '~/store/account'

import Bank from './Bank'

class BankContainer extends React.PureComponent {
  static navigationOptions = {
    title: 'Banco'
  }

  render () {
    return (<Bank {...this.props} />)
  }
}

const mapDispatchToProps = {
  submitBank: accountOperations.submitBank
}

export default connect(null, mapDispatchToProps)(BankContainer)
