import React from 'react'

import { BottomSheet } from '~/newUI'
import AddMoney from './components/AddMoney'

export default class AddMoneyInWallet extends React.PureComponent {
  render () {
    const { navigation, ...props } = this.props
    return (
      <BottomSheet handleIphoneX {...props}>
        <AddMoney navigation={navigation} {...props} />
      </BottomSheet>
    )
  }
}
