import React from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Text, Spacing, Colors } from '~/newUI'
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

  recharge: {
    marginTop: Spacing.s8
  }
})

type Props = {
  onPress: () => void
}

type State = {
  iconSize: number
}

export default class ErrorState extends React.PureComponent<Props, State> {
  state = {
    iconSize: Dimensions.get('window').width * 0.49
  }

  render () {
    const { onPress } = this.props
    const { iconSize } = this.state
    return (
      <View style={styles.container}>
        <SvgIcons.TowerAntenna height={iconSize} width={iconSize} style={styles.image} />
        <View>
          <Text.H3 align='center' style={styles.title}>Extrato indisponível</Text.H3>
          <Text.T3 color={Colors.warmGray} align='center' style={styles.subtitle}>
              Ops! Aconteceu algum problema e suas movimentações não foram carregadas.
          </Text.T3>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.recharge}>
          <View>
            <Text align='center' variant='bold' color={Colors.brightBlue}>Recarregar extrato</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
