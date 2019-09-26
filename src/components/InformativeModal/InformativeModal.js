import React from 'react'
import { StyleSheet } from 'react-native'

import { Alert, Button, View, Spacing } from '~/newUI'
import AnimatedProgressBar from '~/components/AnimatedProgressBar'
import { ErrorIcon, SuccessIcon } from './Icons'

const styles = StyleSheet.create({
  progress: {
    marginTop: Spacing.s6
  }
})

export default class InformativeModal extends React.PureComponent {
  static defaultProps = {
    timer: 2000,
    onTimerFinish: () => {}
  }

  handleOnBackdropPress = () => {
    const { onBackdropPress, timed } = this.props
    if (!timed) {
      onBackdropPress()
    }
  }

  render () {
    const { headerImage, timer, title, description, buttonText, success, timed, buttonPress, onTimerFinish, onRequestClose, image, onBackdropPress, ...otherProps } = this.props

    return (
      <Alert onBackdropPress={this.handleOnBackdropPress} {...otherProps}>
        <Alert.DarkHeader>
          { onRequestClose && <Alert.CloseButton onPress={onRequestClose} /> }
          { success ? <SuccessIcon /> : <ErrorIcon /> }
          { timed && <AnimatedProgressBar style={styles.progress} onTimerFinish={onTimerFinish} timer={timer} /> }
        </Alert.DarkHeader>
        <Alert.Title>
          {title}
        </Alert.Title>
        <Alert.Description>
          {description}
        </Alert.Description>
        { buttonText && (
          <View style={{ padding: 20 }}>
            <Button secondary title={buttonText} onPress={buttonPress} />
          </View>
        )}
      </Alert>
    )
  }
}
