import React, { PureComponent } from 'React'
import { Text, Touch, View } from '~/newUI'

export default class HeaderButton extends PureComponent {
  render () {
    const { text, textStyle, style, onPress, isDisabled } = this.props
    return (
      <Touch disabled={isDisabled} onPress={onPress}>
        <View style={style}>
          <Text.T3 style={textStyle}>{text}</Text.T3>
        </View>
      </Touch>
    )
  }
}
