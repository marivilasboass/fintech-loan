import React from 'react'
import { StackNavigator } from '~/UI'

import InvestorTerms from './views/InvestorTerms'
import Suitability from './views/Suitability'
import ConfirmInvestment from './views/ConfirmInvestment'
import SuitabilityIntro from './views/SuitabilityIntro'

const StepNavigation = StackNavigator({
  InvestorTerms: {
    screen: InvestorTerms
  },
  Suitability: {
    screen: Suitability
  },
  ConfirmInvestment: {
    screen: ConfirmInvestment
  },
  SuitabilityIntro: {
    screen: SuitabilityIntro
  }
}, {
  initialRouteName: 'InvestorTerms'
})

export default class AcceptLoanNavigation extends React.PureComponent {
  render () {
    return (
      <StepNavigation screenProps={this.props} />
    )
  }
}
