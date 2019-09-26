import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

import { Spacing, Text, View } from '~/newUI'
import { FilterTitledContainer, CheckBoxList, ScoreCheckBoxList } from '../../components'
import { MinMaxValues, Separator, Region, MoreDetailsButton, FinancedAmountValues, FilterTitle, PayDaySelector, InstallmentsSelector } from './components'
import loanMotives from '~/constants/motives'
import gendersList from '~/constants/genders'

const styles = StyleSheet.create({
  mainTitle: {
    marginTop: Spacing.s7,
    marginBottom: Spacing.s6
  },
  contentMargin: {
    marginBottom: Spacing.s8
  },
  scoreCheckbox: {
    marginBottom: Spacing.s2
  },
  container: {
    flex: 1
  }
})

const minLimit = 3

export default class Filter extends React.PureComponent {
  onFilter = () => {
    this.props.screenProps.onClose()
  }

  getChosenOptionsAligned = (chosenOptions, optionsList) => {
    const options = Object.keys(optionsList).map(key => ({ value: key, label: optionsList[key] }))
    if (!chosenOptions.length) {
      return options
    }
    const sortedChosenOptions = options.filter(option => chosenOptions.includes(option.value))
    const unchosenOptions = options.filter(option => !chosenOptions.includes(option.value))
    return [...sortedChosenOptions, ...unchosenOptions]
  }

  render () {
    const { motives, scores, updateFilters, navigation, genders, screenProps, resetFilters } = this.props
    const { short } = screenProps || {}
    return (
      <View style={styles.container}>
        {!short && (
          <FilterTitle onFilter={this.onFilter} resetFilters={resetFilters} />
        )}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <React.Fragment>

            <View style={{ marginHorizontal: Spacing.s6 }}>
              {!short && (
                <Text.T1
                  variant={'heavy'}
                  style={styles.mainTitle}
                >
                  Dados do empréstimo
                </Text.T1>
              )}

              <FinancedAmountValues {...this.props} />

              <InstallmentsSelector {...this.props} />

              <TouchableOpacity onPress={() => navigation.navigate('Scores')} activeOpacity={1}>
                <FilterTitledContainer title='Score' outerStyle={styles.contentMargin} TextComponent={Text.T3} textVariant={'bold'}>
                  <ScoreCheckBoxList
                    outerStyle={styles.scoreCheckbox}
                    filterOptions
                    limit={scores.length > minLimit ? scores.length : minLimit}
                    values={scores}
                    onSelect={scores => updateFilters({ scores })}
                  />
                  <MoreDetailsButton title='Ver demais scores' />
                </FilterTitledContainer>
                <Separator />
              </TouchableOpacity>

              <PayDaySelector {...this.props} />

              <TouchableOpacity onPress={() => navigation.navigate('LoanMotivesScreen')} activeOpacity={1}>
                <FilterTitledContainer outerStyle={styles.contentMargin} title={'Motivo do empréstimo'} TextComponent={Text.T3} textVariant={'bold'}>
                  <CheckBoxList
                    options={this.getChosenOptionsAligned(motives, loanMotives)}
                    limit={motives.length > minLimit ? motives.length : minLimit}
                    values={motives}
                    boxStyle={{ marginVertical: 5 }}
                    outerStyle={{ marginBottom: Spacing.s3 }}
                    onSelect={motives => updateFilters({ motives })}
                  />
                  <MoreDetailsButton title='Ver outros motivos' />
                </FilterTitledContainer>
              </TouchableOpacity>
            </View>
            <Separator noMargin />
            <View style={{ marginHorizontal: Spacing.s6 }}>

              <Text.T1
                variant={'heavy'}
                style={styles.mainTitle}
              >
                Dados do tomador
              </Text.T1>

              <MinMaxValues step={1} title='Idade' valueKey='age' {...this.props} />

              <TouchableOpacity onPress={() => navigation.navigate('GendersScreen')} activeOpacity={1}>
                <FilterTitledContainer outerStyle={{ marginBottom: 27 }} title={'Gênero'} TextComponent={Text.T3} textVariant={'bold'}>
                  <CheckBoxList
                    options={this.getChosenOptionsAligned(genders, gendersList)}
                    limit={genders.length > minLimit ? genders.length : minLimit}
                    values={genders}
                    boxStyle={{ marginVertical: 5 }}
                    outerStyle={{ marginBottom: Spacing.s3 }}
                    onSelect={genders => updateFilters({ genders })}
                  />
                  <MoreDetailsButton title='Ver outros gêneros' />
                </FilterTitledContainer>
              </TouchableOpacity>
              <Separator />

              <Region {...this.props} />

              <MinMaxValues
                currency
                noSeparator
                step={500}
                title='Renda'
                valueKey='incomeCents'
                {...this.props}
              />
            </View>
          </React.Fragment>

        </ScrollView>
      </View>
    )
  }
}
