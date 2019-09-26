import React from 'react'
import { StackNavigator } from '~/UI'

import Filter from './views/Filter'
import City from './views/City'
import State from './views/State'
import LoanMotivesScreen from './views/LoanMotives'
import GendersScreen from './views/Genders'
import Scores from './views/Scores'

const FilterNavigation = StackNavigator({
  Filter: {
    screen: Filter
  },
  City: {
    screen: City
  },
  State: {
    screen: State
  },
  Scores: {
    screen: Scores
  },
  LoanMotivesScreen: {
    screen: LoanMotivesScreen
  },
  GendersScreen: {
    screen: GendersScreen
  }
}, {
  initialRouteName: 'Filter',
  mode: 'modal',
  cardStyle: { backgroundColor: '#FFFFFF', shadowOpacity: 0 }
})

export default class AdvancedFilterNavigation extends React.PureComponent {
  render () {
    return (
      <FilterNavigation screenProps={this.props} />
    )
  }
}
