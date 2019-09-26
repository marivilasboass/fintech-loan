import * as React from 'react'
import { connect } from 'react-redux'

import { investmentsSelectors } from '~/store/investments'
import Installments from './Installments'
import { fetchInstallments } from '~/store/investments/operations'

class InstallmentsContainer extends React.Component {
  static navigationOptions = {
    title: 'Parcelas'
  }

  render () {
    return (<Installments {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  installments: investmentsSelectors.getInstallments(state),
  loading: investmentsSelectors.getLoading(state)
})

const mapDispatchToProps = {
  fetchInstallments
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallmentsContainer)
