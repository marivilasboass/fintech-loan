import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { getStorybookUI, configure } from '@storybook/react-native'
import { environment } from '~/../config.json'
import { loadStories } from './storyLoader'

// import stories
configure(() => {
  loadStories()
}, module)

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = getStorybookUI({})

// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {
  render () {
    return environment === 'production' ? null
      : <StorybookUIRoot />
  }
}

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIHMRRoot)
export default StorybookUIHMRRoot
