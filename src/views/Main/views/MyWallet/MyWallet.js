import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import * as R from 'ramda'

import { Icon, Colors, HeaderButton, FixedHeader, ActivityIndicator, View } from '~/newUI'
import {
  HeaderOfFinancialData, EmptyState, AddAndWithdrawMoneyButtons,
  FinancialStatement, AddMoneyInWallet, CashOut, ErrorState
} from './components'

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})

export default class MyWallet extends React.PureComponent {
  static defaultProps = {
    error: false
  }
  state = {
    addMoney: false,
    inititalLoading: true,
    withdraw: false,
    scroll: 0
  }

  componentDidMount () {
    this.fetchBalanceAndTransactions()
  }

  fetchBalanceAndTransactions = async () => {
    this.setState({ inititalLoading: true })
    await this.props.fetchIuguBalance()
    await this.props.fetchTransactionsNextPage()
    this.setState({ inititalLoading: false })

    const { state: navigationState } = this.props.navigation
    if (navigationState.params && navigationState.params.addMoney) {
      this.setState({ addMoney: true })
      const resetParams = NavigationActions.setParams({ params: { addMoney: false }, key: 'Wallet' })
      this.props.navigation.dispatch(resetParams)
    }
  }

  componentWillUnmount () {
    this.props.resetTransactions()
  }

  buttonAction = action => this.setState({ [action]: true })

  isScroll = scroll => this.setState({ scroll })

  hideAllSheet = () => this.setState({ addMoney: false, withdraw: false })

  renderEmptyState = () => {
    const { balanceError, transactions, transactionsError } = this.props
    if (this.state.inititalLoading) {
      return null
    }
    if (balanceError || transactionsError) {
      return <ErrorState onPress={this.fetchBalanceAndTransactions} />
    }
    if (R.isEmpty(transactions)) {
      return <EmptyState onPress={action => this.buttonAction(action)} />
    }
    return null
  }

  render () {
    const { balance, balanceError, navigation, committedBalance, loading, transactions } = this.props
    const { addMoney, withdraw, inititalLoading } = this.state
    return (
      <React.Fragment>
        <FixedHeader
          leftComponent={(
            <HeaderButton onPress={() => navigation.goBack()}>
              <Icon type='svg' name='ChevronLeft' color={Colors.white} />
            </HeaderButton>
          )}
          centerTitle={'Minha Carteira'}
        />
        <HeaderOfFinancialData hasError={balanceError} loading={loading} balance={balance} committedBalance={committedBalance} reload={this.fetchBalanceAndTransactions} />
        { inititalLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size={44} color={Colors.mutualPink} />
          </View>
        )}
        {this.renderEmptyState()}
        {!R.isEmpty(transactions) && (
          <React.Fragment>
            <AddAndWithdrawMoneyButtons balance={balance} onPress={this.buttonAction} />
            <FinancialStatement fetchBalanceAndTransactions={this.fetchBalanceAndTransactions} scroll={this.isScroll} {...this.props} />
          </React.Fragment>
        )}
        <AddMoneyInWallet active={addMoney} balance={balance} onPress={this.hideAllSheet} navigation={navigation} {...this.props} />
        <CashOut active={withdraw} onPress={this.hideAllSheet} {...this.props} />
      </React.Fragment>
    )
  }
}
