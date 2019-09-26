import React from 'react'
import { StyleSheet, View, Alert, ScrollView } from 'react-native'
import Sentry from 'sentry-expo'
import moment from 'moment'

import { Text, Spacing, Colors, Button, Row, FinanceText, MaskedMoney } from '~/newUI'
import { api } from '~/services/api'
import format from '~/services/format'
import { track } from '~/services/analytics'
import accountStatuses from '~/constants/accountStatuses'
import limits from '~/constants/limits'
import { isAnalysisStatus } from '~/services/accountStatuses'

const { min, max } = limits.addResources

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.s7,
    paddingHorizontal: Spacing.s6
  },

  title: {
    marginBottom: Spacing.s2,
    paddingHorizontal: Spacing.s8
  },

  maskedInput: {
    marginVertical: Spacing.s10
  },

  button: {
    marginTop: Spacing.s8,
    borderRadius: 0
  }
})

const minimumRecommendedInvestment = 5000
export default class AddMoney extends React.PureComponent {
  state = {
    loading: false,
    value: format('newCurrency', minimumRecommendedInvestment)
  }

  onAdvance = async () => {
    this.setState({ loading: true })

    const isValueValid = this.isValueValid()
    if (!isValueValid) {
      Alert.alert(
        'Valor Inválido',
        `Selecione um valor entre ${format('currency', min)} e ${format('currency', max)}.`
      )
      this.setState({ loading: false })
      return
    }

    const hasNoPendencies = await this.checkPendencies()
    if (hasNoPendencies) {
      await this.generateFunds()
    }
  }

  checkPendencies = async () => {
    const { navigation, fetchAccount } = this.props
    const { status } = await fetchAccount()

    if (status === accountStatuses.pendingData) {
      Alert.alert(
        'Pendências',
        'Você precisa resolver suas pendências de cadastro antes de adicionar dinheiro',
        [
          {
            text: 'Visualizar pendências',
            onPress: () => navigation.navigate('Pendencies')
          }
        ],
        { cancelable: false }
      )
      return false
    }

    if (isAnalysisStatus(status)) {
      Alert.alert(
        'Cadastro em análise...',
        'Ainda estamos analisando as informações do seu seu perfil. Por favor aguarde, nós iremos avisá-lo :)',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Investments')
          }
        ],
        { cancelable: false }
      )
      return false
    }

    if (status === accountStatuses.fraud) {
      Alert.alert(
        'Conta bloqueada',
        'Sua conta foi bloqueada! Entre em contato com nosso suporte',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Pendencies')
          }
        ],
        { cancelable: false }
      )
      return false
    }

    if (status === accountStatuses.noLimit) {
      Alert.alert(
        'Conta sem limite',
        'Sua conta não possui limite. Você poderá verificar seu limite novamente em 30 dias.',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Pendencies')
          }
        ],
        { cancelable: false }
      )
      return false
    }
    return true
  }

  isValueValid = () => {
    const value = this.parseValue()
    return value >= min && value <= max
  }

  generateFunds = async () => {
    const value = this.parseValue()
    const amountCents = Math.round(value * 100)

    try {
      const { data } = await api.post('iugu/account/addFunds', { amountCents })
      const { data: invoice } = data
      const formattedDate = moment(invoice.dueDate).format('DD/MM/YYYY').toUpperCase()

      const boleto = {
        value,
        url: invoice.url,
        code: invoice.code,
        dueDate: formattedDate,
        backUrl: 'Wallet'
      }

      track('GenerateBoleto', { value })

      this.setState({ loading: false })
      this.props.navigation.navigate('BankSlip', { boleto })
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar-se a Mutual, tente novamente mais tarde')
      Sentry.captureException(err)
      this.setState({ loading: false })
    }
  }

  setMoney = () => String(this.state.value).replace(/[.]/g, '').replace(',', '.')

  parseValue = () => parseFloat(this.setMoney())

  render () {
    const { loading, value } = this.state
    return (
      <View>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>
            <Text.H4 color={Colors.marineBlue} align='center' style={styles.title}>Quanto você deseja depositar na sua carteira?</Text.H4>
            <Text.T4 fontSize={14} align='center'>
              Após o pagamento do boleto o dinheiro estará disponível para realizar investimentos em <Text.T4 variant='bold'>1 a 2 dias úteis</Text.T4>.
            </Text.T4>
            <MaskedMoney
              autoFocus
              maxLength={12}
              value={value}
              onChange={(value) => this.setState({ value })}
              style={styles.maskedInput}
            />
            <Row style={{ justifyContent: 'center' }}>
              <Text color={Colors.warmGray}>Saldo disponível&nbsp;</Text>
              <FinanceText
                color={Colors.warmGray}
                children={this.props.balance}
              />
            </Row>
          </View>
          <Button loading={loading} secondary title='Emitir boleto bancário' style={styles.button} small onPress={this.onAdvance} />
        </ScrollView>
      </View>
    )
  }
}
