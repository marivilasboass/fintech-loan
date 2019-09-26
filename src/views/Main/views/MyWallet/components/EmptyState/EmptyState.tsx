import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text, Spacing, Button, Colors } from '~/newUI'
import * as SvgIcons from '~/newUI/Icons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.s10,
    paddingBottom: Spacing.s6,
    paddingHorizontal: Spacing.s6,
    backgroundColor: Colors.white
  },

  image: {
    alignSelf: 'center',
    marginBottom: Spacing.s8
  },

  title: {
    marginBottom: Spacing.s3
  },

  subtitle: {
    marginBottom: Spacing.s12
  },

  buttonContent: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    marginHorizontal: 20,
    left: 0,
    right: 0
  }

})

type Props = {
  onPress: (action: string) => void
}

export default class EmptyState extends React.PureComponent<Props> {
  state = {
    iconSize: Dimensions.get('window').width * 0.49
  }

  render () {
    const { onPress } = this.props
    const { iconSize } = this.state
    return (
      <View style={styles.container}>
        <SvgIcons.Wallet height={iconSize} width={iconSize} style={styles.image} />
        <View>
          <Text.H3 align='center' style={styles.title}>Sem movimentações</Text.H3>
          <Text.T3 color={Colors.warmGray} align='center' style={styles.subtitle}>
            Aproveite para adicionar dinheiro em carteira e realizar o seu primeiro investimento.
          </Text.T3>
        </View>
        <View style={styles.buttonContent}>
          <Button
            title='Adicionar dinheiro'
            onPress={() => onPress('addMoney')}
          />
        </View>
      </View>
    )
  }
}
