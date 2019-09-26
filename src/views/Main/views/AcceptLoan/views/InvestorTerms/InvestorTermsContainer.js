import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'

import InvestorTerms from './InvestorTerms'

class InvestorTermsContainer extends React.PureComponent {
  render () {
    return (<InvestorTerms {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  acceptedInvestorTermsAt: accountSelectors.getAccount(state).acceptedInvestorTermsAt,
  hasToUpdatedSuitability: accountSelectors.getFlags(state).hasToUpdatedSuitability
})

const mapDispatchToProps = {
  acceptTerms: accountOperations.acceptTerms

}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorTermsContainer)
