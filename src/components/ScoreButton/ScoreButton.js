import React from 'react'
import { StyleSheet } from 'react-native'
import { Touch, Typography, View, Colors } from '~/newUI'
import { getScoreLetter } from '~/services/score'

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  }
})

export default class ScoreButton extends React.PureComponent {
  render () {
    const { style, scoreFull, onPress } = this.props

    const scoreLetter = getScoreLetter(scoreFull)
    const scoreColor = Colors[`score${scoreLetter}`]
    const scoreSuffix = scoreFull && scoreFull.length > 1 && scoreFull.charAt(1)

    return (
      <Touch onPress={onPress}>
        <View style={[styles.container].concat([{ backgroundColor: scoreColor }, style])}>
          <Typography.H2 color={Colors.white}>{scoreLetter}</Typography.H2>
          {scoreSuffix && <Typography.H5 variant='regular' color={Colors.white}>{scoreSuffix}</Typography.H5>}
        </View>
      </Touch>
    )
  }
}
