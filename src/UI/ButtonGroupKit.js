import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import Colors from './Colors'

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    backgroundColor: '#ffffff'
  }
})

export default class ButtonGroupKit extends Component {
  render () {
    return (
      <ButtonGroup
        selectedBackgroundColor={Colors.primary}
        selectedTextStyle={{ color: '#FFF' }}
        containerStyle={styles.container}
        {...this.props}
      />
    )
  }
}
