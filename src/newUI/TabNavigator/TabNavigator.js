import { TabNavigator } from 'react-navigation'
import Colors from '../Colors'
import R from 'ramda'

const defaultConfig = {
  ...TabNavigator.Presets.AndroidTopTabs,
  tabBarPosition: 'top',
  tabBarOptions: {
    style: {
      backgroundColor: Colors.mutualBlue
    },
    labelStyle: {
      fontFamily: 'open-sans-regular',
      fontSize: 16
    },
    inactiveTintColor: 'rgba(255,255,255,0.35)',
    activeTintColor: Colors.white,
    indicatorStyle: {
      backgroundColor: Colors.mutualPink
    },
    upperCaseLabel: false
  }
}

export default (screens, config = {}) => {
  const mergedConfig = R.mergeDeepRight(defaultConfig, config)

  return TabNavigator(screens, mergedConfig)
}
