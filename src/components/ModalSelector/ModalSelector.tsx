import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Spacing, Colors, Typography } from '~/newUI'
import Selector, { SelectableItem } from 'react-native-modal-selector'

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.veryLightBlue,
    paddingHorizontal: Spacing.s3,
    paddingVertical: Spacing.s1,
    borderRadius: 3,
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  overlayStyle: {
    justifyContent: 'flex-end', 
    padding: 8
  },
  cancelStyle: {
    backgroundColor: Colors.white,
    height: 56,
    justifyContent: 'center'
  },
  cancelTextStyle: {
    color: Colors.brightBlue,
    fontSize: 20,
    fontWeight: 'bold'
  },
  optionTextStyle: {
    color: Colors.black,
    fontSize: 20
  },
  optionStyle: {
    height: 56,
    justifyContent: 'center'
  }
})

type ModalOption = SelectableItem & {
  label: string
  onPress: () => void
}

type Props = {
  modalOptions: ModalOption[]
}


export default class ModalSelector extends React.PureComponent<Props> {
  onSelected = (item: ModalOption) => {
    item.onPress()
  }

  render () {
    const { children, modalOptions } = this.props
    return (
      <Selector
          overlayStyle={styles.overlayStyle}
          data={modalOptions}
          cancelText='Cancelar'
          cancelStyle={styles.cancelStyle}
          cancelTextStyle={styles.cancelTextStyle}
          optionTextStyle={styles.optionTextStyle}
          optionStyle={styles.optionStyle}
          backdropPressToClose
          onChange={item => this.onSelected(item)}
          keyExtractor={item => item.label}
          animationType='fade'
        >
          {children}
        </Selector>
    )
  }
}
