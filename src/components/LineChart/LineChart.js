import React from 'react'
import { Svg } from 'expo'
import { scaleTime, scaleLinear } from 'd3-scale'
import * as shape from 'd3-shape'
import moment from 'moment'
import { StyleSheet } from 'react-native'
import { last } from 'ramda'

import { View } from '~/newUI'
import Tooltip from './components/Tooltip'
import { capitalize } from '~/utils/stringHelper'

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  }
})

export default class LineChart extends React.Component {
  static defaultProps = {
    height: 180,
    width: 320,
    xAxisSize: 25,
    yAxisSize: 25,
    margin: 20
  }

  getPercentageYAxis = () => {
    const { height, yAxisSize } = this.props
    const scaleY = scaleLinear().domain([100, 0]).range([yAxisSize, height - yAxisSize])
    const values = [0, 20, 40, 60, 80, 100]
    return values.map(value => ({
      value,
      x: 0,
      y: scaleY(value)
    }))
  }

  renderPercentageYAxis = () => {
    const { xAxisSize, width, margin } = this.props
    return (
      this.getPercentageYAxis().map(axis => {
        const maxChar = 3
        const charSpace = 5
        const spaceToLine = (maxChar - axis.value.toString().length) * charSpace
        return (
          <React.Fragment key={axis.y}>
            <Svg.Text x={axis.x + spaceToLine} fontSize={10} y={axis.y + 4}>{axis.value}%</Svg.Text>
            <Svg.Line x1={axis.x + xAxisSize} y1={axis.y} x2={width - margin} y2={axis.y} strokeWidth='1' stroke='#f7f8fa' />
          </React.Fragment>
        )
      })
    )
  }

  renderXAxisMonths = () => {
    const { width, xAxisSize, margin, height, lines } = this.props
    const { data } = lines[0]
    const scaleX = scaleTime().domain([data[0].x, data[data.length - 1].x]).range([xAxisSize + 20, width - margin])
    return data.map(item => {
      return (
        <Svg.Text key={item.x} x={scaleX(item.x)} textAnchor='middle' y={height - 10} fontSize={10}>
          {capitalize(moment(item.x).format('MMM'))}
        </Svg.Text>
      )
    })
  }

  getLinesWithDots = () => {
    const { lines, yAxisSize, height, xAxisSize, width, margin } = this.props
    return lines.map(({ color, data }) => {
      const scaleX = scaleTime().domain([new Date(data[0].x), new Date(data[data.length - 1].x)]).range([xAxisSize + 20, width - margin])
      const scaleY = scaleLinear().domain([100, 0]).range([yAxisSize, height - yAxisSize])
      const dots = []
      const line = shape.line()
        .x((d, index) => {
          dots[index] = { x: scaleX(d.x) }
          return scaleX(d.x)
        })
        .y((d, index) => {
          dots[index] = {
            ...dots[index],
            y: scaleY(d.y)
          }
          return scaleY(d.y)
        })(data)
      const tooltip = {
        top: last(dots).y,
        left: last(dots).x,
        month: moment(last(data).x).format('MMM'),
        value: `${last(data).y}%`
      }
      return {
        line,
        dots,
        tooltip,
        color
      }
    })
  }

  renderTooltip = (lines) => {
    const tooltipHeight = 40
    const tooltips = lines.map(({ tooltip }, index) => {
      if (index === 0) {
        const nextLine = lines[index + 1]
        const { top: nextTop } = nextLine.tooltip
        const distance = tooltip.top - nextTop
        const reversed = distance > 0 && distance < tooltipHeight
        return {
          ...tooltip,
          reversed
        }
      }
      const prevLine = lines[index - 1]
      const { top: prevTop } = prevLine.tooltip
      const distance = tooltip.top - prevTop
      const reversed = distance > 0 && distance < tooltipHeight
      return {
        ...tooltip,
        reversed
      }
    })
    return tooltips.map((tooltip, index) => (
      <Tooltip key={`${tooltip.value}-${index}`} {...tooltip} />
    ))
  }

  render () {
    const { height, width, lines } = this.props
    if (!lines || !lines.length) {
      return null
    }
    const linesWithDots = this.getLinesWithDots()
    return (
      <View style={styles.container}>
        {
          this.renderTooltip(linesWithDots)
        }
        <Svg height={height} width={width}>
          <Svg.G>
            {
              this.renderPercentageYAxis()
            }
            {
              linesWithDots.map(({ line, dots, color }, index) => (
                <React.Fragment key={index}>
                  <Svg.Path d={line} stroke={color} fill='none' strokeWidth='2'></Svg.Path>
                  {
                    dots.map(dot => (
                      <Svg.Circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r='4' strokeWidth='2' fill='#fff' stroke={color} />
                    ))
                  }
                </React.Fragment>
              ))
            }
          </Svg.G>
          {this.renderXAxisMonths()}
        </Svg>
      </View>
    )
  }
}
