import React from 'react'
import { connect } from 'react-redux'

import { requestLoanOperations, requestLoanSelectors } from '~/store/requestLoan'

import Recommendations from './Recommendations'

class RecommendationsContainer extends React.PureComponent {
  render () {
    return (<Recommendations {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  optionsOfLoan: requestLoanSelectors.getOptionsOfLoan(state)
})

const mapDispatchToProps = {
  update: requestLoanOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsContainer)
