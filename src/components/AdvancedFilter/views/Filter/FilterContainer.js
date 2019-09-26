
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import Filter from './Filter'
import { paginatedLoansSelectors, paginatedLoansOperations } from '~/store/paginatedLoans'

class FilterContainer extends React.PureComponent {
  render () {
    return (<Filter {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ...paginatedLoansSelectors.getFilters(state)
})

const mapDispatchToProps = R.pick(
  ['updateFilters', 'resetFilters', 'startPagination'],
  paginatedLoansOperations
)

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)
