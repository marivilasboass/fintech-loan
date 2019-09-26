import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'

import UserInfo from './UserInfo'

class UserInfoContainer extends React.PureComponent {
  render () {
    return (<UserInfo {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  firstName: accountSelectors.getFirstName(state),
  loading: accountSelectors.getLoading(state),
  balanceError: accountSelectors.getBalanceError(state),
  balance: accountSelectors.getBalance(state)
})

const mapDispatchToProps = {
  fetchIuguBalance: accountOperations.fetchIuguBalance
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoContainer)
