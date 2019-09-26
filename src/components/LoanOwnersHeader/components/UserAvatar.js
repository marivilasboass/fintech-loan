import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Avatar } from '~/UI'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 90
  }
})

export default class UserAvatar extends Component {
  render () {
    const { nickname, smallProfilePicture, type, style } = this.props
    return (
      <View style={[styles.container, style]}>
        <Avatar picture={smallProfilePicture} />
        <Text centered bold size='small'>{nickname}</Text>
        {type ? (
          <Text secondary size='xsmall'>{type}</Text>
        ) : null}
      </View>
    )
  }
}
