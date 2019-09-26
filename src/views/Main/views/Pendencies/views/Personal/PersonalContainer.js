import React from 'react'
import { connect } from 'react-redux'

import { accountOperations } from '~/store/account'

import Personal from './Personal'

class PersonalContainer extends React.PureComponent {
  render () {
    return (<Personal {...this.props} />)
  }
}

const mapDispatchToProps = {
  submitPersonalInformation: accountOperations.submitPersonalInformation
}

export default connect(null, mapDispatchToProps)(PersonalContainer)
