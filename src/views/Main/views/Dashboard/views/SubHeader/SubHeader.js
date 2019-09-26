import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { View, Typography, Colors, Spacing } from '~/newUI'
import { Icon } from 'react-native-elements'
import format from '~/services/format'

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 45,
    backgroundColor: Colors.mutualBlue
  },
  container: {
    flex: 1,
    marginHorizontal: Spacing.s5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textColor: {
    color: 'white'
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default class SubHeader extends React.PureComponent {
  render () {
    const { onPress, walletBalance } = this.props
    const balance = format('newCurrency', walletBalance)
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Typography.T2 style={styles.textColor}>Saldo disponível:</Typography.T2>
            <View style={styles.balanceContainer}>
              <Typography.T2 variant={'light'} style={styles.textColor}>R$ </Typography.T2>
              <Typography.T2 variant='semibold' style={[styles.textColor, { marginRight: 10 }]}>{balance}</Typography.T2>
              <Icon type='ionicon' name={'ios-arrow-forward'} color={'white'} size={20} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
