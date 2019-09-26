import React from 'react'

import { Icon, Colors, BaseHeader, HeaderButton } from '~/newUI'

export default class CreateProfileHeader extends React.PureComponent {
  render () {
    const { onBack } = this.props

    return (
      <BaseHeader
        backgroundColor='transparent'
        statusBarProps={{ barStyle: 'default' }}
        leftComponent={(
          <HeaderButton onPress={() => onBack && onBack()}>
            <Icon type='svg' name='ChevronLeft' color={Colors.darkestGray} />
          </HeaderButton>
        )}
      />
    )
  }
}
