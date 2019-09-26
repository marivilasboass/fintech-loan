import React from 'react'
import { KeyboardAwareScrollView as PackageKeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class KeyboardAwareScrollView extends React.PureComponent {
  render () {
    return (
      <PackageKeyboardAwareScrollView
        keyboardShouldPersistTaps='always'
        {...this.props}
      />
    )
  }
}
