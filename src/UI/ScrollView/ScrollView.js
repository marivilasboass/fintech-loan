import React from 'react'
import { ScrollView as RNScrollView } from 'react-native'

export default class ScrollView extends React.PureComponent {
  render () {
    return <RNScrollView keyboardShouldPersistTaps='always' {...this.props} />
  }
}
