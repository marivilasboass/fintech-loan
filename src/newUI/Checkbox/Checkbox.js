import React from 'react'

import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Svg } from 'expo'

import Colors from '../Colors'
import View from '../View'
import Text from '../Text'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    marginRight: 10
  },
  text: {
    flex: 1,
    lineHeight: 18,
    justifyContent: 'center'
  }
})

export default class Checkbox extends React.Component {
    static defaultProps = {
      checked: false,
      label: '',
      onChange: () => { throw new Error('No onChange defined') }
    }

    handlePress = () => {
      const { onChange, checked } = this.props

      onChange(!checked)
    }

    render () {
      const { style, label, textStyle, checked, boxStyle, textVariant } = this.props

      const [ backgroundColor, borderColor ] = checked
        ? [Colors.brightBlue, Colors.brightBlue]
        : [Colors.white, Colors.border]

      const boxContainer = [
        styles.box,
        { backgroundColor, borderColor }
      ]

      return (
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={[styles.container].concat(style)}>
            <View style={[boxContainer].concat(boxStyle)}>
              <Svg width='20' height='15' >
                <Svg.Path d='M7.3000704,14.27 C6.9548879,14.27 6.6103796,14.136405 6.3467734,13.86853 L0,7.418975 L1.9065939,5.48082 L7.3000704,10.96164 L18.0870232,0 L19.9936172,1.938155 L8.2533673,13.86853 C7.9897612,14.136405 7.6452529,14.27 7.3000704,14.27 Z' fill='#FFFFFF' fillRule='nonzero' />
              </Svg>
            </View>
            <Text.T3 color={Colors.darkestGray} style={[styles.text].concat(textStyle)} variant={textVariant}>{label}</Text.T3>
          </View>
        </TouchableWithoutFeedback>
      )
    }
}
