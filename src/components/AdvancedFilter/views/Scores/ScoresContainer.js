
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import Scores from './Scores'
import { paginatedLoansSelectors, paginatedLoansOperations } from '~/store/paginatedLoans'

class ScoresContainer extends React.PureComponent {
  render () {
    return (<Scores {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ...paginatedLoansSelectors.getFilters(state)
})

const mapDispatchToProps = R.pick(
  ['updateFilters'],
  paginatedLoansOperations
)

export default connect(mapStateToProps, mapDispatchToProps)(ScoresContainer)
