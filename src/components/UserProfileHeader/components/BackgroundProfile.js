import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'

import { BackgroundSelfie, Spacing, View, Text, Colors } from '~/newUI'

const styles = StyleSheet.create({
  takerHeader: {
    marginTop: 180
  },
  container: {
    paddingHorizontal: Spacing.s6
  }
})

export default class BackgroundProfile extends PureComponent {
  render () {
    const { user } = this.props

    return (
      <BackgroundSelfie image={{ uri: user.largeProfilePicture }} gradient>
        <View style={[styles.takerHeader, styles.container]}>
          <Text.H4 color={Colors.white}>{user.nickname}</Text.H4>
          { user.age > 0 && <Text color={Colors.rgbaWhiteOpacity(0.5)}>{user.age} anos</Text>}
        </View>
      </BackgroundSelfie>
    )
  }
}
