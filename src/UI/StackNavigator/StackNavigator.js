import { StackNavigator } from 'react-navigation'
import Colors from '../Colors'
import R from 'ramda'

const defaultConfig = {
  headerMode: 'none',
  contentOptions: {
    activeTintColor: Colors.primary
  }
}

export default (screens, config = {}) => {
  const mergedConfig = R.mergeDeepRight(defaultConfig, config)

  return StackNavigator(screens, mergedConfig)
}
