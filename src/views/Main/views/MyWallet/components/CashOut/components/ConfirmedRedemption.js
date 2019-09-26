import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Text, Spacing, Colors, Button } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.s7,
    paddingHorizontal: Spacing.s6
  },

  title: {
    marginBottom: Spacing.s2
  },

  subtitle: {
    paddingHorizontal: Spacing.s6
  },

  button: {
    marginTop: Spacing.s7,
    borderRadius: 0
  }
})

export default class ConfirmedRedemption extends React.PureComponent {
  render () {
    return (
      <View>
        <View style={styles.container}>
          <Text.H4 color={Colors.marineBlue} align='center' style={styles.title}>Saque realizado com sucesso!</Text.H4>
          <Text.T4 fontSize={14} align='center' style={styles.subtitle}>
            Em até <Text.T4 variant='bold'>2 dias úteis</Text.T4> o dinheiro estará disponível em sua conta bancária cadastrada.
          </Text.T4>
        </View>
        <Button secondary title='Ir para minha carteira' style={styles.button} small onPress={() => this.props.onNext()} />
      </View>
    )
  }
}
