import React from 'react'
import { connect } from 'react-redux'
import { investmentsOperations, investmentsSelectors } from '~/store/investments'
import { accountSelectors } from '~/store/account'

import MyInvestments from './MyInvestments'

class MyInvestmentsContainer extends React.PureComponent {
  render () {
    return (<MyInvestments {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  featureFlags: accountSelectors.getFeatureFlags(state),
  investments: investmentsSelectors.getInvestmentListFull(state, 'all'),
  error: investmentsSelectors.getError(state)
})

const mapDispatchToProps = {
  fetchInvestmentsList: investmentsOperations.startPagination
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInvestmentsContainer)
