import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from './Colors'
import Icon from './Icon'
import ModalSelector from 'react-native-modal-selector'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 6
  },
  select: {
    height: 50,
    padding: 10,
    // Padding for Icon
    paddingRight: 45,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 0
  },
  selectText: {
    fontSize: 14,
    color: Colors.light,
    fontFamily: 'open-sans-regular'
  },
  optionText: {
    color: Colors.primary
  },
  cancel: {
    backgroundColor: Colors.background,
    height: 40
  },
  optionContainer: {
    backgroundColor: Colors.background
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: 10,
    fontSize: 18,
    backgroundColor: Colors.primary,
    color: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5
  }
})

export default class Picker extends React.PureComponent {
  render () {
    const { containerStyle, selectStyle, selectTextStyle, optionTextStyle, optionContainerStyle, cancelStyle, ...otherProps } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        <Icon style={styles.icon} type={'arrowDownMini'} />
        <ModalSelector
          selectStyle={[styles.select, selectStyle]}
          selectTextStyle={[styles.selectText, selectTextStyle]}
          optionTextStyle={[styles.optionText, optionTextStyle]}
          optionContainerStyle={[styles.optionContainer, optionContainerStyle]}
          cancelText='Cancelar'
          cancelStyle={[styles.cancel, cancelStyle]}
          {...otherProps}
        />
      </View>
    )
  }
}
