import React from 'react'
import { StyleSheet } from 'react-native'
import { View, ScoreCheckbox } from '~/newUI'
import profitByScore from '~/constants/profitByScore'

const styles = StyleSheet.create({
  scoreCheckbox: {
    marginBottom: 9
  }
})

export default class ScoreCheckBoxList extends React.PureComponent {
  onSelect = score => {
    let selectedScores = [...this.props.values]
    if (selectedScores.includes(score)) {
      selectedScores = selectedScores.filter(selectedScore => selectedScore !== score)
    } else {
      selectedScores.push(score)
    }
    this.props.onSelect(selectedScores)
  }

  getOptions = () => {
    const { filterOptions, values } = this.props
    const scores = Object.keys(profitByScore)
    if (filterOptions) {
      const result = scores.reduce((accu, curr) => {
        if (values.includes(curr)) {
          return {
            ...accu,
            selecteds: [...accu.selecteds, curr]
          }
        }
        return {
          ...accu,
          unselecteds: [...accu.unselecteds, curr]
        }
      }, {
        selecteds: [],
        unselecteds: []
      })
      return [...result.selecteds, ...result.unselecteds]
    }
    return scores
  }

  render () {
    const { outerStyle, values, limit } = this.props
    return (
      <View style={outerStyle}>
        { this.getOptions().map((score, index) => (!limit || index < limit) ? (
          <ScoreCheckbox
            key={score}
            values={values}
            style={styles.scoreCheckbox}
            score={score}
            profit={profitByScore[score]}
            onSelect={(score) => this.onSelect(score)}
          />
        ) : null) }
      </View>
    )
  }
}
