import React from 'react'
import { StyleSheet } from 'react-native'

import { getChildrenOfClass, isNotOfComponentClasses } from '~/utils/elementsHelpers'
import View from '../View'
import Modal from '../Modal'
import Colors from '../Colors'
import Spacing from '../Spacing'

import AlertButton from './components/AlertButton'
import AlertDescription from './components/AlertDescription'
import AlertTitle from './components/AlertTitle'
import DarkHeader from './components/DarkHeader'
import AlertInput from './components/AlertInput'
import AlertImage from './components/AlertImage'
import CloseButton from './components/CloseButton'
import AlertManager from './components/AlertManager'

const styles = StyleSheet.create({
  modalContainer: {
    margin: Spacing.s9
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 6
  },
  content: {
    padding: Spacing.s6
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  invertedSecondaryButton: {
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0
  },
  firstButton: {
    borderLeftWidth: 0,
    borderBottomLeftRadius: 6
  }
})

const convertToInvertedSecondaryButton = (button, i, buttons) => (
  React.cloneElement(button, {
    style: [
      styles.button,
      styles.invertedSecondaryButton,
      (i === 0 && styles.firstButton),
      { flex: (1 / buttons.length) }
    ].concat(button.props.style),
    inverted: true,
    secondary: true,
    key: i
  })
)

const convertToPrimaryButton = (button, i) => (
  React.cloneElement(button, {
    style: [styles.button].concat(button.props.style),
    primary: true,
    bold: true,
    key: i
  })
)

const filterOthers = isNotOfComponentClasses([AlertButton, DarkHeader, CloseButton])

export default class Alert extends React.PureComponent {
    static defaultProps = {
      avoidKeyboard: true
    }

    render () {
      const { children, ...props } = this.props

      const header = getChildrenOfClass(DarkHeader, children)
      const buttons = getChildrenOfClass(AlertButton, children)
      const closeButton = getChildrenOfClass(CloseButton, children)
      const others = filterOthers(children)

      const images = getChildrenOfClass(AlertImage, children)
      const buttonsToRender = images.length === 0
        ? buttons.map(convertToInvertedSecondaryButton)
        : buttons.map(convertToPrimaryButton)

      return (
        <Modal transparent style={styles.modalContainer} {...props}>
          <View style={styles.container}>
            {closeButton}
            {header}
            <View style={styles.content}>
              {others}
            </View>
            <View style={styles.buttons}>
              {buttonsToRender}
            </View>
          </View>
        </Modal>
      )
    }
}

Alert.Title = AlertTitle
Alert.DarkHeader = DarkHeader

Alert.Description = AlertDescription

Alert.Button = AlertButton
Alert.Input = AlertInput
Alert.Image = AlertImage
Alert.CloseButton = CloseButton
Alert.Manager = AlertManager
