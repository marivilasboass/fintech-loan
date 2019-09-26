import React from 'react'
import { StyleSheet } from 'react-native'

import { Modal, Text, Spacing, Colors, Button, View } from '~/newUI'
import DocumentTip from './DocumentTip'
import Flash from '../icons/Flash'
import IdIcon from '../icons/IdIcon'
import Light from '../icons/Light'
import Phone from '../icons/Phone'

const styles = StyleSheet.create({
  modal: {
    padding: Spacing.s5,
    paddingTop: Spacing.s12,
    justifyContent: 'space-between'
  },
  title: {
    paddingHorizontal: Spacing.s5,
    color: Colors.darkestGray
  },
  buttonContainer: {
    paddingHorizontal: Spacing.s5
  }
})

export default class DocumentModalTips extends React.PureComponent {
  render () {
    const tips = [
      {
        text: 'Remova o plástico',
        icon: IdIcon
      },
      {
        text: 'Vá até um local claro',
        icon: Light
      },
      {
        text: 'Não use flash',
        icon: Flash
      },
      {
        text: 'Evite tremer',
        icon: Phone,
        withoutBorder: true
      }
    ]
    const { isVisible, onAdvance, onClose } = this.props
    return (
      <Modal
        isVisible={isVisible}
        fullscreen
        containerStyle={styles.modal}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        onCloseModal={onClose}
      >
        <Text.T2 style={styles.title} align='center'>Algumas dicas pra ter sua foto aprovada:</Text.T2>
        {tips.map(tip => (
          <DocumentTip
            key={tip.text}
            text={tip.text}
            Icon={tip.icon}
            withoutBorder={tip.withoutBorder}
          />
        ))}
        <View style={styles.buttonContainer}>
          <Button small secondary onPress={onAdvance}>
            <Text color={Colors.white}>
              Entendi
            </Text>
          </Button>
        </View>
      </Modal>
    )
  }
}
