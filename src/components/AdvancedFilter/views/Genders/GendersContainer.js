
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import GendersScreen from './GendersScreen'
import { paginatedLoansSelectors, paginatedLoansOperations } from '~/store/paginatedLoans'

class GenderContainers extends React.PureComponent {
  static navigationOptions = {
    title: 'Opções de Gêneros'
  }

  render () {
    return (<GendersScreen {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ...paginatedLoansSelectors.getFilters(state)
})

const mapDispatchToProps = R.pick(
  ['updateFilters'],
  paginatedLoansOperations
)

export default connect(mapStateToProps, mapDispatchToProps)(GenderContainers)
