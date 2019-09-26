import React from 'react'
import { connect } from 'react-redux'

import { loansSelectors, loansOperations } from '~/store/loans'

import LoanList from './LoanList'

class LoanListContainer extends React.PureComponent {
  render () {
    return (<LoanList {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  loading: loansSelectors.getLoading(state),
  loans: loansSelectors.getFullBorrowerLoans(state)
})

const mapDispatchToProps = {
  fetchBorrowerLoans: loansOperations.fetchBorrowerLoans
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanListContainer)
