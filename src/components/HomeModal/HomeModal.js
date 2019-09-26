import React from 'react'

import { Modal } from '~/UI'

import HomeSkeleton from '../Skeleton/HomeSkeleton'

export default class HomeModal extends React.PureComponent {
  render () {
    const { banner, onRequestClose, children, ...otherProps } = this.props

    return (
      <Modal
        onRequestClose={onRequestClose} {...otherProps}
      >
        <HomeSkeleton
          banner={banner}
          onLeftPress={onRequestClose}
        >
          {children}
        </HomeSkeleton>
      </Modal>
    )
  }
}
