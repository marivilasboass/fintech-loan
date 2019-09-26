import * as React from 'react'
import { connect } from 'react-redux'

import { investmentsSelectors, investmentsOperations } from '~/store/investments'
import Details from './Details'

class DetailsContainer extends React.Component {
  static navigationOptions = {
    title: 'Detalhes'
  }

  render () {
    return (<Details {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  installments: investmentsSelectors.getInstallments(state),
  loading: investmentsSelectors.getLoading(state)
})

const mapDispatchToProps = {
  selectInstallment: investmentsOperations.selectInstallment,
  fetchInstallments: investmentsOperations.fetchInstallments
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer)
