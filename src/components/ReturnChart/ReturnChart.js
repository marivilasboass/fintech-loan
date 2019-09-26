import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Card, View, Colors, Typography, Spacing, InfoIcon } from '~/newUI'
import { Svg } from 'expo'
import { scaleLinear } from 'd3-scale'
import * as shape from 'd3-shape'
import * as d3 from 'd3'
import format from '~/services/format'
import descriptionTexts from '~/constants/dashboardDescriptions'

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.s4
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class ReturnChart extends React.Component {
  state = {
    width: 0
  }

  renderCircle = (filled) => (
    <Svg height={10} width={10}>
      <Svg.Ellipse cx={5} cy={5} fill={filled ? Colors.brightBlue : 'none'} rx={4} ry={4} strokeWidth={2} stroke={Colors.brightBlue} />
    </Svg>
  )

  renderTitle = () => {
    const { onPressInfo } = this.props
    return (
      <View style={styles.titleContainer}>
        <TouchableWithoutFeedback onPress={() => onPressInfo ? onPressInfo({ title: 'Máximo', text: descriptionTexts.maximum }) : {}}>
          <View style={[styles.title].concat({ marginRight: Spacing.s6 })}>
            {this.renderCircle(true)}
            <Typography.T4 style={{ marginRight: Spacing.s1 }}> Máximo</Typography.T4>
            <InfoIcon />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onPressInfo ? onPressInfo({ title: 'Esperado', text: descriptionTexts.adjusted }) : {}}>
          <View style={styles.title}>
            {this.renderCircle()}
            <Typography.T4 style={{ marginRight: 3 }}> Esperado</Typography.T4>
            <InfoIcon />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  renderLines = () => {
    const { hired, expected } = this.props
    const { width } = this.state
    if (!width) {
      return null
    }
    const expectedPercentage = expected / hired
    const scaleY = scaleLinear().domain([100, 0]).range([0, 85])
    const scaleX = scaleLinear().domain([0, 100]).range([0, width - 5])
    const firstLine = d3.line()
      .curve(d3.curveBasis)
      .x(({ x }) => scaleX(x))
      .y(({ y }) => scaleY(y))([
        { x: 0, y: 0 },
        { x: 45, y: 25 },
        { x: 100, y: 100 }
      ])
    const secondLine = shape.line()
      .curve(d3.curveBasis)
      .x(({ x }) => scaleX(x))
      .y(({ y }) => scaleY(y))([
        { x: 0, y: 0 },
        { x: 50, y: expectedPercentage * 25 },
        { x: 100, y: expectedPercentage * 95 }
      ])
    return (
      <Svg.G x={0} y={25}>
        <Svg.Path d={firstLine} stroke={Colors.brightBlue} fill='none' strokeWidth={2} />
        <Svg.Ellipse x={scaleX(100)} y={scaleY(100)} fill={Colors.brightBlue} rx={4} ry={4} strokeWidth={2} stroke={Colors.brightBlue} />
        <Svg.Text fontSize={14} fontFamily='Lato-Regular, Lato' fill={Colors.brightBlue} x={scaleX(100) + 5} y={scaleY(100) - 10} textAnchor='end'>{`${format('percentage', hired * 100)} `}</Svg.Text>
        <Svg.Path d={secondLine} stroke={Colors.brightBlue} fill='none' strokeDasharray=' 4, 4' strokeWidth={2} />
        <Svg.Ellipse x={scaleX(100)} y={scaleY(expectedPercentage * 95)} fill={Colors.white} rx={4} ry={4} strokeWidth={2} stroke={Colors.brightBlue} />
        <Svg.Text fontSize={14} fontFamily='Lato-Regular, Lato' fill={Colors.brightBlue} x={scaleX(100) + 5} y={scaleY(expectedPercentage * 100) + 40} textAnchor='end'>{`${format('percentage', expected * 100)} `}</Svg.Text>
      </Svg.G>
    )
  }

  render () {
    const { width } = this.state
    const { hired, expected } = this.props
    if (!hired || !expected) {
      return null
    }
    return (
      <Card shadowProps={{ x: 0, y: 0, opacity: 0.5 }} style={{ height: 190 }} outerStyle={{ marginBottom: Spacing.s6 }}>
        <View style={{ padding: 20 }}>
          {this.renderTitle()}
          <View onLayout={({ nativeEvent }) => this.setState({ width: nativeEvent.layout.width })}>
            <Svg height={120} width={width}>
              {this.renderLines()}
            </Svg>
          </View>
        </View>
      </Card>
    )
  }
}
