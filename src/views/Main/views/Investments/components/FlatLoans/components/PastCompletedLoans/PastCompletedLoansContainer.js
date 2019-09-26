import React from 'react'
import { connect } from 'react-redux'

import { loansSelectors } from '~/store/loans'

import PastCompletedLoans from './PastCompletedLoans'

class PastCompletedLoansContainer extends React.PureComponent {
  render () {
    return (<PastCompletedLoans {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  loanState: loansSelectors.getLoansState(state),
  pastCompletedLoans: loansSelectors.getPastCompletedLoans(state)
})

export default connect(mapStateToProps, null)(PastCompletedLoansContainer)
