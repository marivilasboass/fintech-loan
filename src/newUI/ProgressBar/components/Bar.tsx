import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo'

import { Gradient } from '~/constants/types'
import styleConfig from '../constants/styleConfig'

type Styles = {
  bar: ViewStyle
}

const styles: Styles = StyleSheet.create({
  bar: {
    height: styleConfig.barHeight,
    borderRadius: styleConfig.barHeight / 2
  }
})

type Props = {
  width: number,
  colors: Gradient
}

export default class Bar extends React.PureComponent<Props> {
  render () {
    const { width, colors } = this.props
    return (
      <LinearGradient style={[styles.bar].concat({ width })} start={[0, 1]} end={[1, 0]} colors={colors} />
    )
  }
}