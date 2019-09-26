import React from 'react'

import Region from './Region'
import { connect } from 'react-redux'
import { accountSelectors } from '~/store/account'

class RegionContainer extends React.PureComponent {
  render () {
    return <Region {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  address: accountSelectors.getAddress(state)
})

export default connect(mapStateToProps, null)(RegionContainer)
