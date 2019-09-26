import React from 'react'

import { Colors, View } from '~/newUI'
import { StyleSheet } from 'react-native'

const paddingSize = 4

const styles = StyleSheet.create({
  outerBar: {
    backgroundColor: Colors.darkBlue,
    height: 12,
    borderRadius: 5,
    padding: paddingSize,
    alignSelf: 'stretch'
  },
  innerBar: {
    backgroundColor: Colors.mutualPink,
    height: 4,
    borderRadius: 2
  }

})
export default class AnimatedProgressBar extends React.PureComponent {
  static defaultProps = {
    timer: 2000,
    interval: 50,
    reversed: false,
    initialTimer: 0
  }

  state = {
    timer: this.props.initialTimer,
    totalWidth: 0
  }

  componentDidMount () {
    const { interval, timer: totalTimer, reversed } = this.props
    const { timer } = this.state
    if (reversed && timer === 0) {
      this.setState({ timer: totalTimer })
    }
    this.interval = setInterval(reversed ? this.setReversedTimer : this.setNormaltimer, interval)
  }

  componentWillUnmount () {
    this.unsetInterval()
  }

  unsetInterval = () => {
    this.interval && clearInterval(this.interval)
  }

  setReversedTimer = () => {
    const { interval, onTimerFinish } = this.props
    const { timer } = this.state
    if (timer <= 0) {
      this.unsetInterval()
      onTimerFinish && onTimerFinish()
      return
    }
    this.setState({ timer: timer - interval })
  }

  setNormaltimer = () => {
    const { interval, timer: totalTimer, onTimerFinish } = this.props
    const { timer } = this.state
    if (timer >= totalTimer) {
      this.unsetInterval()
      onTimerFinish && onTimerFinish()
      return
    }
    this.setState({ timer: timer + interval })
  }

  getInnerWidth = () => {
    const { timer, totalWidth } = this.state
    const { timer: totalTimer, reversed } = this.props
    const padding = reversed ? 0 : paddingSize * 2
    return timer / totalTimer * totalWidth - padding
  }

  render () {
    const width = this.getInnerWidth()
    const { style } = this.props
    return (
      <View style={[styles.outerBar].concat(style)} onLayout={({ nativeEvent }) => this.setState({ totalWidth: nativeEvent.layout.width })}>
        <View style={[styles.innerBar].concat({ width })} />
      </View>
    )
  }
}
