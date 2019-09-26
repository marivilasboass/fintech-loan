import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { isValid as isValidCpf } from '@fnando/cpf/dist/node'
import Sentry from 'sentry-expo'

import { BottomSheet, Text, View, Button, Colors, Input, Spacing } from '~/newUI'
import { parse } from '~/services/parse'

const styles = StyleSheet.create({
  button: {
    borderRadius: 0
  },
  title: {
    marginTop: Spacing.s6,
    color: Colors.marineBlue,
    marginBottom: Spacing.s2
  },
  description: {
    marginBottom: Spacing.s10
  }
})

export default class ForgotPassword extends React.PureComponent {
  state = {
    cpf: '',
    loading: false
  }
  inputRef = React.createRef()

  componentDidUpdate () {
    if (this.props.active) {
      this.inputRef && this.inputRef.current && this.inputRef.current.focus()
    }
  }

  handleClose = () => {
    if (!this.state.loading) {
      this.props.onClose()
    }
  }

  censorWord = (string) => {
    if (string.length < 6) {
      return string.substring(0, 3) + '*'.repeat(string.length - 3)
    }

    const words = string.match(/.{1,3}/g)
    let stringFinal = ''
    for (var i = 0; i < words.length; i++) {
      if (i % 2) {
        stringFinal += '*'.repeat(words[i].length)
      } else {
        stringFinal += words[i]
      }
    }

    return stringFinal
  }

  censorEmail = (email) => {
    const arr = email.split('@')
    return this.censorWord(arr[0]) + '@' + arr[1]
  }

  send = async () => {
    try {
      const { sendEmailToResetPassword } = this.props
      const { cpf } = this.state

      if (cpf.length > 0 && !isValidCpf(cpf)) {
        Alert.alert('CPF inválido')
        return false
      }
      this.setState({ loading: true })

      const { data } = await sendEmailToResetPassword(cpf)

      this.setState({ loading: false })

      const hiddenEmail = this.censorEmail(data.email)

      Alert.alert('Quase lá!', `Enviamos um email para ${hiddenEmail}. Siga as instruções para recuperar sua senha!`)
      this.handleClose()

      return true
    } catch (err) {
      Sentry.captureException(err)
      Alert.alert('Ops!', 'Não conseguimos resetar sua senha, por favor tente novamente mais tarde.')
      this.setState({ loading: false })
      return true
    }
  }

  update = (cpf) => this.setState({ cpf })

  render () {
    const { active } = this.props
    const { cpf, loading } = this.state

    return (
      <BottomSheet active={active} onPress={this.handleClose}>
        <View>
          <View paddedHorizontally>
            <Text.H4 align='center' style={styles.title}>Esqueci minha senha</Text.H4>
            <Text.T4 align='center' style={styles.description}>Insira o seu CPF cadastrado na Mutual, para iniciarmos processo de recuperação de senha</Text.T4>
            <Input
              label='CPF'
              mask='cpf'
              keyboardType='numeric'
              maxLength={14}
              ref={this.inputRef}
              onChange={cpf => this.update(parse('cpf', cpf))}
              value={cpf}
            />
          </View>
          <Button
            style={styles.button}
            secondary
            small
            onPress={this.send}
            loading={loading}
            title='Recuperar minha senha'
          />
        </View>
      </BottomSheet>
    )
  }
}
