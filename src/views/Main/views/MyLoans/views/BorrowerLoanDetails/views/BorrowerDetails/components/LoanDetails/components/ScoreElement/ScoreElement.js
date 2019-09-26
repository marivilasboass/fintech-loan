import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Colors } from '~/UI'
import { getRiskText, getScoreLetter } from '~/services/score'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
})

export default class ScoreElement extends React.PureComponent {
  onPress = () => {
    this.setState({ modalVisible: true })
  }

  onRequestClose = () => {
    this.setState({ modalVisible: false })
  }

  render () {
    const { scoreFull, style } = this.props

    const risk = getRiskText(scoreFull)
    const scoreLetter = getScoreLetter(scoreFull)
    const backgroundColor = Colors[`score${scoreLetter}`] || Colors.scoreUnknown

    const containerStyle = [
      styles.container,
      { backgroundColor },
      style
    ]

    return (
      <View style={containerStyle}>
        <Text bold white>{`SCORE: ${scoreFull || scoreLetter} `}</Text>
        <Text white>→</Text>
        {scoreLetter ? (
          <Text white light>{` Investimento ${risk}`}</Text>
        ) : (
          <Text white light>{` Em processamento`}</Text>
        )}
      </View>
    )
  }
}
