import React, { PureComponent } from 'react'
import { StyleSheet, Image } from 'react-native'

import { View, Spacing, Colors, Text } from '~/newUI'
import ScoreButton from '~/components/ScoreButton'
import { fullNameAbbreviation } from '~/utils/stringHelper'

const styles = StyleSheet.create({
  takerHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  scoreButton: {
    marginRight: Spacing.s4
  },

  container: {
    paddingHorizontal: Spacing.s6
  },
  wrapper: {
    backgroundColor: Colors.marineBlue,
    paddingTop: Spacing.s4,
    paddingBottom: Spacing.s15
  },

  profilePicture: {
    width: 198,
    height: 198,
    alignSelf: 'center',
    borderRadius: 99,
    borderWidth: 5,
    borderColor: Colors.white,
    marginBottom: Spacing.s9
  }
})

export default class RoundedProfile extends PureComponent {
  render () {
    const { user, score, onPress } = this.props

    return (
      <View style={styles.wrapper}>
        <Image source={{ uri: user.largeProfilePicture }} style={styles.profilePicture} />
        <View style={[styles.takerHeader, styles.container]}>
          <ScoreButton
            style={styles.scoreButton}
            onPress={onPress}
            scoreFull={score}
          />
          <View>
            <Text.H4 color={Colors.white}>{fullNameAbbreviation(user.nickname)}</Text.H4>
            <Text color={Colors.rgbaWhiteOpacity(0.5)}>{user.age} anos</Text>
          </View>
        </View>
      </View>
    )
  }
}
