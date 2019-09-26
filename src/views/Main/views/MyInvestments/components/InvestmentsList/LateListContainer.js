import React from 'react'
import { connect } from 'react-redux'

import InvestmentsList from './InvestmentsList'
import { investmentsOperations, investmentsSelectors } from '~/store/investments'

class LateListContainer extends React.PureComponent {
  render () {
    return <InvestmentsList {...this.props} />
  }
}

const mapStateToProps = state => ({
  loading: investmentsSelectors.getLoading(state),
  endReached: investmentsSelectors.getEndReached(state, 'late'),
  filters: investmentsSelectors.getFilters(state),
  investments: investmentsSelectors.getInvestmentListFull(state, 'late')
})

const mapDispatchToProps = {
  updateFilters: investmentsOperations.updateFilters,
  startPagination: investmentsOperations.startPagination,
  fetchNextPage: investmentsOperations.fetchNextPage
}

export default connect(mapStateToProps, mapDispatchToProps)(LateListContainer)
