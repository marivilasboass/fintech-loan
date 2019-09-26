import React from 'react'
import { Colors, Alert } from '~/newUI'
import optionsSignImage from '../../../images/options-sign.png'

const statusesInformation = {
  pendingData: {
    title: 'Pendências',
    description: 'Você precisa resolver suas pendências de cadastro antes de solicitar um empréstimo',
    btnTitle: 'Visualizar pendências',
    navigateTo: 'Pendencies'
  },
  pendingBackOffice: {
    title: 'Cadastro em análise...',
    description: 'Ainda estamos analisando as informações do seu seu perfil. Por favor aguarde, nós iremos avisá-lo :)',
    btnTitle: 'Ok',
    navigateTo: 'Pendencies'
  },
  fraudAnalysis: {
    title: 'Cadastro em análise...',
    description: 'Ainda estamos analisando as informações do seu seu perfil. Por favor aguarde, nós iremos avisá-lo :)',
    btnTitle: 'Ok',
    navigateTo: 'Pendencies'
  },
  fraudSuspect: {
    title: 'Cadastro em análise...',
    description: 'Ainda estamos analisando as informações do seu seu perfil. Por favor aguarde, nós iremos avisá-lo :)',
    btnTitle: 'Ok',
    navigateTo: 'Pendencies'
  },
  noLimit: {
    title: 'Conta sem limite',
    description: 'Sua conta não possui limite para solicitação de empréstimo. Você poderá verificar seu limite novamente em 30 dias.',
    btnTitle: 'Visualizar pendências',
    navigateTo: 'Pendencies'
  },
  fraud: {
    title: 'Conta bloqueada',
    description: 'Sua conta foi bloqueada! Entre em contato com nosso suporte',
    btnTitle: 'Ok',
    navigateTo: 'Pendencies'
  }
}

export default class HasActiveLoanAlert extends React.PureComponent {
  render () {
    const { onRequestClose, status, navigation, ...otherProps } = this.props

    const statusInformation = statusesInformation[status] || {}

    return (
      <Alert {...otherProps}>
        <Alert.CloseButton color={Colors.brightBlue} onPress={onRequestClose} />
        <Alert.Image source={optionsSignImage} />
        <Alert.Title>
          {statusInformation.title}
        </Alert.Title>
        <Alert.Description>
          {statusInformation.description}
        </Alert.Description>
        <Alert.Button title={statusInformation.btnTitle} onPress={() => navigation.navigate(statusInformation.navigateTo)} />
      </Alert>
    )
  }
}
