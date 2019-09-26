import React from 'react'
import { connect } from 'react-redux'

import InstallmentList from './InstallmentList'
import { investmentsOperations } from '~/store/investments'

class InstallmentListContainer extends React.PureComponent {
  render () {
    return (
      <InstallmentList {...this.props} />
    )
  }
}

const mapDispatchToProps = {
  selectInstallment: investmentsOperations.selectInstallment
}

export default connect(null, mapDispatchToProps)(InstallmentListContainer)
