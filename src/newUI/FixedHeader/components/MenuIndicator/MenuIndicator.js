import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import MenuIcon from './icon/MenuIcon'
import MenuWithNotificationIcon from './icon/MenuWithNotificationIcon'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
})

export default class MenuIndicator extends React.PureComponent {
  render () {
    const { style, onPress, count } = this.props
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[style, styles.container]}>
          { count
            ? <MenuWithNotificationIcon />
            : <MenuIcon />
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
