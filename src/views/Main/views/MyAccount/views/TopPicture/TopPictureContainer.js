import React from 'react'
import { connect } from 'react-redux'

import { accountSelectors, accountOperations } from '~/store/account'

import TopPicture from './TopPicture'

class TopPictureContainer extends React.PureComponent {
  render () {
    return (<TopPicture {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  nickname: accountSelectors.getNickname(state),
  profilePicture: accountSelectors.getLargeProfilePicture(state),
  status: accountSelectors.getStatus(state),
  age: accountSelectors.getAge(state),
  userType: accountSelectors.getUserType(state)
})

const mapDispatchToProps = {
  submitSingleDocument: accountOperations.submitSingleDocument,
  update: accountOperations.update
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPictureContainer)
