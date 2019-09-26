import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { Spacing, Colors, RefreshControl } from '~/newUI'
import InvestmentCard from '../InvestmentCard'
import * as R from 'ramda'
import MyInvestmentsEmptyState from '../InvestmentsEmptyState'

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.s6,
    paddingTop: Spacing.s6
  }
})

export default class InvestmentsList extends React.PureComponent {
  componentDidMount () {
    this.updateFiltersAndFetchList()
  }

  updateFiltersAndFetchList = () => {
    const { updateFilters, additionalFilters, startPagination } = this.props
    updateFilters(additionalFilters)
    startPagination(additionalFilters.paymentStatus || 'all')
  }

  onRefresh = () => {
    const { startPagination, additionalFilters } = this.props
    startPagination(additionalFilters.paymentStatus || 'all')
  }

  navigateToDetails = (investment) => {
    const { navigate } = this.props.screenProps.navigation
    navigate('InvestmentDetails', { investment })
  }

  renderInvestments = (investment) => {
    return (
      <InvestmentCard
        onPress={() => this.navigateToDetails(investment.item)}
        key={investment.item._id}
        {...investment}
      />
    )
  }

  onEndReached = () => {
    const { loading, fetchNextPage, additionalFilters } = this.props
    if (!loading) {
      fetchNextPage(additionalFilters.paymentStatus || 'all')
    }
  }

  render () {
    const { investments, loading, endReached } = this.props
    if (R.isEmpty(investments) && !loading) {
      return <MyInvestmentsEmptyState />
    }
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={investments}
        renderItem={this.renderInvestments}
        keyExtractor={({ _id }) => _id}
        onEndReached={!endReached && this.onEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={(
          <RefreshControl
            refreshing={loading}
            onRefresh={this.onRefresh}
          />
        )}
      />
    )
  }
}
