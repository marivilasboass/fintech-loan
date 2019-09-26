import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '~/UI'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCC210',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    width: 80,
    height: 25,
    padding: 5
  }
})

export default class Arrow extends Component {
  render () {
    const { title, style } = this.props

    return (
      <View style={[styles.container, style]}>
        <Text light size='xsmall'>{title}</Text>
        <Icon
          name='ios-arrow-round-forward'
          size={16}
          type='ionicon'
        />
      </View>
    )
  }
}
