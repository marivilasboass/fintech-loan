import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors } from '~/store/account'

import Installments from './Installments'

class InstallmentsContainer extends React.PureComponent {
  static navigationOptions = {
    title: 'Parcelas'
  }

  render () {
    return (<Installments {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  accountId: accountSelectors.getId(state)
})

export default connect(mapStateToProps)(InstallmentsContainer)
