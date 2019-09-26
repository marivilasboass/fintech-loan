import React from 'react'
import { connect } from 'react-redux'
import { accountSelectors } from '~/store/account'
import CreditCardScreen from './CreditCardScreen'

class CreditCardScreenContainer extends React.PureComponent {
  render () {
    return (<CreditCardScreen {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ...accountSelectors.getBank(state)
})

export default connect(mapStateToProps)(CreditCardScreenContainer)
