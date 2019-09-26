import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Colors } from '~/UI'
import { getStatusInfo } from '~/services/loanStatuses'

const styles = StyleSheet.create({
  component: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class LoanStatusBanner extends React.Component {
  render () {
    const { name, color: statusColorName } = getStatusInfo(this.props)

    const backgroundColor = Colors[statusColorName]
    return (
      <View style={[styles.component, { backgroundColor }]}>
        <Text size='small'>STATUS:</Text>
        <Text size='small'>{' '}</Text>
        <Text size='small' bold>{name}</Text>
      </View>
    )
  }
}
