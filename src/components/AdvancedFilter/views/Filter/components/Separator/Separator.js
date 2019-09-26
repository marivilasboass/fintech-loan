import React from 'react'
import { StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { Spacing } from '~/newUI'

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#F0F1F2'
  },
  marginBottom: {
    marginBottom: Spacing.s7
  }
})

export default class Separator extends React.PureComponent {
  render () {
    const { noMargin } = this.props
    return <Divider style={[styles.separator].concat(!noMargin ? styles.marginBottom : null)} />
  }
}
