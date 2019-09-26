import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { View, Colors, Typography, Row, Spacing, Text, Touch, ActivityIndicator } from '~/newUI'
import { ChevronRight } from '~/newUI/Icons'
import { Add, Remove } from '../icons'

const buttonHeight = 54

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mutualPink,
    height: buttonHeight,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center'
  },
  control: {
    backgroundColor: '#CD2B66',
    position: 'relative',
    justifyContent: 'center',
    height: buttonHeight,
    paddingHorizontal: Spacing.s5
  },
  quotas: {
    paddingHorizontal: Spacing.s2
  },
  absoluteTouch: {
    position: 'absolute',
    top: 0,
    height: buttonHeight
  },
  investButton: {
    height: buttonHeight,
    paddingRight: Spacing.s6,
    paddingLeft: Spacing.s5,
    flex: 1
  },
  disabled: {
    backgroundColor: Colors.disabled
  }
})

export default class InvestmentControlButton extends React.PureComponent {
  state = {
    width: 0
  }

  onAdd = () => {
    const { onAdd, disabled } = this.props
    if (!disabled) {
      onAdd()
    }
  }

  onRemove = () => {
    const { onRemove, disabled } = this.props
    if (!disabled) {
      onRemove()
    }
  }

  onPress = () => {
    const { onPress, disabled } = this.props
    if (!disabled) {
      onPress()
    }
  }

  render () {
    const { selectedLots, onAdd, loading, onRemove, disabled, totalToInvestCents, onPress } = this.props
    const { width } = this.state

    const containerStyle = [
      styles.container,
      disabled && styles.disabled,
      loading && styles.disabled
    ]
    const controlStyle = [
      styles.control,
      disabled && styles.disabled
    ]
    return (
      <View style={containerStyle}>
        {
          loading ? (
            <ActivityIndicator size={32} color={Colors.white} />
          ) : (
            <Row style={{ justifyContent: 'flex-start' }}>
              <Row style={controlStyle} onLayout={({ nativeEvent }) => this.setState({ width: nativeEvent.layout.width })}>
                <Remove />
                <Typography.T2 style={styles.quotas} color={Colors.white}>{selectedLots.length} {selectedLots.length === 1 ? 'cota' : 'cotas'}</Typography.T2>
                <Add />
                <TouchableWithoutFeedback disabled={disabled} onPress={onRemove}>
                  <View style={[styles.absoluteTouch].concat({ width: width / 2, left: 0 })} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback disabled={disabled} onPress={onAdd}>
                  <View style={[styles.absoluteTouch].concat({ width: width / 2, right: 0 })} />
                </TouchableWithoutFeedback>
              </Row>
              <Touch disabled={disabled} onPress={onPress}>
                <Row style={styles.investButton}>
                  <Text>
                    <Text fontSize={16} variant='light' color={Colors.white}>R$ </Text>
                    <Text fontSize={16} format='newCurrency' color={Colors.white}> {totalToInvestCents}</Text>
                  </Text>
                  <Row style={{ justifyContent: 'flex-end' }}>
                    <Typography.T1 color={Colors.white}>Investir</Typography.T1>
                    <ChevronRight style={{ marginLeft: 10, marginTop: 2 }} color={Colors.rgbaWhiteOpacity(0.5)} />
                  </Row>
                </Row>
              </Touch>
            </Row>
          )
        }
      </View>
    )
  }
}
