import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'

import View from '../View'
import Colors from '../Colors'
import Bar from './components/Bar'
import { Gradient } from '~/constants/types'
import styleConfig from './constants/styleConfig'

interface Styles {
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: Colors.lightGray,
    height: styleConfig.containerHeight,
    borderRadius: styleConfig.containerHeight / 2,
    paddingHorizontal: styleConfig.paddingHorizontal,
    justifyContent: 'center'
  }
})

type Props = {
  value: number,
  style: ViewStyle,
  colors: Gradient
}
type State = {
  totalWidth: number
}

export default class ProgressBar extends React.PureComponent<Props, State> {
  static defaultProps = {
    value: 0,
    colors: Colors.darkToLightGreen
  }
  state = {
    totalWidth: 0
  }

  getWidth = () => {
    const { totalWidth } = this.state
    const { value } = this.props
    const total = (totalWidth * value) - (styleConfig.paddingHorizontal * 2)
    if (total < 0) {
      return 0
    }
    return total
  }

  render () {
    const width = this.getWidth()
    const { colors, style } = this.props
    return (
      <View style={[styles.container].concat(style)} onLayout={event => this.setState({ totalWidth: event.nativeEvent.layout.width })}>
        <Bar width={width} colors={colors} />
      </View>
    )
  }
}
