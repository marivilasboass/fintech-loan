import React from 'react'
import { StyleSheet } from 'react-native'

import { Spacing, View } from '~/newUI'
import { HeaderComponent } from '../../components'
import SearchList from '~/newUI/SearchList'
import cities from './constants/cities.json'
import CityItem from './components/CityItem'
import { allCityValue } from './constants/allCitiesValue'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.s6,
    flex: 1
  }
})

export default class State extends React.PureComponent {
  state = {
    list: []
  }

  handleSelect = (city) => {
    this.props.updateFilters({ city })
    this.props.navigation.navigate('Filter')
  }

  componentDidMount () {
    const { state } = this.props
    this.setState({ list: cities[state.id] })
  }

  getList = () => {
    const list = this.state.list.map(city => ({ name: city }))
    list.unshift({ name: allCityValue })
    return list
  }

  render () {
    const { state } = this.props
    return (
      <React.Fragment>
        <HeaderComponent
          onBack={() => this.props.navigation.goBack()}
          title={`Escolha a cidade em ${state.name}`}
        />
        <View style={styles.container}>
          <SearchList
            threshold={0.1}
            list={this.getList()}
            listKey='name'
            onSelectItem={this.handleSelect}
            filterableKeys={['name']}
            selected={this.props.city}
            listTitle='Selecione uma das opções abaixo:'
            ListItemComponent={CityItem}
          />
        </View>
      </React.Fragment>
    )
  }
}
