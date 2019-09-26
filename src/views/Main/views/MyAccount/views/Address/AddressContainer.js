import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors } from '~/store/account'

import Address from './Address'

class AddressContainer extends React.PureComponent {
  render () {
    return (<Address {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ...accountSelectors.getAddress(state)
})

export default connect(mapStateToProps)(AddressContainer)
