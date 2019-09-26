import React from 'react'
import { StyleSheet, Alert } from 'react-native'

import { View, MaskedMoney, Text, Spacing, Colors } from '~/newUI'
import AutomaticMatchPages from '../../components/AutomaticMatchPages'
import format from '~/services/format'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Spacing.s13 + Spacing.s8
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: Spacing.s13 + Spacing.s8
  }
})

export default class AmountToInvest extends React.PureComponent {
  state = {
    value: '',
    realValue: 0,
    loading: false
  }

  onAdvance = async () => {
    const { balance, fetchTotalAvaliableLoans } = this.props
    const { realValue } = this.state
    if (realValue > balance) {
      Alert.alert(
        'Valor acima do limite',
        `Defina um novo valor dentro do seu limite disponível de ${format('currency', this.props.balance)}.`
      )
      return
    }
    try {
      this.setState({ loading: true })
      await fetchTotalAvaliableLoans()
      await this.props.update({ totalToInvestmentCents: this.state.realValue * 100 })
      this.setState({ loading: false })
      this.props.onAdvance()
    } catch (err) {
      Alert.alert(
        'Ops!',
        'Não foi possível salvar o valor selecionado, por favor tente novamente mais tarde.'
      )
      this.setState({ loading: false })
    }
  }

  handleChange = (value) => {
    this.setState({
      value,
      realValue: value.replace(/[.]/g, '').replace(',', '.')
    })
  }

  render () {
    const { balance, ...otherProps } = this.props
    const { value, realValue, loading } = this.state

    return (
      <AutomaticMatchPages
        {...otherProps}
        buttonProps={{
          secondary: true,
          small: true,
          fullButton: true
        }}
        headerStyle={{ paddingBottom: 0 }}
        title='Orçamento disponível'
        subtitle={`Insira o valor a ser investido, para buscarmos o melhor resultado do seu investimento`}
        onAdvance={this.onAdvance}
        disabled={realValue < 1}
        loading={loading}
        btnText={'Ok, vamos continuar'}
      >
        <View style={styles.container}>
          <MaskedMoney
            fastFocus
            value={value}
            onChange={this.handleChange}
          />
          <View style={styles.textContainer}>
            <Text color={Colors.warmGray}>Limite disponível: R$ {format('newCurrency', balance)}</Text>
          </View>
        </View>
      </AutomaticMatchPages>
    )
  }
}
