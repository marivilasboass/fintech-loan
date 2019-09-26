import React from 'react'

import { TabNavigator } from '~/newUI'
import { InvestmentsList, PaidList, LateList } from '../../components'

const ListTabs = TabNavigator({
  All: {
    navigationOptions: { title: 'Todos' },
    screen: (props) => (
      <InvestmentsList
        {...props}
        additionalFilters={{ paymentStatus: '' }}
      />
    )
  },
  Paid: {
    navigationOptions: { title: 'Em dia' },
    screen: (props) => (
      <PaidList
        {...props}
        additionalFilters={{ paymentStatus: 'regular' }}
      />
    )
  },
  Late: {
    navigationOptions: { title: 'Em atraso' },
    screen: (props) => (
      <LateList
        {...props}
        additionalFilters={{ paymentStatus: 'late' }}
      />
    )
  }
}, {
  initialRouteName: 'All'
})

export default class List extends React.PureComponent {
  render () {
    return (
      <ListTabs screenProps={this.props} />
    )
  }
}
