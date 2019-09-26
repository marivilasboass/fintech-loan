import React from 'react'
import { connect } from 'react-redux'

import { registerOperations, registerSelectors } from '~/store/register'

import CreateProfile from './CreateProfile'

class CreateProfileContainer extends React.PureComponent {
  render () {
    return (<CreateProfile {...this.props} />)
  }
}

const mapStateToProps = (state) => registerSelectors.getRegister(state)

const mapDispatchToProps = {
  update: registerOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfileContainer)
