import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Text, Colors } from '~/newUI'
import { capitalize } from '~/utils/stringHelper'

const triangleSize = 5
const triangleRightPosition = 5

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGray90,
    flexDirection: 'row',
    padding: 6,
    position: 'absolute',
    zIndex: 9
  },
  month: {
    fontSize: 10,
    color: Colors.mutualBlue,
    alignSelf: 'center'
  },
  triangle: {
    borderLeftWidth: triangleSize,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderRightWidth: triangleSize,
    borderTopWidth: triangleSize,
    borderTopColor: Colors.lightGray90,
    position: 'absolute',
    right: triangleRightPosition
  },
  reversedTriangle: {
    top: -triangleSize,
    borderTopWidth: 0,
    borderBottomWidth: triangleSize,
    borderBottomColor: Colors.lightGray90
  },
  normalTriangle: {
    bottom: -triangleSize
  },
  value: {
    color: Colors.mutualPink
  }
})

export default class Tooltip extends React.Component {
  static defaultProps = {
    dotSize: 10
  }

  state = {
    width: 0,
    height: 0
  }
  render () {
    const { month, value, top, left, reversed, dotSize } = this.props
    const leftPosition = left - this.state.width + triangleRightPosition + triangleSize
    if (typeof top !== 'number' && typeof left !== 'number') {
      return null
    }

    const triangleStyle = [
      styles.triangle,
      reversed && styles.reversedTriangle,
      !reversed && styles.normalTriangle
    ]

    const containerPosition = {
      top: reversed ? top + dotSize : top - this.state.height - dotSize,
      left: leftPosition
    }

    return (
      <View
        onLayout={event => this.setState({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height
        })}
        style={[styles.container].concat(containerPosition)}
      >
        <Text.T5 style={styles.month}>{capitalize(month)} </Text.T5>
        <Text.T5 style={styles.value}>{value}</Text.T5>
        <View style={triangleStyle} />
      </View>
    )
  }
}
