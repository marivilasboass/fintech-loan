import React from 'react'
import { View, StyleSheet } from 'react-native'
import Text from '../Text'
import Colors from '../Colors'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.white
  }
})

export default class NoResultsView extends React.PureComponent {
  render () {
    const { children } = this.props

    return (
      <View style={styles.container}>
        <Text bold centered>{children}</Text>
      </View>
    )
  }
}
