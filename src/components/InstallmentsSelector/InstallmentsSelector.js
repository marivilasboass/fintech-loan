import React from 'react'
import { Picker } from '~/UI'

export default class InstallmentsSelector extends React.PureComponent {
  render () {
    const { initValue, installments, ...otherProps } = this.props

    const options = installments.map(installment => (
      { key: installment, label: `${installment}x` }
    ))

    return (
      <Picker
        initValue={initValue || 'N° Parcelas'}
        data={options}
        {...otherProps}
      />
    )
  }
}
