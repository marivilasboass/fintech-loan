import React from 'react'
import { StyleSheet, View } from 'react-native'

import UserAvatar from './components/UserAvatar'
import Arrow from './components/Arrow'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class LoanOwnersHeader extends React.PureComponent {
  render () {
    const { borrower, marketplaceStatus, style } = this.props

    const isInvested = marketplaceStatus === 'invested'

    return (
      <View style={[styles.container, style]}>
        <UserAvatar
          {...borrower}
          nickname={borrower ? borrower.nickname : 'Aguardando'}
          type='Tomador'
        />
        <View style={styles.arrowContainer}>
          <Arrow title='SOLICITOU' />
        </View>

        <UserAvatar
          nickname={isInvested ? 'Investido' : 'Aguardando'}
        />
      </View>
    )
  }
}
