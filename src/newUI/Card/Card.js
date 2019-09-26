import React, { PureComponent } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

import View from '../View'
import Shadow from '../Shadow'
import Colors from '../Colors'

const styles = StyleSheet.create({
  defaultBorder: {
    borderWidth: 1,
    borderColor: Colors.mercury
  },
  borderless: {
    borderWidth: 0,
    borderColor: Colors.mercury
  }
})

export default class Card extends PureComponent {
  render () {
    const { children, style, outerStyle, onPress, borderless, layout, ...props } = this.props
    const [x, y, border, innerStyle] = borderless ? [0, 0, 0, styles.borderless] : [1, 1, 4, styles.defaultBorder]
    return (
      <Shadow
        radius={6} x={x} y={y} layout={layout || 'fillWidth'}
        border={border} color={Colors.nightRider} innerStyle={innerStyle}
        outerStyle={outerStyle} opacity={0.05} {...props}
      >
        <TouchableWithoutFeedback onPress={onPress} >
          <View style={style}>
            { children }
          </View>
        </TouchableWithoutFeedback>
      </Shadow>
    )
  }
}
