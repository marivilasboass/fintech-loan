import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

import View from '../View'
import Text from '../Text'
import Colors from '../Colors'
import Spacing from '../Spacing'
import Checkbox from '../Checkbox'

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    borderColor: Colors.mercury,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    marginLeft: 11,
    marginRight: 19
  },
  label: {
    flex: 0,
    fontSize: 16
  },
  profit: {
    color: Colors.warmGray,
    marginLeft: Spacing.s5,
    lineHeight: 17,
    fontSize: 16
  }
})

export default class ScoreCheckbox extends React.PureComponent {
  onSelect = () => {
    this.props.onSelect(this.props.score)
  }

  render () {
    const { score, profit, style, values } = this.props
    const color = Colors[`score${score}`]
    return (
      <TouchableWithoutFeedback onPress={this.onSelect}>
        <View style={[styles.container].concat(style)}>
          <View style={styles.checkbox}>
            <Checkbox
              onChange={this.onSelect}
              checked={values.includes(score)}
              textStyle={[styles.label].concat({ color })}
              label={`Score ${score}`}
              boxStyle={{ marginRight: 19 }}
              textVariant={'bold'}
            />
          </View>
          <Text style={styles.profit}>
            Lucro potencial <Text variant='bold' style={{ color }}>{profit}%</Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
