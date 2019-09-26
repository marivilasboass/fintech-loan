import React from 'react'
import { Alert } from 'react-native'
import Sentry from 'sentry-expo'

import { Password, Text, Colors } from '~/newUI'

import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'
import Location from '~/components/Location'

import { attemptToGetLocation } from '~/services/location'

export default class ConfirmPassword extends React.PureComponent {
  state = {
    loading: false,
    password: null,
    requestingLocation: false,
    location: null
  }

  onConfirm = async () => {
    const { changeFlagStatus, screenProps, verifyPassword, sendLoanRequest } = this.props
    const { password } = this.state

    try {
      this.setState({ loading: true })
      const verified = await verifyPassword(password)

      if (!verified) {
        Alert.alert('Erro', 'A senha não confere.')
        this.setState({ loading: false })
        return
      }

      const location = await this.getLocation()

      if (!location) {
        this.setState({ loading: false, requestingLocation: true })
        return
      }

      const success = await sendLoanRequest(location)
      if (!success) {
        Alert.alert('Erro', 'Erro ao enviar sua solicitação de empréstimo, tente novamente')
        return
      }

      Alert.alert('Empréstimo em análise', 'Após a análise iremos te avisar se o seu empréstimo foi publicado.')
      changeFlagStatus('hasActiveLoan', true)
      screenProps.navigation.navigate('MyLoans')
    } catch (err) {
      Sentry.captureException(err)
      this.setState({ loading: false })
      Alert.alert('Erro', 'Erro ao enviar sua solicitação de empréstimo, tente novamente')
    }
  }

  getLocation = async () => {
    if (this.state.location) {
      return this.state.location
    }

    const location = await attemptToGetLocation()
    return location
  }

  onLocation = (location) => {
    if (this.state.loading) {
      return
    }

    this.setState({ requestingLocation: false, location })
    this.onConfirm()
  }

  render () {
    const { navigation } = this.props
    const { loading, password, requestingLocation } = this.state

    return (
      <React.Fragment>
        <Location onLocation={this.onLocation} isVisible={requestingLocation} />
        <ViewWithHeaderAndButton backgroundType='header' onPressBack={() => navigation.goBack(null)}>
          <ViewWithHeaderAndButton.Header>
            <Text.T2 color={Colors.white} align='center'>Para sua segurança</Text.T2>
            <Text.H3 color={Colors.white} align='center'>Digite sua senha para confirmar o pedido</Text.H3>
          </ViewWithHeaderAndButton.Header>
          <ViewWithHeaderAndButton.Content>
            <Password
              onChange={password => this.setState({ password })}
              value={password}
            />
          </ViewWithHeaderAndButton.Content>
          <ViewWithHeaderAndButton.Button
            disabled={!password || password.length !== 6}
            loading={loading}
            onPress={this.onConfirm}
            title='Solicitar empréstimo'
          />
        </ViewWithHeaderAndButton>
      </React.Fragment>
    )
  }
}
