import React from 'react'
import { StyleSheet, View } from 'react-native'
import format from '~/services/format'
import { Colors, Typography, Spacing, Touch } from '~/newUI'
import * as SvgIcons from '~/newUI/Icons'
import { NavigationScreenProp } from 'react-navigation'

const styles = StyleSheet.create({
  arrowStyle: {
    opacity: 0.5,
    marginLeft: Spacing.s6
  },
  refreshIcon: {
    marginLeft: 10,
    marginTop: 2
  }
})

type Props = {
  loading: boolean,
  balance: number,
  navigation: NavigationScreenProp,
  firstName: string,
  balanceError: boolean,
  fetchIuguBalance: () => number
}

export default class UserInfo extends React.PureComponent<Props> {
  navigateToWallet = () => {
    this.props.navigation.navigate('Wallet')
  }

  render () {
    const { loading, balance, firstName, balanceError, fetchIuguBalance } = this.props
    const walletBalance = format('newCurrency', balance)
    if (loading) {
      return (
        <View>
          <Typography.H4 color={Colors.white}>{firstName}</Typography.H4>
          <Typography.T2 color={Colors.walletMenu}>Atualizando Saldo</Typography.T2>
        </View>
      )
    }
    if (balanceError) {
      return (
        <Touch onPress={fetchIuguBalance}>
          <View>
            <Typography.H4 color={Colors.white}>{firstName}</Typography.H4>
            <View style={{ flexDirection: 'row' }}>
              <Typography.T2 color={Colors.walletMenu}>Atualizar Saldo</Typography.T2>
              <View style={styles.refreshIcon}>
                <SvgIcons.Reload color={Colors.reloadIcon} width={12.9} height={14} />
              </View>
            </View>
          </View>
        </Touch>
      )
    }
    return (
      <Touch onPress={this.navigateToWallet}>
        <View>
          <Typography.H4 color={Colors.white}>{firstName}</Typography.H4>
          <View style={{ flexDirection: 'row' }}>
            <Typography.T2 color={Colors.walletMenu}>Saldo de R$ <Typography.T1 color={Colors.walletMenu}>{walletBalance}</Typography.T1></Typography.T2>
            <SvgIcons.ChevronRight style={styles.arrowStyle} />
          </View>
        </View>
      </Touch>
    )
  }
}
