import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import FilterIcon from './icon/FilterIcon'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
})

export default class FilterIndicator extends React.PureComponent {
  render () {
    const { style, onPress } = this.props
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[style, styles.container]}>
          <FilterIcon />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
