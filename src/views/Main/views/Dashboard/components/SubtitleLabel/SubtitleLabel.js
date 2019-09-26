import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Typography, Spacing } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end'
  }
})

export default class SubtitleLabel extends React.PureComponent {
  render () {
    const { labels, style } = this.props
    return (
      <View style={[styles.container].concat(style)}>
        {labels.map(({ labelName, color }, index) => {
          const addMargin = index !== labels.length - 1
          return (
            <View key={index} style={[styles.container, addMargin ? { marginRight: Spacing.s2 } : {}]}>
              <View style={{ height: 5, width: 5, backgroundColor: color, marginRight: 4 }} />
              <Typography.T6>{labelName}</Typography.T6>
            </View>
          )
        })}
      </View>
    )
  }
}
