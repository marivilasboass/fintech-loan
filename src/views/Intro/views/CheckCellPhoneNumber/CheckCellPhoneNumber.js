import React from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { Text, Input, Colors, Button, Spacing, KeyboardAwareScrollView, Row } from '~/newUI'
import * as SvgIcons from '~/newUI/Icons'
import phoneCodeStatuses from '~/constants/phoneCodeStatuses'
import CreateProfileHeader from '../../components/CreateProfileHeader'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  },

  container: {
    flex: 1,
    paddingHorizontal: Spacing.s6,
    paddingBottom: Spacing.s12 + Spacing.s1,
    justifyContent: 'space-between'
  },

  title: {
    marginBottom: Spacing.s2,
    paddingHorizontal: Spacing.s12
  },

  subtitle: {
    paddingHorizontal: Spacing.s10
  },

  input: {
    marginTop: Spacing.s15
  },

  reloadIcon: {
    top: 3,
    marginRight: Spacing.s1
  },

  reloadRow: {
    justifyContent: 'flex-end'
  }
})

const resendSMSTime = 60

export default class CheckCellPhoneNumber extends React.PureComponent {
  state = {
    onCodeError: '',
    canResendSMS: false,
    loading: false,
    timeoutId: null,
    intervalId: null,
    resendSMSCount: resendSMSTime
  }

  componentDidMount = () => {
    this.startResendTimers()
  }

  componentWillUnmount = () => {
    this.resetResendTimers()
  }

  doIntervalChange = () => {
    const intervalId = setInterval(() => {
      this.setState(prevState => ({
        resendSMSCount: prevState.resendSMSCount - 1
      }))
    }, 1000)
    this.setState({ intervalId })
  }

  resetResendTimers = () => {
    const { timeoutId, intervalId } = this.state
    this.setState({ canResendSMS: true, timeoutId: null, resendSMSCount: resendSMSTime })
    if (timeoutId && intervalId) {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }

  startResendTimers = () => {
    const resendTime = resendSMSTime * 1000
    const timeoutId = setTimeout(() => this.resetResendTimers(), resendTime)
    this.setState({ timeoutId })
    this.doIntervalChange()
  }

  resendSMS = () => {
    this.props.generatePhoneCode()
    this.setState({ canResendSMS: false })
    this.startResendTimers()
  }

  onCodeError = (errorMessage) => {
    const userErrorMessage = phoneCodeStatuses[errorMessage]
    if (errorMessage === 'SMS_OUTBOUND_ERROR' || errorMessage === 'SYSTEM_ERROR') {
      Alert.alert('Oops', userErrorMessage,
        [{ text: 'OK', onPress: () => this.setState({ loading: false, disabledButton: true }) }],
        { cancelable: true }
      )
      return
    }

    this.setState({ onCodeError: userErrorMessage, loading: false })
  }

  onSubmit = async () => {
    const { validatePhoneCode, navigation } = this.props
    this.setState({ loading: true })
    try {
      await validatePhoneCode()
      this.setState({ loading: false })
      navigation.navigate('CreatePassword')
    } catch (err) {
      const { message } = err
      this.onCodeError(message)
      if (message === 'PHONE_VALIDATION_CODE_EXPIRED') {
        this.resendSMS()
      }
    }
  }

  onBack = () => {
    this.props.navigation.goBack(null)
  }

  render () {
    const { code, update } = this.props
    const { canResendSMS, loading, onCodeError, resendSMSCount } = this.state
    const buttonEnabled = code.length === 4
    const canResendSMSColor = canResendSMS ? Colors.brightBlue : Colors.disabledGray
    const count = !canResendSMS ? `(${resendSMSCount})` : ''
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          <CreateProfileHeader onBack={this.onBack} />
          <View style={styles.container}>
            <View>
              <Text.T1 variant='heavy' color={Colors.nightRider} align='center' style={styles.title}>
                Precisamos verificar seu número
              </Text.T1>
              <Text.T3 align='center' style={styles.subtitle}>
                Digite abaixo o código que enviamos via sms para {this.props.phone}
              </Text.T3>

              <Input
                label='Código'
                onChange={(code) => update({ code })}
                value={code}
                keyboardType='numeric'
                error={this.state.onCodeError}
                style={styles.input}
                autoFocus
                longErrorText={this.state.onCodeError}
                width='60%'
                maxLength={4}
              />

              <TouchableOpacity onPress={this.resendSMS} disabled={!canResendSMS} activeOpacity={0.7} style={{ top: onCodeError ? -15 : -30 }}>
                <Row style={styles.reloadRow}>
                  <SvgIcons.Reload style={styles.reloadIcon} color={canResendSMSColor} />
                  <Text.T4 color={canResendSMSColor}>
                    Reenviar código {count}
                  </Text.T4>
                </Row>
              </TouchableOpacity>
            </View>
            <Button
              disabled={!buttonEnabled}
              iconRight={{ name: 'arrow-forward', size: 20 }}
              title='Próximo'
              loading={loading}
              onPress={this.onSubmit}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
