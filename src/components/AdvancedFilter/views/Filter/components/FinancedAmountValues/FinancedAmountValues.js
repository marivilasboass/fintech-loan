import React from 'react'

import MinMaxValues from '../MinMaxValues'

export default class FinancedAmountValues extends React.PureComponent {
  static defaultProps = {
    step: 500,
    noSeparator: false
  }
  render () {
    const { step, financedAmountCents, updateFilters, noSeparator } = this.props
    return (
      <MinMaxValues
        step={step}
        title='Valor por pedido de empréstimo'
        currency
        valueKey='financedAmountCents'
        noSeparator={noSeparator}
        financedAmountCents={financedAmountCents}
        updateFilters={updateFilters}
      />
    )
  }
}
