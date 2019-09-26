import React from 'react'
import { StyleSheet } from 'react-native'

import { Spacing, View } from '~/newUI'
import { HeaderComponent } from '../../components'
import SearchList from '~/newUI/SearchList'
import states from './constants/states.json'
import StateItem from './components/StateItem'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.s6,
    flex: 1
  }
})

export default class State extends React.PureComponent {
  handleSelect = (state) => {
    this.props.updateFilters({ state })
    this.props.navigation.navigate('City')
  }

  render () {
    return (
      <React.Fragment>
        <HeaderComponent
          onBack={() => this.props.navigation.goBack()}
          title='Escolha o estado'
        />
        <View style={styles.container}>
          <SearchList
            threshold={0.1}
            list={states}
            listKey='id'
            onSelectItem={this.handleSelect}
            filterableKeys={['name']}
            selected={this.props.state}
            listTitle='Selecione uma das opções abaixo:'
            ListItemComponent={StateItem}
          />
        </View>
      </React.Fragment>
    )
  }
}
