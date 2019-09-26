import React from 'react'
import { connect } from 'react-redux'
import { accountSelectors, accountOperations } from '~/store/account'
import Bank from './Bank'

class BankContainer extends React.PureComponent {
  render () {
    return (<Bank {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ...accountSelectors.getBank(state),
  status: accountSelectors.getStatus(state),
  error: accountSelectors.getError(state),
  loading: accountSelectors.getLoading(state)
})

const mapDispatchToProps = {
  updateBank: accountOperations.updateBank,
  fetchPendingBankChange: accountOperations.fetchPendingBankChange
}

export default connect(mapStateToProps, mapDispatchToProps)(BankContainer)
