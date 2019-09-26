import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import Row from '../Row'
import Colors from '../Colors'
import Spacing from '../Spacing'
import Text from '../Text'

const styles = StyleSheet.create({
  circle: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.lineGray,
    marginRight: Spacing.s2,
    top: 9
  },

  listItem: {
    marginBottom: Spacing.s2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },

  listText: {
    lineHeight: 23
  }
})

export default class ListItem extends PureComponent {
  render () {
    return (
      <Row style={styles.listItem}>
        <View style={styles.circle} />
        <Text style={styles.listText}>{this.props.children}</Text>
      </Row>
    )
  }
}
