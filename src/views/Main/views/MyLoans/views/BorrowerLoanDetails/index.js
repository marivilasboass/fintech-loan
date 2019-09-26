import React, { Component } from 'react'
import { TabNavigator } from '~/UI'
import Installments from './views/Installments'
import BorrowerDetails from './views/BorrowerDetails'

const DetailsTabs = TabNavigator({
  BorrowerDetails: {
    screen: BorrowerDetails
  },
  Installments: {
    screen: Installments
  }
}, {
  initialRouteName: 'BorrowerDetails'
})

export default class BorrowerLoanDetails extends Component {
  render () {
    return (
      <DetailsTabs screenProps={this.props} />
    )
  }
}
