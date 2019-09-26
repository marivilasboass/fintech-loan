import React from 'react'
import { StyleSheet, FlatList } from 'react-native'

import { Colors, Loader, NoResultsView } from '~/UI'
import OwnerLoanCard from '~/components/OwnerLoanCard'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    padding: 15
  },
  loanCard: {
    marginBottom: 20
  }
})

export default class LoanList extends React.PureComponent {
  componentDidMount () {
    this.props.fetchBorrowerLoans()
  }

  navigateToDetailsScreen = (loan) => {
    const { navigation } = this.props
    navigation.navigate('BorrowerLoanDetails', { loan })
  }

  renderOwnerLoanCard = ({ item: loan }) => {
    const { type } = this.props

    return (
      <OwnerLoanCard
        key={loan._id}
        style={styles.loanCard}
        onPress={() => this.navigateToDetailsScreen(loan)}
        {...loan}
        type={type}
      />
    )
  }

  render () {
    const { loans, loading } = this.props

    if (loading) {
      return (
        <Loader.FullScreen />
      )
    }

    if (loans.length === 0) {
      return (
        <NoResultsView>{`Você não possui nenhum empréstimo.`}</NoResultsView>
      )
    }

    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={loans}
        keyExtractor={item => item._id}
        renderItem={this.renderOwnerLoanCard}
      />
    )
  }
}
