
import React from 'react'
import { connect } from 'react-redux'

import City from './City'
import { paginatedLoansSelectors, paginatedLoansOperations } from '~/store/paginatedLoans'

class CityContainer extends React.PureComponent {
  render () {
    return (<City {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ...paginatedLoansSelectors.getFilters(state)
})

const mapDispatchToProps = {
  updateFilters: paginatedLoansOperations.updateFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(CityContainer)
