import React from 'react'
import { StyleSheet } from 'react-native'

import Text from '../../Text'
import Spacing from '../../Spacing'

const styles = StyleSheet.create({
  title: {
    marginBottom: Spacing.s3,
    marginHorizontal: Spacing.s7,
    textAlign: 'center'
  }
})

export default class AlertTitle extends React.PureComponent {
  render () {
    const { style, ...props } = this.props
    return <Text.H4 style={[styles.title].concat(style)} {...props} />
  }
}
