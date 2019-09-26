import React from 'react'
import { connect } from 'react-redux'
import { accountSelectors } from '~/store/account'

import Profile from './Profile'

class ProfileContainer extends React.PureComponent {
  render () {
    return <Profile {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  userInvestorProfile: accountSelectors.getUserInvestorProfile(state)
})

export default connect(mapStateToProps)(ProfileContainer)
