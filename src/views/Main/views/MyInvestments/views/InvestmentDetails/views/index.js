import React, { Component } from 'react'
import { TabNavigator } from '~/newUI'
import Details from './Details'
import Installments from './Installments'

const DetailsTabs = TabNavigator({
  Details: {
    screen: Details
  },
  Installments: {
    screen: Installments
  }
}, {
  initialRouteName: 'Details'
})

export default class DetailsNavigation extends Component {
  render () {
    return (
      <DetailsTabs screenProps={this.props} />
    )
  }
}
