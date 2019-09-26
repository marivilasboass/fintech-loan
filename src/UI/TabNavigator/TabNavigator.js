import { TabNavigator } from 'react-navigation'
import Colors from '../Colors'
import R from 'ramda'

const defaultConfig = {
  ...TabNavigator.Presets.AndroidTopTabs,
  tabBarPosition: 'top',
  tabBarOptions: {
    style: {
      backgroundColor: Colors.darkGrayishBlue
    },
    labelStyle: {
      fontFamily: 'open-sans-light',
      color: Colors.white,
      fontSize: 16
    },
    indicatorStyle: {
      backgroundColor: Colors.white
    },
    upperCaseLabel: false
  }
}

export default (screens, config = {}) => {
  const mergedConfig = R.mergeDeepRight(defaultConfig, config)

  return TabNavigator(screens, mergedConfig)
}
