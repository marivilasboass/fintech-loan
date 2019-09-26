import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'

import { Text, Colors, Spacing, Touch } from '~/newUI'

const styles = StyleSheet.create({
  wrapper: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: Colors.black60,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70
  },
  wrapperWithSteps: {
    height: 70,
    paddingBottom: 10
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: Spacing.s6,
    paddingRight: Spacing.s6
  },
  stepsWrapper: {
    flexDirection: 'row',
    marginTop: 16
  },
  stepOne: {
    marginRight: 20
  },
  stepTwo: {
    marginLeft: 20
  },
  stepperConnect: {
    position: 'absolute',
    width: 55,
    height: 1,
    top: 15,
    left: 28,
    backgroundColor: Colors.white
  },
  stepperContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepperCircle: {
    backgroundColor: Colors.white,
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 1
  },
  stepperText: {
    color: Colors.disabled,
    textAlign: 'center',
    lineHeight: 28
  },
  stepperCircleCompleted: {
    backgroundColor: Colors.disabled
  },
  stepperTextCurrent: {
    color: Colors.brightBlue
  },
  stepperIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const CircleView = ({ style, ...props }) => <View style={[styles.stepperCircle].concat(style)} {...props} />

export default class CameraHeader extends PureComponent {
  static defaultProps = {
    steps: [],
    current: 0
  }

  render () {
    const { steps, current, onClose } = this.props

    if (steps.length !== 0 && steps.length !== 2) {
      throw new Error('Invalid step count')
    }

    return (
      <View style={[styles.wrapper, steps.length > 1 && styles.wrapperWithSteps]}>
        <Touch onPress={() => onClose()} >
          <View style={styles.close}>
            <Icon name='close' size={24} color={Colors.white} />
          </View>
        </Touch>
        {steps.length > 1 ? (
          <View style={styles.stepsWrapper}>
            <View style={[styles.stepperContainer, styles.stepOne]}>
              {current === 0 ? (
                <CircleView>
                  <Text style={[styles.stepperText, styles.stepperTextCurrent]}>1</Text>
                </CircleView>
              ) : (
                <CircleView style={[styles.stepperCircleCompleted, styles.stepperIcon]}>
                  <Icon name='check' size={16} color={Colors.brightBlue} />
                </CircleView>
              )}
              {current === 0 ? <Text.T4 color={Colors.white}>{steps[0].label}</Text.T4> : null}
            </View>
            <View style={styles.stepperConnect} />
            <View style={[styles.stepperContainer, styles.stepTwo]}>
              <CircleView>
                <Text style={[styles.stepperText, current === 1 && styles.stepperTextCurrent]}>2</Text>
              </CircleView>
              {current === 1 ? <Text.T4 color={Colors.white}>{steps[1].label}</Text.T4> : null}
            </View>
          </View>
        ) : null}
      </View>
    )
  }
}
