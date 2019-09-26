import React from 'react'
import { StyleSheet } from 'react-native'

import { Message, Text, Spacing } from '~/newUI'
import messages from './messages'

const styles = StyleSheet.create({
  message: {
    marginHorizontal: Spacing.s5,
    borderRadius: 6,
    marginTop: Spacing.s7
  }
})

export default class FinancialMessage extends React.PureComponent {
  render () {
    const { message, style } = this.props
    return (
      <Message variant='info' style={[styles.message].concat(style)}>
        <Text.T4 variant='semibold' align='center'>
          {messages[message]}
        </Text.T4>
      </Message>
    )
  }
}
