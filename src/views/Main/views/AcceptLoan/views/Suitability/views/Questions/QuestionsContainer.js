import React from 'react'
import { connect } from 'react-redux'

import Questions from './Questions'
import { accountOperations } from '~/store/account'

class QuestionsContainer extends React.PureComponent {
  render () {
    return <Questions {...this.props} />
  }
}

const mapDispatchToProps = {
  saveInvestorOnboardingAnswers: accountOperations.saveInvestorOnboardingAnswers,
  fetchAccount: accountOperations.fetchAccount
}

export default connect(null, mapDispatchToProps)(QuestionsContainer)
