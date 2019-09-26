import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors } from '~/store/account'
import AmountToInvest from './AmountToInvest'
import { requestLoanOperations } from '~/store/requestLoan'

class AmounToInvestContainer extends React.PureComponent {
  render () {
    return (<AmountToInvest {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  balance: accountSelectors.getBalance(state)
})

const mapDispatchToProps = {
  update: requestLoanOperations.update,
  fetchTotalAvaliableLoans: requestLoanOperations.fetchTotalAvaliableLoans
}

export default connect(mapStateToProps, mapDispatchToProps)(AmounToInvestContainer)
