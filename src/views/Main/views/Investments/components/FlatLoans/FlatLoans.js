import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import Sentry from 'sentry-expo'
import * as R from 'ramda'
import moment from 'moment'

import format from '~/services/format'
import { Loader } from '~/UI'
import { View, Spacing, Typography, Colors, RefreshControl } from '~/newUI'
import LoanCard from '~/components/LoanCard'
import Banners from '~/views/Main/components/Banners'
/* import InvestedLoanCarousel from '~/components/InvestedLoanCarousel' */
import TitledContainer from '~/components/TitledContainer'
import EmptyMarketPlace from './components/EmptyStates/EmptyMarketplace'
import NoLoansFound from './components/EmptyStates/NoLoansFound'
import PastCompletedLoans from './components/PastCompletedLoans'
<<<<<<< HEAD
import { fullNameAbbreviation } from '~/utils/stringHelper'
=======
>>>>>>> master

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    paddingVertical: Spacing.s6
  },
  loanTitle: {
    marginBottom: Spacing.s5,
    marginTop: Spacing.s7,
    marginLeft: Spacing.s6
  },
  loanList: {
    flexGrow: 1,
    overflow: 'visible'
  },
  loanCard: {
    marginHorizontal: Spacing.s6
  }
})

export default class FlatLoans extends React.Component {
  state = {
    refreshing: false
  }

  shouldComponentUpdate = (prevProps, prevState) => {
    const { loans, loading, currentIndexFlatLoan, endReached } = this.props
    const { refreshing } = this.state

    return (
      prevProps.loans !== loans ||
      prevProps.loading !== loading ||
      prevProps.currentIndexFlatLoan !== currentIndexFlatLoan ||
      prevProps.endReached !== endReached ||
      prevState.refreshing !== refreshing
    )
  }

  componentDidMount = () => {
    const { loans, currentIndexFlatLoan } = this.props

    if (loans && currentIndexFlatLoan < loans.length) {
      this.scrollToIndex()
    }
  }

  scrollToIndex = () => {
    const { currentIndexFlatLoan } = this.props
    if (currentIndexFlatLoan) {
      setTimeout(() => {
        try {
          const offset = currentIndexFlatLoan * 180
          this.flatListRef.scrollToOffset({ animated: true, offset })
        } catch (err) {
          Sentry.captureException(err)
        }
      }, 300)
    }
  }

  onPressLoanCard = (loanId, index) => () => {
    const { navigation, setCurrentIndexFlatLoans } = this.props

    setCurrentIndexFlatLoans(index)

    navigation.navigate('Investment', { loanId })
  }

  renderLoan = ({ item, index }) => {
    const { borrower, initialSimulation, quotasInfo, availableLots, expiresAt } = item
    const { address, name, nickname } = borrower
    const { numberOfTotalQuotas, totalInvestedPercentage } = quotasInfo
    const { investorTotalProfitPercentage, numberOfInstallments, financedAmountCents } = initialSimulation

    const value = format('newCurrency', financedAmountCents / 100)
    const quotaValue = format('newCurrency', availableLots[0].financedAmountCents / 100)
    const daysLeftToExpire = moment(expiresAt).fromNow(true)
    const maxProfit = format('percentage', investorTotalProfitPercentage)
<<<<<<< HEAD
    const title = fullNameAbbreviation(nickname || name)
=======
>>>>>>> master

    const footer = [{ text: 'Solicitado', value: `R$ ${value}` }, { text: 'Cotas', value: `R$ ${quotaValue}` },
      { text: 'Lucro máximo', value: `${maxProfit} / ${numberOfInstallments} m` }]

<<<<<<< HEAD
    const header = { title,
=======
    const header = { title: firstName,
>>>>>>> master
      subtitle: `${address.city}, ${address.state}`,
      description: `Expira em ${daysLeftToExpire}` }

    return (
      <View style={styles.loanCard}>
        <LoanCard
          key={item._id}
          onPress={this.onPressLoanCard(item._id, index)}
          footer={footer}
          header={header}
          total={numberOfTotalQuotas}
          value={numberOfTotalQuotas * totalInvestedPercentage}
          {...item}
        />
      </View>
    )
  }

  showHeader = () => {
    const { navigation, banner, sendBannerPressedEvent } = this.props
    return (
      <View>
        { !R.isEmpty(banner) && (
          <TitledContainer
            title={'LEIA COM ATENÇÃO'}>
            <Banners {...banner} onBannerPress={sendBannerPressedEvent} navigation={navigation} />
          </TitledContainer>
        )}

        {/* myInvestments.length
          ? (
            <TitledContainer
              title={'VOCÊ JÁ INVESTIU EM'}
              outerStyle={{ paddingHorizontal: 0 }}
              innerStyle={{ marginHorizontal: Spacing.s6 }}
            >
              <InvestedLoanCarousel style={{ overflow: 'visible' }} data={myInvestments} {...navigation} />
            </TitledContainer>
          )
          : null  */}
        {<Typography.T3 style={styles.loanTitle} color={Colors.loansTitle}>INVESTIMENTOS DISPONÍVEIS</Typography.T3>}
      </View>
    )
  }

  onEndReached = () => {
    const { loading, fetchNextPage } = this.props
    if (!loading) {
      fetchNextPage()
    }
  }

  onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.props.startPagination()
    this.setState({ refreshing: false })
  }

  showFooterComponent = () => {
    const { endReached, loading, loans, pageSize } = this.props
    const { refreshing } = this.state
    if (refreshing) {
      return null
    }
    if (loading) {
      return <Loader.Footer style={styles.footer} />
    }
    if (endReached || loans.length < pageSize) {
      return <PastCompletedLoans />
    }
    return null
  }

  keyExtractor = (item) => item._id

  render () {
    const { loans, loading, endReached, hasFiltered, pageSize } = this.props
    const { refreshing } = this.state
    if (hasFiltered && R.isEmpty(loans)) {
      return <NoLoansFound />
    }
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.loanList}
          ref={(ref) => { this.flatListRef = ref }}
          data={loans}
          renderItem={this.renderLoan}
          keyExtractor={this.keyExtractor}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          )}
          onEndReached={!endReached && !(loans.length < pageSize) && this.onEndReached}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={!loading && <EmptyMarketPlace />}
          ListHeaderComponent={this.showHeader}
          ListFooterComponent={this.showFooterComponent}
        />
      </View>

    )
  }
}
