import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Fuse from 'fuse.js'

import { View, Text, Input, Spacing } from '~/newUI'
import Colors from '~/newUI/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listTitle: {
    color: Colors.warmGray,
    fontSize: 14,
    marginBottom: Spacing.s2
  },
  inputContainer: {
    marginBottom: Spacing.s7
  },
  input: {
    fontSize: 14
  }
})

export default class SearchList extends Component {
  state = {
    searchValue: ''
  }

  handleSearchChange = (searchValue) => this.setState({ searchValue })

  handleSelectItem = (item) => {
    const { onSelectItem } = this.props
    if (typeof onSelectItem === 'function') {
      onSelectItem(item)
    }
  }

  renderListItem = ({ item }) => {
    const { ListItemComponent, listItemProps, selected, listKey } = this.props
    const itemProps = {
      ...listItemProps,
      onSelectItem: this.handleSelectItem,
      selected
    }
    const itemKey = listKey || 'id'
    return (
      <ListItemComponent key={item[itemKey]} {...itemProps} item={item} />
    )
  }

  render () {
    const { list, inputProps, listTitle, listKey, filterableKeys, threshold, style, autoFocus } = this.props
    const { searchValue } = this.state

    const itemKey = listKey || 'id'

    const options = {
      keys: filterableKeys,
      threshold: threshold || 0.6
    }

    const visibleList = searchValue ? (new Fuse(list, options)).search(searchValue) : list
    return (
      <View style={[styles.container].concat(style)}>
        <Input
          leftIcon={{ name: 'Search', type: 'svg', color: Colors.warmGray }}
          {...inputProps}
          withoutHelp
          autoFocus={autoFocus}
          style={styles.inputContainer}
          inputStyle={styles.input}
          value={searchValue}
          onChange={this.handleSearchChange}
        />
        {listTitle && <Text style={styles.listTitle}>{listTitle}</Text>}
        <FlatList
          data={visibleList}
          extraData={this.props.selected}
          keyExtractor={item => item[itemKey]}
          renderItem={this.renderListItem}
        />
      </View>
    )
  }
}
