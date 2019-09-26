import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors } from '~/store/account'
import InvestmentType from './InvestmentType'

class InvestmentTypeContainer extends React.PureComponent {
  render () {
    return (<InvestmentType {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  nickname: accountSelectors.getNickname(state)
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentTypeContainer)
