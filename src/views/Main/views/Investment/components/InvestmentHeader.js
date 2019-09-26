import React from 'react'

import { Icon, Colors, BaseHeader, HeaderButton } from '~/newUI'

export default class InvestmentHeader extends React.PureComponent {
  render () {
    const { onBack } = this.props

    return (
      <BaseHeader
        backgroundColor={Colors.marineBlue}
        statusBarProps={{ barStyle: 'light-content', backgroundColor: Colors.marineBlue }}
        leftComponent={(
          <HeaderButton onPress={() => onBack && onBack()}>
            <Icon type='svg' name='ChevronLeft' color={Colors.white} />
          </HeaderButton>
        )}
      />
    )
  }
}
