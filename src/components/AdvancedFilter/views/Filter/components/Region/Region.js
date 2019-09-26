import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { FilterTitledContainer } from '../../../../components'
import { Chip, Text, Spacing, View } from '~/newUI'
import Separator from '../Separator'
import { allCityValue } from '../../../City/constants/allCitiesValue'
import MoreDetailsButton from '../MoreDetailsButton'

const styles = StyleSheet.create({
  button: {
    marginBottom: Spacing.s7
  },
  chip: {
    marginBottom: Spacing.s6,
    marginRight: Spacing.s3
  },
  chips: {
    flexDirection: 'row'
  }
})

export default class MinMaxValues extends React.Component {
  handleNavigationChange = () => {
    this.props.navigation.navigate('State')
  }

  handleClose = () => {
    this.props.updateFilters({ state: {}, city: {} })
  }

  renderChip = () => {
    const { state, city, address } = this.props
    if (state.id) {
      return (
        <Chip
          style={styles.chip}
          text={city.name ? `${city.name}, ${state.id}` : `${allCityValue}, ${state.id}`}
          onClose={this.handleClose}
        />
      )
    }
    if (city.name) {
      return (
        <Chip
          style={styles.chip}
          text={city.name}
          onClose={this.handleClose}
        />
      )
    }
    return (
      <View style={styles.chips}>
        <Chip
          style={styles.chip}
          text='Todas'
        />
        { address && address.city && (
          <Chip
            selectable
            style={styles.chip}
            text={address.city}
            onPress={() => this.props.updateFilters({ city: { name: address.city } })}
          />
        )}
      </View>
    )
  }

  render () {
    return (
      <FilterTitledContainer title='Localidade' TextComponent={Text.T3} textVariant={'bold'}>
        {this.renderChip()}
        <TouchableWithoutFeedback onPress={this.handleNavigationChange}>
          <View>
            <MoreDetailsButton style={styles.button} title='Escolher cidade e estado' />
          </View>
        </TouchableWithoutFeedback>
        <Separator />
      </FilterTitledContainer>
    )
  }
}
