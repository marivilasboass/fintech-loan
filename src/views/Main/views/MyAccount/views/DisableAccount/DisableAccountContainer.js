import React from 'react'
import { connect } from 'react-redux'
import { accountSelectors, accountOperations } from '~/store/account'
import DisableAccount from './DisableAccount'

class DisableAccountContainer extends React.PureComponent {
  render () {
    return (<DisableAccount {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  userType: accountSelectors.getUserType(state),
  error: accountSelectors.getError(state),
  loading: accountSelectors.getLoading(state)
})

const mapDispatchToProps = {
  deleteAccount: accountOperations.deleteAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(DisableAccountContainer)
