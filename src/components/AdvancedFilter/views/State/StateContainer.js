
import React from 'react'
import { connect } from 'react-redux'

import State from './State'
import { paginatedLoansSelectors, paginatedLoansOperations } from '~/store/paginatedLoans'

class StateContainer extends React.PureComponent {
  render () {
    return (<State {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ...paginatedLoansSelectors.getFilters(state)
})

const mapDispatchToProps = {
  updateFilters: paginatedLoansOperations.updateFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(StateContainer)
