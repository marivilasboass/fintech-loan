import React from 'react'
import { StackNavigator } from '~/UI'

import InvestorOnboardingSummary from './views/InvestorOnboardingSummary'
import InvestorOnboardingTutorial from './views/InvestorOnboardingTutorial'
import InvestorProfile from './views/InvestorProfile'
import InvestorOnboardingQuestions from './views/InvestorOnboardingQuestions'

import { connect } from 'react-redux'
import { accountSelectors, accountOperations } from '~/store/account'

const InvestorOnboardingNavigator = StackNavigator({
  InvestorOnboardingQuestions: {
    screen: InvestorOnboardingQuestions
  },
  InvestorOnboardingSummary: {
    screen: InvestorOnboardingSummary
  },
  InvestorOnboardingTutorial: {
    screen: InvestorOnboardingTutorial
  },
  InvestorProfile: {
    screen: InvestorProfile
  }
}, {
  initialRouteName: 'InvestorOnboardingTutorial'
})

class InvestorOnboarding extends React.PureComponent {
  render () {
    return (
      <InvestorOnboardingNavigator screenProps={this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  userInvestorProfile: accountSelectors.getUserInvestorProfile(state)
})

const mapDispatchToProps = {
  update: accountOperations.update,
  saveInvestorOnboardingAnswers: accountOperations.saveInvestorOnboardingAnswers
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorOnboarding)
