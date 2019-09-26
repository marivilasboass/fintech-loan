import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'

import Identification from './Identification'

class IdentificationContainer extends React.PureComponent {
  render () {
    return (<Identification {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  pendencies: accountSelectors.getPendencies(state)
})

const mapDispatchToProps = {
  submitDoubleDocument: accountOperations.submitDoubleDocument,
  submitSingleDocument: accountOperations.submitSingleDocument,
  update: accountOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentificationContainer)
