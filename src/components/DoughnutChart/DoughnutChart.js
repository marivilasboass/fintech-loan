import React from 'react'
import * as shape from 'd3-shape'
import { Svg } from 'expo'

import { Spacing, Text, View, Colors } from '~/newUI'

export default class DoughnutChart extends React.Component {
  static defaultProps = {
    arcsSpace: 0,
    margin: Spacing.s6
  }

  getArcPathToSvg = (item) => {
    const { size, arcsSpace, margin } = this.props
    const radius = size / 2 - margin
    const innerRadius = (radius) * 0.6
    return shape.arc()
      .outerRadius(radius)
      .padAngle(arcsSpace)
      .innerRadius(innerRadius)(item)
  }

  render () {
    const { size, data, total, margin } = this.props
    const chartData = data.every(({ value }) => value === 0) ? [{ value: 5, color: Colors.warmGray }] : data
    const centerPosition = size / 2
    const fontSize = (size - margin) * 0.12
    const arcs = shape.pie()
      .value(({ value }) => value)(chartData)
    return (
      <View style={{ height: size, width: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} style={{ position: 'absolute' }} height={size}>
          <Svg.G x={centerPosition} y={centerPosition}>
            {chartData.map(
              (item, index) => item.value ? (
                <Svg.Path
                  key={index}
                  d={this.getArcPathToSvg(arcs[index])}
                  fill={item.color}
                  stroke={item.color}
                />
              ) : null
            )}
          </Svg.G>
        </Svg>
        <Text variant='bold' align='center' style={{ fontSize, color: Colors.nightRider }}>{total}</Text>
      </View>
    )
  }
}
