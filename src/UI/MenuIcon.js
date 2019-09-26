import React, { Component } from 'react'
import { Button } from 'react-native-elements'

export default class MenuIcon extends Component {
  render () {
    const { navigation } = this.props
    return (
      <Button icon={{ name: 'menu' }} onPress={() => navigation.navigate('DrawerOpen')} />
    )
  }
}
