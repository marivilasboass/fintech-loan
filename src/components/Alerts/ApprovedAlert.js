import React from 'react'
import { Alert } from '~/newUI'

export default class ApprovedAlert extends React.PureComponent {
  render () {
    const { isInvestor, onRequestClose, ...otherProps } = this.props
    const description = isInvestor
      ? 'Você já pode investir seu dinheiro quando e o quanto quiser.'
      : 'Você já pode solicitar o seu empréstimo'

    return (
      <Alert {...otherProps}>
        <Alert.DarkHeader>
          <Alert.CloseButton onPress={onRequestClose} />
          <Alert.Image />
        </Alert.DarkHeader>
        <Alert.Title>
          Seu perfil foi aprovado!
        </Alert.Title>
        <Alert.Description>
          {description}
        </Alert.Description>
      </Alert>
    )
  }
}
