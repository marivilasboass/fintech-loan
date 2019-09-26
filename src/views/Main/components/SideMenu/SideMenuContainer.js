import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors } from '~/store/account'
import { noticesSelectors } from '~/store/notices'

import SideMenu from './SideMenu'

class SideMenuContainer extends React.PureComponent {
  render () {
    return (<SideMenu {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  activeMenuType: accountSelectors.getActiveMenuType(state),
  flags: accountSelectors.getFlags(state),
  featureFlags: accountSelectors.getFeatureFlags(state),
  noticesNotRead: noticesSelectors.getQtyNoticesNotRead(state),
  isPJ: accountSelectors.getIsPJ(state)
})

export default connect(mapStateToProps)(SideMenuContainer)
