import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Colors } from '~/newUI'

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.solitude
  }
})

export default class Summary extends React.PureComponent {
  render () {
    const { children } = this.props
    return (
      React.Children.map(children, (child, i) =>
        <View style={(React.Children.count(children) - 1 !== i) && styles.border} {...this.props}>{child}</View>
      )
    )
  }
}

Summary.Card = View
