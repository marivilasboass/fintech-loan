import React from 'react'

import FastMultipleSelector from '../FastMultipleSelector'

export default class InstallmentsSelector extends React.PureComponent {
  render () {
    const { updateFilters, numberOfInstallments, noSeparator } = this.props
    return (
      <FastMultipleSelector
        title='Número de parcelas'
        valueKey='numberOfInstallments'
        updateFilters={updateFilters}
        noSeparator={noSeparator}
        numberOfInstallments={numberOfInstallments}
      />
    )
  }
}
