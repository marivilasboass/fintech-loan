import React from 'react'
import { KeyboardAwareScrollView as PackageKeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class KeyboardAwareScrollView extends React.PureComponent {
  render () {
    return (
      <PackageKeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps='always'
        scrollEnabled
        {...this.props}
      />
    )
  }
}
