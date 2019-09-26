import React from 'react'
import { StackNavigator } from '~/UI'

import Profile from './views/Profile'
import Questions from './views/Questions'

const SuitabilityNavigator = StackNavigator({
  Profile: {
    screen: Profile
  },
  Questions: {
    screen: Questions
  }
}, {
  initialRouteName: 'Questions'
})

export default class Suitability extends React.PureComponent {
  render () {
    return <SuitabilityNavigator screenProps={this.props} />
  }
}
