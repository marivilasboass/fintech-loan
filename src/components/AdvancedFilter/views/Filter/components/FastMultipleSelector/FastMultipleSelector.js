import React from 'react'
import limits from '~/constants/limits'

import { FilterTitledContainer, FastSelector } from '../../../../components'
import Separator from '../Separator'
import { Text, Spacing } from '~/newUI'
import { StyleSheet } from 'react-native'

const numberOfInstallments = limits.installments.map(insta => ({ value: insta, label: `${insta}x` }))
const bestPayDays = limits.invoiceMaturity.map(invo => ({ value: invo, label: invo }))

const options = {
  numberOfInstallments,
  bestPayDays
}

const styles = StyleSheet.create({
  fastSelector: {
    marginHorizontal: Spacing.s3,
    marginBottom: Spacing.s9
  }
})

export default class FastMultipleSelctor extends React.Component {
  shouldComponentUpdate = nextProps => {
    const { valueKey } = this.props
    return this.props[valueKey] !== nextProps[valueKey]
  }

  render () {
    const { valueKey, title, updateFilters, noSeparator } = this.props
    const values = this.props[valueKey]
    return (
      <FilterTitledContainer title={title} TextComponent={Text.T3} textVariant='bold'>
        <FastSelector
          options={options[valueKey]}
          values={values}
          size={49}
          style={styles.fastSelector}
          onSelect={values => updateFilters({ [valueKey]: values })}
        />
        {!noSeparator && <Separator />}
      </FilterTitledContainer>
    )
  }
}
