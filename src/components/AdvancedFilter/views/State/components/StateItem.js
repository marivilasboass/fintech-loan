import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import { Text, View, Spacing, Touch, Colors } from '~/newUI'

const styles = StyleSheet.create({
  itemContent: {
    flexDirection: 'row',
    paddingVertical: Spacing.s3
  }
})

export default class StateItem extends Component {
  isSelected = () => {
    const { item, selected } = this.props
    if (!selected.id) return

    return item.id === selected.id
  }

  render () {
    const { onSelectItem, item } = this.props
    const { name } = item
    return (
      <Touch onPress={() => onSelectItem(item)}>
        <View style={styles.itemContent}>
          <Text.T3 color={this.isSelected() ? Colors.brightBlue : Colors.black} onPress={() => onSelectItem(item)}>
            {name}
          </Text.T3>
        </View>
      </Touch>
    )
  }
}
