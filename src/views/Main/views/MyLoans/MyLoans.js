import React from 'react'

import { StackNavigator } from '~/UI'
import Skeleton from '~/components/Skeleton'

import BorrowerLoanDetails from './views/BorrowerLoanDetails'
import LoanList from './views/LoanList'

const MyLoansNavigator = StackNavigator({
  LoanList: {
    screen: LoanList
  },
  BorrowerLoanDetails: {
    screen: BorrowerLoanDetails
  }
}, {
  initialRouteName: 'LoanList'
})

export default class MyLoans extends React.PureComponent {
  render () {
    return (
      <Skeleton
        banner='Meus empréstimos'
        navigation={this.props.navigation}
      >
        <MyLoansNavigator screenProps={this.props} />
      </Skeleton>
    )
  }
}
