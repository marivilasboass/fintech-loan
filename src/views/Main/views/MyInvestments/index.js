import React from 'react'
import { StackNavigator } from '~/UI'

import MyInvestments from './views/MyInvestments'
import InvestmentDetails from './views/InvestmentDetails'

const MyInvestmentsNavigation = StackNavigator({
  MyInvestments: {
    screen: MyInvestments
  },
  InvestmentDetails: {
    screen: InvestmentDetails
  }
}, {
  initialRouteName: 'MyInvestments'
})

export default class InvestmentsNavigation extends React.PureComponent {
  render () {
    return (
      <MyInvestmentsNavigation screenProps={this.props} />
    )
  }
}
