import React from 'react'
import { TouchableWithoutFeedback, TouchableNativeFeedback, Platform } from 'react-native'
import debounce from 'lodash.debounce'
import R from 'ramda'

export default class Touch extends React.PureComponent {
  render () {
    const { onPress, ...otherProps } = this.props

    const isFunction = typeof onPress === 'function'
    const debouncedOnPress = isFunction
      ? debounce(onPress, 1000, { leading: true, trailing: false })
      : R.identity

    if (Platform.OS === 'ios') {
      return (
        <TouchableWithoutFeedback
          onPress={debouncedOnPress}
          {...otherProps}
        />
      )
    }

    return (
      <TouchableNativeFeedback
        onPress={debouncedOnPress}
        {...otherProps}
      />
    )
  }
}
