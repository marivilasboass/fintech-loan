import React from 'react'

import { StackNavigator } from '~/UI'
import { trackNavigationChange } from '~/services/trackNavigationChange'

import Home from './views/Home'
import Login from './views/Login'
import CreateProfile from './views/CreateProfile'
import CreatePassword from './views/CreatePassword'
import Terms from './views/Terms'
import Welcome from './views/Welcome'
import ProfileRejected from './views/ProfileRejected'
import ProfileData from './views/ProfileData'
import CheckCellPhoneNumber from './views/CheckCellPhoneNumber'
import InvestorOnboarding from './views/InvestorOnboarding'

const IntroStackNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  ProfileData: {
    screen: ProfileData
  },
  CheckCellPhoneNumber: {
    screen: CheckCellPhoneNumber
  },
  CreateProfile: {
    screen: CreateProfile
  },
  CreatePassword: {
    screen: CreatePassword
  },
  Terms: {
    screen: Terms
  },
  Welcome: {
    screen: Welcome
  },
  InvestorOnboarding: {
    screen: InvestorOnboarding
  },
  ProfileRejected: {
    screen: ProfileRejected
  }
}, {
  initialRouteName: 'Home'
})

export default class IntroNavigator extends React.PureComponent {
  render () {
    return (
      <IntroStackNavigator
        screenProps={this.props}
        onNavigationStateChange={trackNavigationChange}
      />
    )
  }
}
