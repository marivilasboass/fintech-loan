import React from 'react'
import * as R from 'ramda'
import { View, StyleSheet, Alert } from 'react-native'
import Sentry from 'sentry-expo'

import { Text, Input, Colors, Button, Spacing, KeyboardAwareScrollView } from '~/newUI'

import CreateProfileHeader from '../../components/CreateProfileHeader'
import { parse } from '~/services/parse'
import phoneCodeStatuses from '~/constants/phoneCodeStatuses'
import * as profileValidators from '~/utils/profileValidators'

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: Colors.white
  },

  container: {
    flex: 1,
    paddingHorizontal: Spacing.s6,
    paddingBottom: Spacing.s12 + Spacing.s1,
    justifyContent: 'space-between'
  },

  title: {
    marginBottom: Spacing.s2
  },

  subtitle: {
    paddingHorizontal: Spacing.s10
  }
})

export default class CreateProfile extends React.PureComponent {
  state = {
    nicknameError: '',
    emailError: '',
    cpfError: '',
    phoneError: '',
    loading: false
  }

  onBack = () => {
    this.props.navigation.goBack(null)
  }

  onNicknameBlur = () => {
    this.setState({ nicknameError: profileValidators.nicknameValidator(this.props.nickname) })
  }

  onEmailBlur = () => {
    this.setState({ emailError: profileValidators.emailValidator(this.props.email) })
  }

  onCPFBlur = () => {
    this.setState({ cpfError: profileValidators.CPFValidator(this.props.username) })
  }

  onPhoneBlur = () => {
    this.setState({ phoneError: profileValidators.phoneValidator(this.props.phone) })
  }

  onCodeError = async (errorMessage) => {
    const userErrorMessage = phoneCodeStatuses[errorMessage]

    if (errorMessage === 'SMS_OUTBOUND_ERROR' || errorMessage === 'SYSTEM_ERROR') {
      Alert.alert('Oops', userErrorMessage,
        [{ text: 'OK', onPress: () => this.setState({ loading: false }) }],
        { cancelable: true }
      )
      return
    }

    this.setState({ onCodeError: userErrorMessage, loading: false })
  }

  generateCodePhone = async () => {
    this.setState({ loading: true })
    const { navigation, generatePhoneCode, update, nickname } = this.props
    try {
      await generatePhoneCode()
      this.setState({ loading: false })
      update({ nickname: nickname.trim() })
      navigation.navigate('CheckCellPhoneNumber')
    } catch (err) {
      const { message } = err
      this.onCodeError(message)
      if (message === 'PHONE_VALIDATION_CODE_EXPIRED') {
        this.generateCodePhone()
      }
    }
  }

  onSubmit = async () => {
    const { checkIfAccountExists } = this.props
    this.setState({ loading: true })

    try {
      const valid = await checkIfAccountExists()

      if (!valid) {
        this.setState({ loading: false })
        Alert.alert('Oops!', 'Este e-mail, cpf ou telefone já consta cadastrado.')
        return
      }

      this.generateCodePhone()
    } catch (err) {
      const responseStatus = R.path(['response', 'status'], err)
      const responseErrorCode = R.path(['response', 'data', 'code'], err)
      if (responseStatus === 400 && responseErrorCode === 'ACCOUNT_DELETED') {
        Alert.alert('Oops!', 'Essa conta foi deletada.')
        this.setState({ loading: false })
        return
      }

      Alert.alert('Oops!', 'O serviço se encontra fora do ar. Tente novamente mais tarde.')
      this.setState({ loading: false })
      Sentry.captureException(err)
    }
  }

  updateEmail = (email) => {
    const { update } = this.props
    const filteredEmail = this.removePossibleAccentFromString(email)
    update({ email: filteredEmail })
  }

  removePossibleAccentFromString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  render () {
    const { username, email, phone, nickname, update } = this.props
    const disabledButton = profileValidators.dataValidator(this.props)

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <CreateProfileHeader onBack={this.onBack} />
        <View style={styles.container}>
          <View>
            <Text.T1 variant='heavy' color={Colors.nightRider} align='center' style={styles.title}>
              Que bom ter você aqui! :)
            </Text.T1>
            <Text.T3 align='center' style={styles.subtitle}>Para criar sua conta, precisamos dos seguintes dados:</Text.T3>
          </View>
          <View>
            <Input
              autoFocus
              label='CPF'
              onChange={username => update({ username: parse('CPF', username) })}
              value={username}
              keyboardType='numeric'
              mask='cpf'
              maxLength={14}
              onBlur={this.onCPFBlur}
              error={this.state.cpfError}
            />

            <Input
              label='E-mail'
              onChange={(email) => this.updateEmail(email)}
              value={email}
              autoCorrect={false}
              autoCapitalize='none'
              textContentType='emailAddress'
              keyboardType='email-address'
              onBlur={this.onEmailBlur}
              error={this.state.emailError}
            />

            <Input
              label='Celular'
              onChange={(phone) => update({ phone })}
              value={phone}
              keyboardType='phone-pad'
              mask='cel-phone'
              textContentType='telephoneNumber'
              maxLength={15}
              onBlur={this.onPhoneBlur}
              error={this.state.phoneError}
            />

            <Input
              label='Nome'
              onChange={nickname => update({ nickname })}
              autoCapitalize='words'
              value={nickname}
              maxLength={100}
              onBlur={this.onNicknameBlur}
              error={this.state.nicknameError}
            />

          </View>
          <Button
            disabled={!disabledButton}
            iconRight={{ name: 'arrow-forward', size: 20 }}
            title='Próximo'
            onPress={this.onSubmit}
            loading={this.state.loading}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
