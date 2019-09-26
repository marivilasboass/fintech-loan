import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Header as RNEHeader } from 'react-native-elements'
import { Constants } from 'expo'
import Spacing from '../Spacing'

const headerHeight = Spacing.s6 * 3

const styles = StyleSheet.create({
  outerContainerStyles: {
    height: headerHeight,
    zIndex: 1000,
    padding: 0,
    borderBottomWidth: 0
  },

  iosOuterContainerStyles: {
    height: headerHeight + Constants.statusBarHeight,
    paddingTop: Constants.statusBarHeight
  },

  innerContainerStyles: {
    alignItems: 'center'
  }
})

export default class Header extends React.PureComponent {
  render () {
    const { style, statusBarProps, ...otherProps } = this.props

    const isIos = Platform.OS === 'ios'

    const outerContainerStyles = [styles.outerContainerStyles]

    if (isIos) {
      outerContainerStyles.push(styles.iosOuterContainerStyles)
    }

    outerContainerStyles.push(style)

    const defaultStatusBarProps = { barStyle: 'dark-content' }

    return (
      <RNEHeader
        statusBarProps={{ ...defaultStatusBarProps, ...statusBarProps }}
        outerContainerStyles={outerContainerStyles}
        innerContainerStyles={styles.innerContainerStyles}
        {...otherProps}
      />
    )
  }
}
