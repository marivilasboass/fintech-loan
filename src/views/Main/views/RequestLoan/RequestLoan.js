import React from 'react'
import { StackNavigator } from '~/UI'

import BasicInformation from './views/BasicInformation'
import BorrowerTerms from './views/BorrowerTerms'
import ConfirmLoan from './views/ConfirmLoan'
import ConfirmPassword from './views/ConfirmPassword'
import LoanQuestionnaire from './views/LoanQuestionnaire'
import Recommendations from './views/Recommendations'
import ToKnowYouBetter from './views/ToKnowYouBetter'

const StepNavigation = StackNavigator({
  LoanQuestionnaire: {
    screen: LoanQuestionnaire
  },
  BasicInformation: {
    screen: BasicInformation
  },
  Recommendations: {
    screen: Recommendations
  },
  ConfirmLoan: {
    screen: ConfirmLoan
  },
  BorrowerTerms: {
    screen: BorrowerTerms
  },
  ConfirmPassword: {
    screen: ConfirmPassword
  },
  ToKnowYouBetter: {
    screen: ToKnowYouBetter
  }
}, {
  initialRouteName: 'LoanQuestionnaire'
})

export default class RequestLoanNavigate extends React.PureComponent {
  render () {
    return (
      <StepNavigation screenProps={this.props} />
    )
  }
}
