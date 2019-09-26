import React from 'react'
import { StyleSheet, View, Alert, Keyboard, ScrollView } from 'react-native'
import Sentry from 'sentry-expo'

import { Text, Spacing, Colors, Button, Row, FinanceText, MaskedMoney } from '~/newUI'
import format from '~/services/format'
import limits from '~/constants/limits'

const { min } = limits.withdrawResources

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.s7,
    paddingHorizontal: Spacing.s6
  },

  title: {
    marginBottom: Spacing.s2
  },

  maskedInput: {
    marginVertical: Spacing.s10
  },

  balance: {
    justifyContent: 'center'
  },

  button: {
    marginTop: Spacing.s8,
    borderRadius: 0
  }
})

export default class TakeMoney extends React.PureComponent {
  state = {
    value: 0,
    loading: false
  }

  onAdvance = async () => {
    this.setState({ loading: true })
    Keyboard.dismiss()

    try {
      const hasPendingBankChange = await this.props.fetchPendingBankChange()
      if (hasPendingBankChange) {
        Alert.alert(
          'Mudança de dados bancários em processamento',
          'Estamos processando uma mudança nos seus dados bancários. Não é possível solicitar um saque nesse momento'
        )

        this.setState({ loading: false })
        return
      }

      const isValueValid = this.isValueValid()
      if (!isValueValid || this.setMoney() < this.props.value) {
        Alert.alert(
          'Valor inválido',
          `Selecione um valor entre ${format('currency', min)} e ${format('currency', this.props.balance)}.`
        )

        this.setState({ loading: false })
        return
      }

      this.props.update({ requestedMoney: this.parseValue() })
      this.props.onNext('password')
    } catch (err) {
      this.setState({ loading: false })

      Sentry.captureException(err)
      Alert.alert('Erro', 'Erro ao enviar sua solicitação de saque, tente novamente')
    }
  }

  setMoney = () => String(this.state.value).replace(/[.]/g, '').replace(',', '.')

  parseValue = () => parseFloat(this.setMoney())

  isValueValid = () => {
    const value = this.parseValue()
    return value >= min && value <= this.props.balance
  }

  render () {
    return (
      <View>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>
            <Text.H4 color={Colors.marineBlue} align='center' style={styles.title}>Quanto você deseja sacar ?</Text.H4>
            <Text.T4 fontSize={14} align='center'>
              Após a solicitação, em até <Text.T4 variant='bold'>2 dias úteis</Text.T4>, o dinheiro estará disponível em sua conta bancária cadastrada.
            </Text.T4>

            <MaskedMoney
              autoFocus
              maxLength={12}
              value={this.state.value}
              onChange={(value) => this.setState({ value })}
              style={styles.maskedInput}
            />

            <Row style={styles.balance}>
              <Text color={Colors.warmGray}>Saldo disponível&nbsp;</Text>
              <FinanceText
                color={Colors.warmGray}
                children={this.props.balance}
              />
            </Row>
          </View>

          <Button
            secondary title='Sacar para conta bancária' style={styles.button}
            small onPress={this.onAdvance}
            loading={this.state.loading}
          />
        </ScrollView>
      </View>
    )
  }
}
