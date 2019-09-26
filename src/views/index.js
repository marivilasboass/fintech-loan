import React from 'react'
import { StackNavigator } from '~/UI'

import Main from './Main'
import Intro from './Intro'

const RootStackNavigator = StackNavigator({
  Intro: {
    screen: Intro
  },
  Main: {
    screen: Main
  }
}, {
  initialRouteName: 'Intro'
})

export default class RootNavigator extends React.PureComponent {
  render () {
    return (
      <RootStackNavigator screenProps={this.props} />
    )
  }
}
