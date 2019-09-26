import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

import { FilterTitledContainer } from '../../../../components'
import { Chip, View, DoubleSlider, Spacing, Text } from '~/newUI'
import limits from '~/constants/filter'
import Separator from '../Separator'
import format from '~/services/format'

const { loan, age, income } = limits
const values = {
  financedAmountCents: loan,
  age,
  incomeCents: income
}

const styles = StyleSheet.create({
  doubleSliderContainer: {
    marginVertical: Spacing.s5
  }
})

const { width } = Dimensions.get('window')
const sliderWidth = width - Spacing.s6 * 2

export default class MinMaxValues extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    const { valueKey } = this.props
    const { min, max } = this.props[valueKey]
    const { min: nextMin, max: nextMax } = nextProps[valueKey]
    return min !== nextMin || max !== nextMax
  }

  handleChange = sliderValues => {
    const { updateFilters, valueKey } = this.props
    updateFilters({ [valueKey]: { min: sliderValues[0], max: sliderValues[1] } })
  }

  getText = () => {
    const { valueKey, currency } = this.props
    let { min, max } = this.props[valueKey]
    const { max: maxValue } = values[valueKey]
    const atMax = max === maxValue
    if (currency) {
      min = `${format('currencyRounded', min).replace('R$', 'R$ ')}`
      max = `${format('currencyRounded', max).replace('R$', 'R$ ')}`
    }
    return `${min} - ${max}${atMax ? '+' : ''}`
  }

  render () {
    const { valueKey, title, step, noSeparator, SubTitle } = this.props
    const value = this.props[valueKey]
    const { min, max } = values[valueKey]
    return (
      <FilterTitledContainer title={title} TextComponent={Text.T3} SubTitle={SubTitle} textVariant={'bold'}>
        <Chip text={this.getText()} />
        <View style={styles.doubleSliderContainer}>
          <DoubleSlider
            sliderLength={sliderWidth}
            min={min}
            max={max}
            values={[value.min, value.max]}
            step={step}
            onValuesChange={this.handleChange}
          />
        </View>
        {!noSeparator && <Separator />}
      </FilterTitledContainer>
    )
  }
}
