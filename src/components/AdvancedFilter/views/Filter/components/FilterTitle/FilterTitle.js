import React from 'react'

import { Colors } from '~/newUI'
import { HeaderComponent } from '../../../../components'

export default class FilterTitle extends React.PureComponent {
  render () {
    const { resetFilters, onFilter, title } = this.props
    const filterTitle = title || 'Filtros'
    return (
      <HeaderComponent
        leftComponent={{
          text: 'Limpar',
          textStyle: {
            color: Colors.brightBlue
          },
          onPress: resetFilters
        }}
        title={filterTitle}
        rightComponent={{
          text: 'Aplicar',
          textStyle: {
            color: Colors.lightPink
          },
          onPress: onFilter
        }}
      />
    )
  }
}
