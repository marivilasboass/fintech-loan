import React from 'react'
import { connect } from 'react-redux'

import { investmentsOperations, investmentsSelectors } from '~/store/investments'
import Filter from './Filter'

class FilterContainer extends React.PureComponent {
  render () {
    return (
      <Filter {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  filters: investmentsSelectors.getFilters(state)
})

const mapDispatchToProps = {
  updateFilters: investmentsOperations.updateFilters,
  startPagination: investmentsOperations.startPagination,
  resetFilters: investmentsOperations.resetFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)
