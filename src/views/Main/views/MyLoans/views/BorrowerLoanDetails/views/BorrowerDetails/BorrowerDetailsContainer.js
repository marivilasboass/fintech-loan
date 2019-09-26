import React from 'react'
import { connect } from 'react-redux'

import { loansOperations } from '~/store/loans'
import { accountOperations } from '~/store/account'

import BorrowerDetails from './BorrowerDetails'

class BorrowerDetailsContainer extends React.PureComponent {
  static navigationOptions = {
    title: 'Detalhes'
  }

  render () {
    return (<BorrowerDetails {...this.props} />)
  }
}

const mapDispatchToProps = {
  cancel: loansOperations.cancel,
  changeFlagStatus: accountOperations.changeFlagStatus
}

export default connect(null, mapDispatchToProps)(BorrowerDetailsContainer)
