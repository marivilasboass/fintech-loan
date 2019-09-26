import React from 'react'
import { Modal as RNModal } from 'react-native'

export default class ModalKit extends React.PureComponent {
  render () {
    return (
      <RNModal
        animationType='fade'
        {...this.props}
      />
    )
  }
}
