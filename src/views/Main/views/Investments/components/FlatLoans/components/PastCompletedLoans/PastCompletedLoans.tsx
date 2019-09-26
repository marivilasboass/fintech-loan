import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { View, Spacing, Typography, Colors } from '~/newUI'
import LoanCardHeader from '~/components/LoanCardHeader'
import format from '~/services/format'
import moment from 'moment'
import * as R from 'ramda'
import { LoansApproved } from '~/libs/@types/mutual-types/pastCompletedInvestments'
import { fullNameAbbreviation } from '~/utils/stringHelper'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loanTitle: {
    marginBottom: Spacing.s5,
    marginTop: Spacing.s1,
    marginLeft: Spacing.s6
  },
  loanList: {
    flexGrow: 1,
    overflow: 'visible'
  },
  loanCard: {
    borderColor: Colors.loansTitle,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: Spacing.s6,
    marginBottom: Spacing.s6
  }
})

type Props = {
  pastCompletedLoans: LoansApproved[]
}

export default class PastCompletedLoans extends React.PureComponent<Props> {
  flatListRef: FlatList<any>
  setPastCompletedLoans = (item) => {
    const { borrowerMarketplaceData, finalizedSimulation, publishedAt, fullInvestmentAt, score, scoreFull, smallProfilePicture } = item
    const { nickname, address } = borrowerMarketplaceData
    const { city, state } = address
    const { financedAmountCents } = finalizedSimulation
    const investedTime = moment(fullInvestmentAt).from(publishedAt)
    const title = fullNameAbbreviation(nickname)
    return {
      title,
      subtitle: `${city}, ${state}`,
      description: `Captou R$ ${format('newCurrency', financedAmountCents / 100)} ${investedTime}`,
      score,
      scoreFull,
      profilePicture: smallProfilePicture
    }
  }

  renderLoan = ({ item }) => {
    const headerProps = this.setPastCompletedLoans(item)
    return (
      <View style={styles.loanCard}>
        <LoanCardHeader
          key={item._id}
          {...headerProps}
          profilePicture={headerProps.profilePicture}
        />
      </View>
    )
  }

  showHeader = () => {
    return (
      <View>
        <Typography.T3 style={styles.loanTitle} color={Colors.loansTitle}>ÚLTIMOS INVESTIMENTOS CAPTADOS</Typography.T3>
      </View>
    )
  }

  render () {
    const { pastCompletedLoans } = this.props
    if (R.isEmpty(pastCompletedLoans)) {
      return null
    }
    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => { this.flatListRef = ref }}
          contentContainerStyle={styles.loanList}
          data={pastCompletedLoans}
          renderItem={this.renderLoan}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={this.showHeader}
        />
      </View>

    )
  }
}
