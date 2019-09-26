import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'

import View from '../View'
import Colors from '../Colors'
import Spacing from '../Spacing'

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.veryLightBlue,
    paddingHorizontal: Spacing.s3,
    paddingVertical: Spacing.s1,
    borderRadius: 3,
    flexDirection: 'row',
    alignSelf: 'flex-start'
  }
})

type Props = {
  align: 'flex-start' | 'flex-end' | 'center',
  style?: ViewStyle
}

export default class Tag extends React.PureComponent<Props> {
  static defaultProps: Props = {
    align: 'flex-start'
  }

  render () {
    const { children, align, style } = this.props
    const tagStyle = {
      ...styles.tag,
      ...style,
      alignSelf: align
    }
    return (
      <View style={tagStyle}>
        {children}
      </View>
    )
  }
}
