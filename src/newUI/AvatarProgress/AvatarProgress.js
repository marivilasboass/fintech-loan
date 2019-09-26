import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Svg } from 'expo'
import * as shape from 'd3-shape'

import Colors from '../Colors'
import Spacing from '../Spacing'
import View from '../View'

const chartSize = 58
const svgSize = 62

const styles = StyleSheet.create({
  overlayContainer: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: Colors.white
  },
  content: {
    padding: Spacing.s1
  },
  chart: {
    position: 'absolute',
    top: -2,
    left: -2
  },
  reverse: {
    transform: [{ scaleX: -1 }]
  },
  title: {
    color: Colors.primary
  }
})

export default class AvatarProgress extends React.PureComponent {
  renderAvatar = () => {
    const { picture, icon, style, total, value, error, ...otherProps } = this.props
    return (
      <Avatar
        overlayContainerStyle={styles.overlayContainer}
        titleStyle={styles.title}
        rounded
        source={picture ? { uri: picture } : null}
        icon={icon || { name: 'account-circle' }}
        activeOpacity={0.7}
        medium
        {...otherProps}
      />
    )
  }

  renderArcs = (item) => {
    return shape.arc()
      .outerRadius(chartSize / 2)
      .padAngle(0)
      .cornerRadius(2)
      .innerRadius((chartSize - 8) / 2)(item)
  }

  renderTotal = () => {
    const { total } = this.props
    const chart = shape.pie()
      .value(value => value)([total])
    return (
      <Svg.Path
        d={this.renderArcs(chart[0])}
        fill={Colors.dashed}
        stroke={Colors.dashed}
      />
    )
  }

  renderValue = () => {
    const { total, value: chartValue, error } = this.props
    if (!chartValue) {
      return null
    }
    const totalValue = total - chartValue
    const chart = shape.pie()
      .value(({ value }) => value)([{ value: chartValue }, { value: totalValue }])
    return (
      <Svg.Path
        d={this.renderArcs(chart[0])}
        fill={error ? Colors.error : Colors.green}
        stroke={error ? Colors.error : Colors.green}
      />
    )
  }

  render () {
    const { total, value } = this.props
    const reverse = total / 2 > value

    const chartStyle = [
      styles.chart,
      reverse && styles.reverse
    ]
    return (
      <View style={styles.content}>
        <Svg width={svgSize} style={chartStyle} height={svgSize}>
          <Svg.G x={svgSize / 2} y={svgSize / 2}>
            {this.renderTotal()}
            {this.renderValue()}
          </Svg.G>
        </Svg>
        {this.renderAvatar()}
      </View>
    )
  }
}
