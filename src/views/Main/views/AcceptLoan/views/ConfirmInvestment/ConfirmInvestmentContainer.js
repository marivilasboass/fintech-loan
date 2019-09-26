import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'
import { loansSelectors, loansOperations } from '~/store/loans'
import { paginatedLoansOperations } from '~/store/paginatedLoans'

import ConfirmInvestment from './ConfirmInvestment'

class ConfirmInvestmentContainer extends React.PureComponent {
  render () {
    return (<ConfirmInvestment {...this.props} />)
  }
}

const mapStateToProps = (state, ownProps) => ({
  username: accountSelectors.getUsername(state),
  loan: loansSelectors.getById(state, ownProps.screenProps.navigation.state.params.loanId),
  hasInvestment: accountSelectors.getFlags(state).hasInvestment
})

const mapDispatchToProps = {
  verifyPassword: accountOperations.verifyPassword,
  changeFlagStatus: accountOperations.changeFlagStatus,
  confirmInvestment: loansOperations.confirmInvestment,
  startPagination: paginatedLoansOperations.startPagination
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmInvestmentContainer)
