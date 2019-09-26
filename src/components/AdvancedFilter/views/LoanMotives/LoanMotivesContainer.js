
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import LoanMotivesScreen from './LoanMotivesScreen'
import { paginatedLoansSelectors, paginatedLoansOperations } from '~/store/paginatedLoans'

class LoanMotivesContainer extends React.PureComponent {
  static navigationOptions = {
    title: 'Motivo do empréstimo'
  }

  render () {
    return (<LoanMotivesScreen {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ...paginatedLoansSelectors.getFilters(state)
})

const mapDispatchToProps = R.pick(
  ['updateFilters'],
  paginatedLoansOperations
)

export default connect(mapStateToProps, mapDispatchToProps)(LoanMotivesContainer)
