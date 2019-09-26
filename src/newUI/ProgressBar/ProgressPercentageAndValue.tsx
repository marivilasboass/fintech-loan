import React from 'react'
import { StyleSheet } from 'react-native'

import View from '../View'
import Row from '../Row'
import Colors from '../Colors'
import Typography from '../Typography'
import Bar from './components/Bar'
import { Gradient } from '~/constants/types'
import styleConfig from './constants/styleConfig'

const styles = StyleSheet.create({
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
  colors: Gradient,
  percentage: number,
  roi: number,
  loading: boolean
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
    const maxWidth = totalWidth * 0.5
    if (total > maxWidth) {
      return maxWidth
    }
    if (total < 0) {
      return 0
    }
    return total
  }

  render () {
    const width = this.getWidth()
    const { colors, percentage, roi, loading } = this.props
    return (
      <View style={styles.container} onLayout={event => this.setState({ totalWidth: event.nativeEvent.layout.width })}>
        <Row>
          <Row style={{ justifyContent: 'flex-start' }}>
            <Bar width={width} colors={colors} />
            <Typography.T4 style={{ marginLeft: styleConfig.paddingHorizontal }} format='percentage'>{percentage}<Typography.T4> a.a</Typography.T4></Typography.T4>
          </Row>
          <Typography.T4 loading={loading} loaderProps={{ width: 60 }} variant={'bold'} cents format='currency'>{roi}</Typography.T4>
        </Row>
      </View>
    )
  }
}
