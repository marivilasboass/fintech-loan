import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Text, Colors } from '~/UI'
import { getRiskText, getScoreLetter } from '~/services/score'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})

export default class ScoreText extends React.PureComponent {
  render () {
    const { scoreFull } = this.props

    const risk = getRiskText(scoreFull)
    const color = Colors[`score${getScoreLetter(scoreFull)}`] || Colors.scoreUnknown
    const textStyle = { color }

    return (
      <View style={styles.container}>
        <Text style={textStyle} bold>SCORE:</Text>
        <Text style={textStyle}>{' '}</Text>
        <Text style={textStyle}>{scoreFull}</Text>
        <Text style={textStyle}>{' '}</Text>
        <Text style={textStyle}>{`(${risk})`}</Text>
      </View>
    )
  }
}
