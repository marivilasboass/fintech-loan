import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Typography, Colors, Spacing } from '~/newUI'
import ChevronRight from '../../icons/ChevronRight'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginTop: Spacing.s1,
    marginLeft: Spacing.s2
  }
})

export default class MoreDetailsButton extends React.PureComponent {
  render () {
    const { title, style } = this.props
    return (
      <View style={[styles.row].concat(style)}>
        <Typography.T1 color={Colors.brightBlue}>{title}</Typography.T1>
        <ChevronRight style={styles.icon} />
      </View>
    )
  }
}
