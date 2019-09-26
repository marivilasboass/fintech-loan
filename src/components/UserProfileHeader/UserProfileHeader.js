import React, { PureComponent } from 'react'
import BackgroundProfile from './components/BackgroundProfile'
import RoundedProfile from './components/RoundedProfile'

export default class UserProfileHeader extends PureComponent {
  render () {
    const { user } = this.props
    if (user.flags.changedProfilePicture) {
      return <BackgroundProfile {...this.props} />
    }
    return <RoundedProfile {...this.props} />
  }
}
