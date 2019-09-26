import React from 'react'
import { connect } from 'react-redux'

import { requestLoanOperations } from '~/store/requestLoan'

import LoanQuestionnaire from './LoanQuestionnaire'

class LoanQuestionnaireContainer extends React.PureComponent {
  render () {
    return (<LoanQuestionnaire {...this.props} />)
  }
}

const mapDispatchToProps = {
  update: requestLoanOperations.update
}

export default connect(null, mapDispatchToProps)(LoanQuestionnaireContainer)
