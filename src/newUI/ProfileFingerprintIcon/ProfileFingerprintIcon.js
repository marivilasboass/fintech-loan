import React from 'react'
import SmallProfileFingerprintIcon from './components/SmallProfileFingerprintIcon'
import BigProfileFingerprintIcon from './components/BigProfileFingerprintIcon'

export default class ProfileFingerprintIcon extends React.PureComponent {
  render () {
    if (this.props.small) {
      return (
        <SmallProfileFingerprintIcon />
      )
    }
    return <BigProfileFingerprintIcon />
  }
}
