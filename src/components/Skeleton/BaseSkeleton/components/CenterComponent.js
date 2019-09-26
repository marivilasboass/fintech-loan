import * as React from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Colors, Spacing } from '~/newUI'

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  centerText: {
    fontFamily: 'open-sans-bold',
    color: Colors.white,
    fontSize: 18,
    alignSelf: 'center'
  },
  iconContainer: {
    marginLeft: Spacing.s2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class CenterComponent extends React.Component {
  render () {
    const { text, onPress, icon } = this.props
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.centerContainer}>
          <Text style={styles.centerText}>{text}</Text>
          <View style={styles.iconContainer}>
            {icon}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default CenterComponent
