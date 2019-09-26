import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Sentry from 'sentry-expo'
import * as R from 'ramda'
import { track } from '~/services/analytics'

import { Text, Spacing, Colors, Button, Password } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.s7,
    paddingHorizontal: Spacing.s6
  },

  title: {
    marginBottom: Spacing.s2
  },

  subtitle: {
    marginBottom: Spacing.s12,
    paddingHorizontal: Spacing.s8
  },

  button: {
    marginTop: Spacing.s12,
    borderRadius: 0
  }
})

export default class ConfirmPassword extends React.PureComponent {
  state = {
    password: '',
    loading: false
  }

  withdrawFunds = async () => {
    const value = this.props.requestedMoney
    await this.props.requestWithdrawal(value)
    track('GenerateWithdrawal', { value })
  }

  onAdvance = async () => {
    this.setState({ loading: true })

    try {
      const confirmPassword = await this.props.verifyPassword(this.state.password)

      if (!confirmPassword) {
        this.setState({ loading: false })
        Alert.alert('Senha incorreta', 'Por favor digite corretamente a sua senha para concluir a solicitação de saque.')
        return
      }

      await this.withdrawFunds()
      this.props.onNext('success')
    } catch (err) {
      const responseErrorCode = R.path(['response', 'data', 'code'], err)
      const responseStatus = R.path(['response', 'status'], err)
      if (responseStatus === 400 && responseErrorCode === 'ACCOUNT_HAS_PENDING_WITHDRAWAL') {
        Alert.alert(
          'Saque em processamento',
          'Você já possui um saque em processamento. Aguarde esse ser concluído antes de solicitar novamente'
        )
        this.setState({ loading: false })

        return
      }

      Sentry.captureException(err)
      Alert.alert('Realizar saque', 'Não foi possível verificar sua senha, tente novamente mais tarde')
      this.setState({ loading: false })
    }
  }

  render () {
    return (
      <View>
        <View style={styles.container}>
          <Text.H4 color={Colors.marineBlue} align='center' style={styles.title}>Para a sua segurança</Text.H4>
          <Text.T4 fontSize={14} align='center' style={styles.subtitle}>
          Digite a sua senha para concluir a solicitação de saque para a sua conta bancária:
          </Text.T4>

          <Password value={this.state.password} onChange={(password) => this.setState({ password })} />
        </View>
        <Button
          secondary title='Confirmar solicitação de saque' style={styles.button}
          small onPress={this.onAdvance} loading={this.state.loading}
        />
      </View>
    )
  }
}
