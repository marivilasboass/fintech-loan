import React from 'react'
import { StyleSheet, Alert, TouchableWithoutFeedback, Platform, StatusBar } from 'react-native'
import { Constants } from 'expo'

import accountStatuses from '~/constants/accountStatuses'
import { resetNavigationTo } from '~/services/navigation'
import { parse } from '~/services/parse'
import { View, Input, Spacing, Colors, Text, Button, Touch } from '~/newUI'
import { Back } from '~/newUI/Icons'
import ForgotPassword from './components/ForgotPassword'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  header: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosHeader: {
    paddingTop: Constants.statusBarHeight
  },
  title: {
    marginBottom: Spacing.s2
  },
  subTitle: {
    marginBottom: Spacing.s9
  },
  forgotPassword: {
    color: Colors.brightBlue,
    position: 'absolute',
    paddingVertical: Spacing.s5,
    top: 0,
    right: 0
  },
  passwordContainer: {
    position: 'relative'
  },
  createAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.s8
  },
  createAccountText: {
    color: Colors.brightBlue
  },
  createAccountLink: {
    textDecorationLine: 'underline'
  }
})

const customCpfMask = '999.999.999-999' // one more digit to compensate checkText func
const customCnpjMask = '99.999.999/9999-99'

export default class Login extends React.PureComponent {
  state = {
    forgotPassword: false,
    usernameMask: customCpfMask
  }

  componentDidUpdate = (prevProps) => {
    // TODO refactor reactive -> imperative
    const { navigation, screenProps, error, status, _id, clearError } = this.props
    if (error) {
      Alert.alert('Erro', error)
      clearError()
      return
    }

    if (status === accountStatuses.noLimit || status === accountStatuses.fraud) {
      resetNavigationTo(navigation, { routePath: ['ProfileRejected'] })
      return
    }

    if (_id !== prevProps._id) {
      resetNavigationTo(screenProps.navigation, { routePath: ['Main'] })
    }
  }

  toggleForgotPassword = () => this.setState({ forgotPassword: !this.state.forgotPassword })

  render () {
    const { navigation, update, login, username, password, loading, sendEmailToResetPassword } = this.props
    const { forgotPassword, usernameMask } = this.state
    const canSubmit = password && password.length > 0
    const isIos = Platform.OS === 'ios'

    return (
      <View style={styles.container}>
        <StatusBar barStyle='default' />
        <Touch onPress={() => navigation.goBack()}>
          <View style={[styles.header].concat(isIos && styles.iosHeader)}>
            <Back />
          </View>
        </Touch>

        <View paddedHorizontally>
          <Text.H3 align='center' style={styles.title}>Olá, seja bem-vindo novamente!</Text.H3>
          <Text.T3 align='center' style={styles.subTitle}>Insira os seus dados de acesso para entrar em sua conta Mutual:</Text.T3>

          <Input
            label='CPF/CNPJ'
            mask={'custom'}
            options={{
              mask: usernameMask
            }}
            value={username}
            keyboardType='numeric'
            maxLength={18}
            onChange={username => {
              update({ username: parse('CPF', username) })
            }}
            checkText={(previous, next) => {
              this.setState({ usernameMask: next.length > 14 ? customCnpjMask : customCpfMask })
              return true
            }}
          />
          <View style={styles.passwordContainer}>
            <Input
              label='Senha'
              secureTextEntry
              keyboardType='numeric'
              maxLength={6}
              onChange={password => update({ password })}
              value={password}
            />

            <Text.T4 style={styles.forgotPassword} onPress={this.toggleForgotPassword}>
              Esqueceu a senha?
            </Text.T4>
          </View>

          <Button
            onPress={login}
            loading={loading}
            disabled={!canSubmit || loading}
            title='Acessar minha conta'
          />
          <View style={styles.createAccount}>
            <Text.T3 variant='bold' style={styles.createAccountText}>Ainda não tem conta? </Text.T3>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateProfile')}>
              <Text.T3 variant='bold' style={[styles.createAccountText].concat(styles.createAccountLink)}>Crie uma agora</Text.T3>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <ForgotPassword sendEmailToResetPassword={sendEmailToResetPassword} active={forgotPassword} onClose={this.toggleForgotPassword} />
      </View>
    )
  }
}
