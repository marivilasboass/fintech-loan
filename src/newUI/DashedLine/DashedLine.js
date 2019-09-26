import React from 'react'
import { Svg } from 'expo'

import View from '../View'
import Colors from '../Colors'

export default class DashedLine extends React.PureComponent {
  state = {
    width: 0
  }
  render () {
    const { width } = this.state
    return (
      <View onLayout={({ nativeEvent }) => this.setState({ width: nativeEvent.layout.width })}>
        <Svg height={1} width={width}>
          <Svg.Line x1={0} x2={width} y={0} strokeDasharray='4 2' stroke={Colors.dashed} />
        </Svg>
      </View>
    )
  }
}
