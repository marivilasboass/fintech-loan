import React from 'react'
import { connect } from 'react-redux'

import { loansSelectors, loansOperations } from '~/store/loans'
import { accountSelectors, accountOperations } from '~/store/account'

import InvestmentDetail from './InvestmentDetail'
import { paginatedLoansOperations } from '~/store/paginatedLoans'

class InvestmentContainer extends React.PureComponent {
  render () {
    return (<InvestmentDetail {...this.props} />)
  }
}

const mapStateToProps = (state, ownProps) => {
  const loan = loansSelectors.getFullById(state, ownProps.navigation.state.params.loanId)
  return {
    loan,
    isSelf: accountSelectors.isSelf(state, loan.borrower._id),
    balance: accountSelectors.getBalance(state),
    hasInvestment: accountSelectors.getFlags(state).hasInvestment
  }
}

const mapDispatchToProps = {
  fetchAccount: accountOperations.fetchAccount,
  fetchAvailableLots: loansOperations.fetchAvailableLots,
  startPagination: paginatedLoansOperations.startPagination
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentContainer)
