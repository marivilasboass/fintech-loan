import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Typography, View, Colors, Spacing } from '~/newUI'
import { ChevronRight } from '~/newUI/Icons'

const styles = StyleSheet.create({
  wrapper: {
    marginTop: Spacing.s7
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.s5
  },
  buttonIcon: {
    alignSelf: 'center',
    marginTop: 2,
    marginLeft: 6
  }
})

export default class TitledContainer extends React.PureComponent {
  render () {
    const { children, title, titleStyle, outerStyle, innerStyle, buttonText, onPress } = this.props
    return (
      <View paddedHorizontally style={[styles.wrapper].concat(outerStyle)}>
        <View style={[styles.container].concat(innerStyle)}>
          <Typography.T3 style={titleStyle} color={Colors.loansTitle}>{title}</Typography.T3>
          {buttonText && (
            <TouchableWithoutFeedback onPress={onPress} >
              <View style={{ flexDirection: 'row' }}>
                <Typography.T4 variant={'bold'} color={Colors.brightBlue}>{buttonText}</Typography.T4>
                <ChevronRight style={styles.buttonIcon} color={Colors.warmGray} width={5} height={8} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        {children}
      </View>
    )
  }
}
