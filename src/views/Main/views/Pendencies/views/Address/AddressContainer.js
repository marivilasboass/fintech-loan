import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'

import Address from './Address'

class AddressContainer extends React.PureComponent {
  render () {
    return (<Address {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  name: accountSelectors.getAccount(state).name,
  username: accountSelectors.getAccount(state).username,
  pendencies: accountSelectors.getPendencies(state)
})

const mapDispatchToProps = {
  update: accountOperations.update,
  submitSingleDocument: accountOperations.submitSingleDocument,
  submitAddress: accountOperations.submitAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressContainer)
