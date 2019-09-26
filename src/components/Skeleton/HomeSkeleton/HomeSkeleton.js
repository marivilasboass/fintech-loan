import React from 'react'
import BaseSkeleton from '../BaseSkeleton'
import { Colors } from '~/UI'
import navigateBack from '~/utils/navigateBack'

export default class HomeSkeleton extends React.PureComponent {
  defaultOnLeftPress = () => {
    const { navigation } = this.props
    navigateBack(navigation)
  }

  render () {
    const { leftIcon, onLeftPress, headerColor, onCenterPress, centerIcon, ...otherProps } = this.props
    return (
      <BaseSkeleton
        color={headerColor || Colors.darkBlue}
        leftIcon={leftIcon || 'arrow-back'}
        onLeftPress={onLeftPress || this.defaultOnLeftPress}
        onCenterPress={onCenterPress}
        centerIcon={centerIcon}
        {...otherProps}
      />
    )
  }
}
