import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Colors } from '~/newUI'

const styles = StyleSheet.create({
  rates: {
    backgroundColor: Colors.lightlessBlue,
    padding: 2,
    borderRadius: 3,
    minWidth: 56
  },

  text: {
    fontSize: 14,
    fontFamily: 'lato-semibold',
    textAlign: 'center'
  },

  space: {
    marginLeft: 5
  }
})

export default class Rates extends React.PureComponent {
  render = () => (
    <View style={[styles.rates, this.props.right && styles.space]}>
      <Text style={styles.text}>{this.props.children}</Text>
    </View>
  )
}
