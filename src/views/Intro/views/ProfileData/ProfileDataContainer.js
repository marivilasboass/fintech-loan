import React from 'react'
import { connect } from 'react-redux'

import { registerOperations, registerSelectors } from '~/store/register'

import ProfileData from './ProfileData'

class ProfileDataContainer extends React.PureComponent {
  render () {
    return (<ProfileData {...this.props} />)
  }
}

const mapStateToProps = (state) => registerSelectors.getRegister(state)

const mapDispatchToProps = {
  update: registerOperations.update,
  checkIfAccountExists: registerOperations.checkIfAccountExists,
  generatePhoneCode: registerOperations.generatePhoneCode
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDataContainer)
