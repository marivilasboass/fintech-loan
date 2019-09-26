import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'
import { transactionsSelectors, transactionsOperations } from '~/store/transactions'
import { usersOperations, usersSelectors } from '~/store/users'

import MyWallet from './MyWallet'

class MyWalletContainer extends React.PureComponent {
  render () {
    return (<MyWallet {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  balance: accountSelectors.getBalance(state),
  balanceError: accountSelectors.getBalanceError(state),
  committedBalance: accountSelectors.getCommittedBalanceCents(state),
  requestedMoney: accountSelectors.getRequestedMoney(state),
  loading: accountSelectors.getLoading(state),
  smallProfilePicture: accountSelectors.getSmallProfilePicture(state),
  transactions: transactionsSelectors.getTransactions(state),
  transactionsError: transactionsSelectors.getTransactionsError(state),
  noMoreTransactions: transactionsSelectors.getEndReached(state),
  getUserById: (id) => usersSelectors.getById(state, id)
})

const mapDispatchToProps = {
  fetchAccount: accountOperations.fetchAccount,
  fetchIuguBalance: accountOperations.fetchIuguBalance,
  requestWithdrawal: accountOperations.requestWithdrawal,
  fetchPendingBankChange: accountOperations.fetchPendingBankChange,
  update: accountOperations.update,
  verifyPassword: accountOperations.verifyPassword,
  fetchUser: usersOperations.fetchUser,
  fetchTransactionsNextPage: transactionsOperations.fetchNextPage,
  resetTransactions: transactionsOperations.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletContainer)
