import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import View from '../View'
import Colors from '../Colors'
import Typography from '../Typography'

const styles = StyleSheet.create({
  circleActive: {
    borderColor: Colors.brightBlue
  },
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.shadowGray
  }
})

export default class FastSelector extends React.PureComponent {
  onSelect = (option) => {
    this.props.onSelect(option)
  }

  render () {
    const { options, selectedOption, labelKey, valueKey } = this.props
    return (
      <View style={styles.container}>
        {
          options.map((option, index) => (
            <TouchableOpacity style={[styles.circle].concat(((selectedOption === option[valueKey]) && styles.circleActive))} onPress={() => this.onSelect(option)}>
              <Typography.T1>{option[labelKey]}</Typography.T1>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
}
