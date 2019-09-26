import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Checkbox } from '~/newUI'

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'black'
  }
})

export default class CheckBoxList extends React.PureComponent {
  onSelect = item => {
    let selectedItems = [...this.props.values]
    if (selectedItems.includes(item)) {
      selectedItems = selectedItems.filter(selectedItem => selectedItem !== item)
    } else {
      selectedItems.push(item)
    }
    this.props.onSelect(selectedItems)
  }

  render () {
    const { options, boxStyle, outerStyle, textStyle, values, limit } = this.props
    return (
      <View style={outerStyle}>
        { options.map(({ label, value }, index) => (!limit || index < limit) ? (
          <Checkbox
            key={value}
            checked={values.includes(value)}
            onChange={() => this.onSelect(value)}
            textStyle={[styles.text].concat(textStyle)}
            label={label}
            boxStyle={boxStyle}
          />
        ) : null) }
      </View>
    )
  }
}
