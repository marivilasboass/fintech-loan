import React from 'react'
import { StyleSheet } from 'react-native'

import Touch from '../Touch'
import Colors from '../Colors'
import View from '../View'
import Typography from '../Typography'
import Spacing from '../Spacing'
import format from '~/services/format'
import ActivityIndicator from '../ActivityIndicator'

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.lightPink,
    borderRadius: 6,
    height: Spacing.s13,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  title: {
    lineHeight: 20
  },
  timer: {
    opacity: 0.75,
    lineHeight: 14
  },
  backCountdown: {
    height: Spacing.s13,
    position: 'absolute',
    top: 0,
    width: 30,
    left: 0,
    backgroundColor: Colors.black10
  },
  disabled: {
    backgroundColor: Colors.disabled
  }
})

export default class CountdownButton extends React.PureComponent {
  static defaultProps = {
    timer: 300,
    countdown: 300,
    refreshTime: 30
  }

  state = {
    maxWidth: 0
  }

  componentDidUpdate () {
    const { refreshTime, onRefreshNeeded, countdown, disabled } = this.props
    if (disabled) {
      return
    }
    if (countdown === refreshTime && onRefreshNeeded) {
      onRefreshNeeded()
    }
  }

  handleLayout = ({ nativeEvent }) => {
    this.setState({ maxWidth: nativeEvent.layout.width })
  }

  getWidth = () => {
    const { timer: totalTimer, countdown } = this.props
    const { maxWidth } = this.state
    const percentage = countdown / totalTimer * 100
    const widthPercentage = (100 - percentage) / 100
    return maxWidth * widthPercentage
  }

  render () {
    const { title, onPress, disabled, loading } = this.props
    const { countdown } = this.props
    const buttonStyle = [
      styles.button,
      (disabled || loading) && styles.disabled
    ]
    const action = !disabled ? onPress : () => {}

    const content = loading ? (
      <ActivityIndicator size={32} color={Colors.white} />
    ) : (
      <React.Fragment>
        <Typography.H5 style={styles.title} color={Colors.white}>{title}</Typography.H5>
        <Typography.T4 style={styles.timer} color={Colors.white}>{format('minutes', countdown)} min restantes</Typography.T4>
      </React.Fragment>
    )

    return (
      <Touch onPress={action}>
        <View>
          <View style={buttonStyle} onLayout={this.handleLayout}>
            <View style={[styles.backCountdown].concat({ width: this.getWidth() })} />
            {content}
          </View>
        </View>
      </Touch>
    )
  }
}
