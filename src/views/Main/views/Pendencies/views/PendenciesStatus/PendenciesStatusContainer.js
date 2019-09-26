import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'

import PendenciesStatus from './PendenciesStatus'

class PendenciesStatusContainer extends React.PureComponent {
  render () {
    return (<PendenciesStatus {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  status: accountSelectors.getStatus(state),
  pendencies: accountSelectors.getPendencies(state),
  userType: accountSelectors.getUserType(state),
  pressedFakeConfirmPendenciesButton: accountSelectors.getAccount(state).pressedFakeConfirmPendenciesButton,
  hasActiveLoan: accountSelectors.getFlags(state).hasActiveLoan
})

const mapDispatchToProps = {
  fetchAccount: accountOperations.fetchAccount,
  sendSupport: accountOperations.sendSupport,
  update: accountOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(PendenciesStatusContainer)
