import React from 'react'
import { connect } from 'react-redux'
import { NavigationScreenProp } from 'react-navigation'

import { accountOperations, accountSelectors } from '~/store/account'
import { requestLoanSelectors } from '~/store/requestLoan'
import { SimulatedLoan } from '~/libs/@types/mutual-types/credit-score'

import ConfirmLoan from './ConfirmLoan'
import accountStatuses from '~/constants/accountStatuses'

export type Props = {
  navigation: NavigationScreenProp,
  screenProps: NavigationScreenProp,
  acceptedBorrowerTermsAt: string,
  firstName: string,
  status: accountStatuses,
  loanRequestedPage: string,
  loan: SimulatedLoan,
  fetchAccount: () => { status: accountStatuses },
}

class ConfirmLoanContainer extends React.PureComponent<Props> {
  render () {
    return (<ConfirmLoan {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  acceptedBorrowerTermsAt: accountSelectors.getAcceptedBorrowerTermsAt(state),
  firstName: accountSelectors.getFirstName(state),
  status: accountSelectors.getStatus(state),
  loanRequestedPage: accountSelectors.getTestABFlags(state).loanRequestedPage,
  loan: requestLoanSelectors.getLoan(state)
})

const mapDispatchToProps = {
  fetchAccount: accountOperations.fetchAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmLoanContainer)
