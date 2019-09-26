import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors } from '~/store/account'

import SuitabilityIntro from './SuitabilityIntro'

class LoanQuestionnaireIntroContainer extends React.PureComponent {
  render () {
    return (<SuitabilityIntro {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  lastAnsweredSuitabilityAt: accountSelectors.getLastAnsweredSuitabilityAt(state)
})

export default connect(mapStateToProps)(LoanQuestionnaireIntroContainer)
