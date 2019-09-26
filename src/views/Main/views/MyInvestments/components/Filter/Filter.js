import React from 'react'
import { ScrollView } from 'react-native'

import { BottomSheet, Typography, View, Spacing, Text } from '~/newUI'
import { FilterTitle, InstallmentsSelector, PayDaySelector, FinancedAmountValues, Separator } from '~/components/AdvancedFilter/views/Filter/components'
import { FilterTitledContainer, ScoreCheckBoxList } from '~/components/AdvancedFilter/components'

export default class Filter extends React.PureComponent {
  onClose = () => {
    const { onClose, startPagination } = this.props
    startPagination()
    onClose()
  }

  render () {
    const { active, updateFilters, filters, resetFilters } = this.props
    return (
      <BottomSheet onPress={this.onClose} active={active}>
        <React.Fragment>
          <FilterTitle onFilter={this.onClose} resetFilters={resetFilters} />
          <ScrollView>
            <React.Fragment>
              <View paddedHorizontally style={{ marginVertical: Spacing.s7 }}>
                <Typography.H3>
                  Dados do investimento
                </Typography.H3>
              </View>
              <View paddedHorizontally>
                <FinancedAmountValues updateFilters={updateFilters} financedAmount={filters.financedAmount} />

                <InstallmentsSelector updateFilters={updateFilters} numberOfInstallments={filters.numberOfInstallments} />
              </View>
              <View paddedHorizontally>
                <FilterTitledContainer title='Score' TextComponent={Text.T3} textVariant={'bold'}>
                  <ScoreCheckBoxList
                    filterOptions
                    values={filters.scores}
                    onSelect={scores => updateFilters({ scores })}
                  />
                </FilterTitledContainer>
                <Separator />
              </View>
              <View paddedHorizontally>
                <PayDaySelector noSeparator updateFilters={updateFilters} payDays={filters.payDays} />
              </View>
            </React.Fragment>
          </ScrollView>
        </React.Fragment>
      </BottomSheet>
    )
  }
}
