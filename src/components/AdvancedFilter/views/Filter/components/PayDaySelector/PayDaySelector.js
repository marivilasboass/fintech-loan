import React from 'react'

import FastMultipleSelector from '../FastMultipleSelector'

export default class PayDaySelector extends React.PureComponent {
  render () {
    const { updateFilters, bestPayDays, noSeparator } = this.props
    return (
      <FastMultipleSelector
        title='Dia de vencimento das parcelas'
        valueKey='bestPayDays'
        noSeparator={noSeparator}
        updateFilters={updateFilters}
        bestPayDays={bestPayDays}
      />
    )
  }
}
