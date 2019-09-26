import React from 'react'
import { Alert } from '~/newUI'

export default class ExitModal extends React.PureComponent {
  render () {
    const { onExit, onUpdate, ...otherProps } = this.props
    return (
      <Alert onBackdropPress={onUpdate} {...otherProps}>
        <Alert.Title>Tem certeza que deseja sair?</Alert.Title>
        <Alert.Description>Você não pode realizar um novo investimento com o seu perfil de investidor desatualizado.</Alert.Description>

        <Alert.Button textStyle={{ fontSize: 16 }} title='Sair' onPress={onExit} />
        <Alert.Button bold textStyle={{ fontSize: 16 }} title='Atualizar' onPress={onUpdate} />

      </Alert>
    )
  }
}
