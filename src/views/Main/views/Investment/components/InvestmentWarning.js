import React from 'react'
import { Alert } from '~/newUI'

export default class InvestmentWarning extends React.PureComponent {
  render () {
    const { onCancel, onContinue, ...otherProps } = this.props
    return (
      <Alert onBackdropPress={onContinue} {...otherProps}>
        <Alert.Title>Atenção</Alert.Title>
        <Alert.Description>Recomendamos que você invista apenas em 2 cotas por pedido de empréstimo. É preciso diminuir o risco investindo em várias pessoas.</Alert.Description>

        <Alert.Button textStyle={{ fontSize: 16 }} title='Cancelar' onPress={onCancel} />
        <Alert.Button bold textStyle={{ fontSize: 16 }} title='Investir' onPress={onContinue} />

      </Alert>
    )
  }
}
