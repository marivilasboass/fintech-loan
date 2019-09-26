import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Text, Icon, Colors } from '~/newUI'

const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  icon: {
    flexGrow: 1
  },
  text: {
    marginTop: 12,
    textAlign: 'center'
  }
})

export default class IconWithText extends React.PureComponent {
  render () {
    const { icon, text } = this.props

    return (
      <View style={styles.rowItem}>
        <Icon type='svg' name={icon} color={Colors.veryLightGray} style={styles.icon} />
        <Text style={styles.text} color={Colors.darkestGray}>{text}</Text>
      </View>
    )
  }
}
