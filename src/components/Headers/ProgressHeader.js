import React, { Component } from 'react'

import { Icon, Colors, BaseHeader, HeaderButton } from '~/newUI'

export default class ProgressHeader extends Component {
  render () {
    const { onBack } = this.props

    return (
      <BaseHeader
        backgroundColor={Colors.white}
        statusBarProps={{ barStyle: 'dark-content', backgroundColor: Colors.white }}
        leftComponent={(
          <HeaderButton onPress={() => onBack && onBack()}>
            <Icon type='svg' name='ChevronLeft' color={Colors.black} />
          </HeaderButton>
        )}
      />
    )
  }
}
