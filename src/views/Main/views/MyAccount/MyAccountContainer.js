import React from 'react'
import MyAccount from './MyAccount'
import { connect } from 'react-redux'
import { accountSelectors, accountOperations } from '~/store/account'

class MyAccountContainer extends React.PureComponent {
  render () {
    return (
      <MyAccount {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  profilePicture: accountSelectors.getLargeProfilePicture(state),
  status: accountSelectors.getStatus(state),
  remainingPendenciesCount: accountSelectors.getRemainingPendenciesCount(state),
  email: accountSelectors.getEmail(state),
  phone: accountSelectors.getPhone(state),
  pendencies: accountSelectors.getPendencies(state),
  bankName: accountSelectors.getBankName(state)
})

const mapDispatchToProps = {
  logout: accountOperations.logout,
  update: accountOperations.update,
  fetchAccount: accountOperations.fetchAccount,
  updateEmail: accountOperations.updateEmail,
  fetchPendingBankChange: accountOperations.fetchPendingBankChange
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountContainer)
