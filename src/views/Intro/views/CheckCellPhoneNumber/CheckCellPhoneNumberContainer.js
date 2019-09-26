import React from 'react'
import { connect } from 'react-redux'

import { registerOperations, registerSelectors } from '~/store/register'

import CheckCellPhoneNumber from './CheckCellPhoneNumber'

class CheckCellPhoneNumberContainer extends React.PureComponent {
  render () {
    return (<CheckCellPhoneNumber {...this.props} />)
  }
}

const mapStateToProps = (state) => registerSelectors.getRegister(state)

const mapDispatchToProps = {
  update: registerOperations.update,
  checkIfAccountExists: registerOperations.checkIfAccountExists,
  validatePhoneCode: registerOperations.validatePhoneCode,
  generatePhoneCode: registerOperations.generatePhoneCode
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckCellPhoneNumberContainer)
