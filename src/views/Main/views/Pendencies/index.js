import React from 'react'

import { StackNavigator } from '~/UI'

import Address from './views/Address'
import Bank from './views/Bank'
import Identification from './views/Identification'
import Income from './views/Income'
import PendenciesStatus from './views/PendenciesStatus'
import Personal from './views/Personal'

const PendenciesStackNavigator = StackNavigator({
  Address: {
    screen: Address
  },
  Bank: {
    screen: Bank
  },
  Identification: {
    screen: Identification
  },
  Income: {
    screen: Income
  },
  PendenciesStatus: {
    screen: PendenciesStatus
  },
  Personal: {
    screen: Personal
  }
}, {
  initialRouteName: 'PendenciesStatus'
})

export default class Pendencies extends React.PureComponent {
  render () {
    return (
      <PendenciesStackNavigator screenProps={this.props} />
    )
  }
}
