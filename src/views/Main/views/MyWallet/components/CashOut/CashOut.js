import React from 'react'

import { BottomSheet } from '~/newUI'
import TakeMoney from './components/TakeMoney'
import ConfirmPassword from './components/ConfirmPassword'
import ConfirmedRedemption from './components/ConfirmedRedemption'

export default class CashOut extends React.PureComponent {
  state = {
    nextComponent: 'takeMoney'
  }

  handleOnPress = () => {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress()
    }
    this.setState({ nextComponent: 'takeMoney' })
  }

  setNextComponent = (nextComponent) => this.setState({ nextComponent })

  render () {
    const { transaction, ...props } = this.props
    const { nextComponent } = this.state
    return (
      <BottomSheet handleIphoneX {...props} onPress={this.handleOnPress}>
        { (nextComponent === 'takeMoney') && <TakeMoney onNext={this.setNextComponent} {...props} /> }
        { (nextComponent === 'password') && <ConfirmPassword onNext={this.setNextComponent} {...props} /> }
        { (nextComponent === 'success') && <ConfirmedRedemption onNext={this.handleOnPress} /> }
      </BottomSheet>
    )
  }
}
