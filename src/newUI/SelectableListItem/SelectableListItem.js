import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import { Text, View, Icon, Spacing } from '~/newUI'
import Colors from '~/newUI/Colors'
import Touch from '../Touch'

const styles = StyleSheet.create({
  selectedItem: {
    color: Colors.focused
  },
  itemContent: {
    flexDirection: 'row',
    paddingVertical: Spacing.s1
  }
})

export default class SelectableListItem extends Component {
  shouldComponentUpdate (nextProps) {
    const { selected, item } = this.props
    const isSelected = selected === item.value
    const willBeSelected = nextProps.selected === nextProps.item.value

    return isSelected !== willBeSelected
  }

  render () {
    const { onSelectItem, selected, item } = this.props
    const { value } = item
    const isSelected = value === selected
    return (
      <Touch onPress={() => onSelectItem(item)}>
        <View style={styles.itemContent}>
          <Text onPress={() => onSelectItem(item)} style={isSelected && styles.selectedItem}>
            {value}
          </Text>
          {isSelected && <Icon name='check' size={18} color={Colors.focused} />}
        </View>
      </Touch>
    )
  }
}
