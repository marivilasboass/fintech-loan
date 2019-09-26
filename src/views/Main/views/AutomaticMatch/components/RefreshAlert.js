import React from 'react'
import { Alert } from '~/newUI'

export default class RefreshAlert extends React.PureComponent {
  render () {
    const { loading } = this.props
    return (
      <Alert {...this.props}>
        <Alert.Title>
          O seu tempo está prestes a expirar
        </Alert.Title>
        <Alert.Description>
          Cada seção tem 5 minutos, você quer mais tempo para avaliar os pedidos?
        </Alert.Description>
        <Alert.Button title='Não' disabled={loading} onPress={this.props.onCloseModal} />
        <Alert.Button title='Sim' loading={loading} onPress={this.props.onConfirm} />
      </Alert>
    )
  }
}
