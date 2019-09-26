import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import { View, Text, Colors, Spacing } from '~/newUI'
import { HeaderComponent, FilterTitledContainer, ScoreCheckBoxList } from '../../components'

const styles = StyleSheet.create({
  title: {
    color: Colors.warmGray
  },
  container: {
    padding: Spacing.s6
  }
})

export default class Scores extends React.PureComponent {
  onSelect = (scores) => {
    this.props.updateFilters({ scores })
  }

  render () {
    const { scores } = this.props
    return (
      <React.Fragment>
        <HeaderComponent
          onBack={() => this.props.navigation.goBack()}
          title='Scores'
        />
        <ScrollView>
          <View style={styles.container}>
            <FilterTitledContainer title={'Selecione uma ou mais opções abaixo:'} TextComponent={Text.T4} titleStyle={styles.title}>
              <ScoreCheckBoxList
                values={scores}
                onSelect={this.onSelect}
              />
            </FilterTitledContainer>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }
}
