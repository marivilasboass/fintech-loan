import React from 'react'
import { connect } from 'react-redux'

import Filter from './Filter'
import { requestLoanSelectors, requestLoanOperations } from '~/store/requestLoan'

class FilterContainer extends React.PureComponent {
  render () {
    return (<Filter {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  totalAvailiable: requestLoanSelectors.getRequestLoanState(state).totalAvailiable,
  totalToInvest: requestLoanSelectors.getTotalToInvestmentCents(state),
  error: requestLoanSelectors.getRequestLoanState(state).error
})
const mapDispatchToProps = {
  getAutomaticMatchResults: requestLoanOperations.getAutomaticMatchResults,
  update: requestLoanOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)
