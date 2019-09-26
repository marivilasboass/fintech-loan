import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { View, Text, Colors } from '~/newUI'
import SelectorItem from './SelectorItem'

const styles = StyleSheet.create({
  circleActive: {
    shadowColor: '#d9eaff',
    borderColor: Colors.brightBlue
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

export default class FastSelector extends React.PureComponent {
  handleSelect = (value) => {
    const { values, onSelect } = this.props
    const valueIndex = values.indexOf(value)
    const newValues = [].concat(values)
    if (valueIndex !== -1) {
      newValues.splice(valueIndex, 1)
    } else {
      newValues.push(value)
    }
    onSelect(newValues)
  }

  render () {
    const { options, internStyle, onSelect, values, ...props } = this.props
    return (
      <View style={styles.container}>
        {
          options.map((option) => (
            <SelectorItem
              Component={TouchableOpacity}
              size={40}
              activeOpacity={1}
              {...props}
              key={option.value}
              hasShadow
              activeStyle={values.includes(option.value) && styles.circleActive}
              onPress={() => this.handleSelect(option.value)}
              shape={'square'}
              radius={10}
            >
              <Text style={internStyle} variant={values.includes(option.value) ? 'heavy' : undefined}>{option.label}</Text>
            </SelectorItem>
          ))
        }
      </View>
    )
  }
}
