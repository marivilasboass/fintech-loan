import React, { Component } from 'react'
import { Colors } from '~/UI'

import BaseSkeleton from '../BaseSkeleton'

export default class Skeleton extends Component {
  defaultLeftPress = () => {
    this.props.navigation.goBack(null)
  }

  render () {
    const { leftIcon, onLeftPress, ...otherProps } = this.props

    return (
      <BaseSkeleton
        color={Colors.blackRock}
        leftIcon={leftIcon || 'arrow-back'}
        onLeftPress={onLeftPress || this.defaultLeftPress}
        {...otherProps}
      />
    )
  }
}
