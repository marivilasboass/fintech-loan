import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'

import HeaderMenu from './HeaderMenu'

class HeaderMenuContainer extends React.PureComponent {
  render () {
    return (<HeaderMenu {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  userType: accountSelectors.getUserType(state),
  profilePicture: accountSelectors.getSmallProfilePicture(state),
  isPJ: accountSelectors.getIsPJ(state)
})

const mapDispatchToProps = {
  update: accountOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenuContainer)
