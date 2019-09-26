import * as React from 'react'
import { connect } from 'react-redux'

import { investmentsOperations, investmentsSelectors } from '~/store/investments'
import InvestmentDetails from './InvestmentDetails'

class InvestmentDetailsContainer extends React.Component {
  render () {
    return (<InvestmentDetails {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  installments: investmentsSelectors.getInstallments(state),
  loading: investmentsSelectors.getLoading(state),
  selectedInstallment: investmentsSelectors.getSelectedInstallment(state)
})

const mapDispatchToProps = {
  fetchInstallments: investmentsOperations.fetchInstallments,
  clearInstallment: investmentsOperations.clearInstallment,
  clearInvestment: investmentsOperations.clearInvestment,
  clearInstallments: investmentsOperations.clearInstallments
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentDetailsContainer)
