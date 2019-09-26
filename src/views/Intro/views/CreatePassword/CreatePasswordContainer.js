import React from 'react'
import { connect } from 'react-redux'

import { registerOperations, registerSelectors } from '~/store/register'

import CreatePassword from './CreatePassword'

class CreatePasswordContainer extends React.PureComponent {
  render () {
    return (<CreatePassword {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  password: registerSelectors.getPassword(state),
  userType: registerSelectors.getUserType(state)
})

const mapDispatchToProps = {
  update: registerOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePasswordContainer)
