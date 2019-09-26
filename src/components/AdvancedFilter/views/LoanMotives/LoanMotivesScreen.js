import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import { View, Text, Colors, Spacing } from '~/newUI'
import { HeaderComponent, FilterTitledContainer, CheckBoxList } from '../../components'
import motives from '~/constants/motives'

const styles = StyleSheet.create({
  title: {
    color: Colors.warmGray
  },
  container: {
    padding: Spacing.s6
  }
})

export default class LoanMotivesScreen extends React.PureComponent {
  onSelect = (motives) => {
    this.props.updateFilters({ motives })
  }

  render () {
    const options = Object.keys(motives).map(key => ({ value: key, label: motives[key] }))
    const { motives: motivesValues } = this.props
    return (
      <React.Fragment>
        <HeaderComponent
          onBack={() => this.props.navigation.goBack()}
          title='Motivo do empréstimo'
        />
        <ScrollView>
          <View style={styles.container}>
            <FilterTitledContainer title={'Selecione uma ou mais opções abaixo:'} TextComponent={Text.T4} titleStyle={styles.title}>
              <CheckBoxList
                options={options}
                values={motivesValues}
                boxStyle={{ marginVertical: 5 }}
                onSelect={motives => this.onSelect(motives)}
              />
            </FilterTitledContainer>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }
}
