import React from 'react'
import {
  StyleSheet,
  PanResponder,
  FlatList,
  View,
  Animated
} from 'react-native'
import R from 'ramda'
import moment from 'moment'

import { Colors, RefreshControl } from '~/newUI'
import FinancialMessage from '../FinancialMessage'
import TransactionDetail from '../TransactionDetail'
import { Loader } from '~/UI'
import FinancialItem from '../FinancialItem'

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 20
  },

  footer: {
    paddingVertical: 20
  }
})

export default class FinancialStatement extends React.PureComponent {
  state = {
    pan: new Animated.ValueXY(),
    fetchingNextPage: false,
    activeTransaction: null,
    refreshing: false
  }

  componentDidMount = () => {
    this.nextPage()
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => R.T,
    onStartShouldSetPanResponderCapture: () => R.F,
    onMoveShouldSetPanResponderCapture: () => R.T,
    onPanResponderRelease: (event, { dy }) => {
      if (dy < 0) {
        this.props.scroll(-100)
      }
    },
    onPanResponderMove: Animated.event([null, { dy: this.state.pan.y }])
  })

  onScroll = (event) => {
    const positionY = event.nativeEvent.contentOffset.y
    if (positionY <= 0) {
      this.props.scroll(0)
    }
  }

  handleRefresh = () => {
    this.props.resetTransactions()
    this.props.fetchBalanceAndTransactions()
  }

  onLayoutScroll = ({ nativeEvent }) => this.setState({ scrollHeight: nativeEvent.layout.height })

  showTransactionModal = activeTransaction => {
    this.setState({ activeTransaction })
  }

  hideTransactionModal = () => {
    this.setState({ activeTransaction: null })
  }

  dateFormat = (date) => {
    const momentDate = moment(date)

    if (momentDate.calendar().includes('Hoje')) {
      return momentDate.format('[Hoje,] DD [de] MMMM').toUpperCase()
    }

    return momentDate.format('DD [de] MMMM').toUpperCase()
  }

  nextPage = async () => {
    const { noMoreTransactions, fetchTransactionsNextPage } = this.props
    const { fetchingNextPage } = this.state

    if (!fetchingNextPage && !noMoreTransactions) {
      this.setState({ fetchingNextPage: true })
      await fetchTransactionsNextPage()
      this.setState({ fetchingNextPage: false })
    }
  }

  renderMessages = () => {
    const { noMoreTransactions } = this.props

    if (noMoreTransactions) {
      return (<FinancialMessage message='noMoreTransactions' />)
    }

    return null
  }

  render () {
    const { transactions, noMoreTransactions } = this.props
    const { refreshing, activeTransaction, fetchingNextPage } = this.state

    return (
      <React.Fragment>
        <View style={styles.container}>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.date}
            onEndReachedThreshold={0.1}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
              />
            )}
            onEndReached={this.nextPage}
            ListFooterComponent={fetchingNextPage && !refreshing ? <Loader.Footer style={styles.footer} /> : this.renderMessages}
            extraData={noMoreTransactions}
            renderItem={({ item }) => (
              <FinancialItem item={item} onTransactionDetail={this.showTransactionModal} />
            )}
          />
        </View>

        <TransactionDetail
          transaction={activeTransaction}
          onPress={this.hideTransactionModal}
          {...this.props}
        />
      </React.Fragment>
    )
  }
}
