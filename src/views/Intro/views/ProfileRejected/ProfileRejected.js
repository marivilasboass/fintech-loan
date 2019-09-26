import React from 'react'
import { StyleSheet, Linking } from 'react-native'

import { Colors, Text, Spacing, View, Button } from '~/newUI'
import * as SvgIcons from '~/newUI/Icons'
import partners from '~/constants/partners'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  },

  container: {
    flex: 1,
    paddingHorizontal: Spacing.s6,
    paddingBottom: Spacing.s5 + 2,
    justifyContent: 'space-between'
  },

  title: {
    marginTop: Spacing.s15,
    marginBottom: Spacing.s2,
    paddingHorizontal: Spacing.s12
  },

  subtitle: {
    paddingHorizontal: Spacing.s12
  }
})

export default class ProfileRejected extends React.PureComponent {
  onAdvance = () => Linking.openURL(partners.simplic)

  render () {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <Text.T1 variant='heavy' color={Colors.nightRider} align='center' style={styles.title}>
              Infelizmente não conseguimos aprovar um limite pra você agora
            </Text.T1>
          </View>
          <SvgIcons.Signpost style={{ alignSelf: 'center' }} />
          <Text.T3 align='center' style={styles.subtitle}>
            Isso pode mudar em alguns meses. Enquanto isso, alguns dos nossos parceiros
            <Text.T3 variant='bold'> podem te ajudar!</Text.T3> ;)
          </Text.T3>
          <Button
            title='Consultar parceiros'
            onPress={this.onAdvance}
          />
        </View>
      </View>
    )
  }
}
