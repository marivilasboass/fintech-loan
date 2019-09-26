import React from 'react'
import { StyleSheet } from 'react-native'

import { Colors, Text, Spacing, View, Button } from '~/newUI'
import * as SvgIcons from '~/newUI/Icons'
import { resetNavigationTo } from '~/services/navigation'

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
    marginTop: Spacing.s15,
    marginBottom: Spacing.s2
  },

  subtitle: {
    paddingHorizontal: Spacing.s10
  }
})

export default class Welcome extends React.PureComponent {
  onSubmit = () => {
    const { navigation, userType, screenProps } = this.props
    if (userType === 'investor') {
      resetNavigationTo(navigation, { routePath: ['InvestorOnboarding'] })
    } else {
      resetNavigationTo(screenProps.navigation, { routePath: ['Main'] })
    }
  }

  onBack = () => {
    this.props.navigation.goBack(null)
  }

  render () {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <Text.H1 variant='heavy' color={Colors.nightRider} align='center' style={styles.title}>
              {this.props.firstName}, {'\n'} {'seja bem-vindo :)'}
            </Text.H1>
            <Text.T3 align='center' style={styles.subtitle}>Seu cadastro foi criado com sucesso na Mutual!</Text.T3>
          </View>
          <SvgIcons.Ballon style={{ alignSelf: 'center' }} />
          <Button
            iconRight={{ name: 'arrow-forward', size: 20 }}
            title='Vamos lá'
            onPress={this.onSubmit}
          />
        </View>
      </View>
    )
  }
}
