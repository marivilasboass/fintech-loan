import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Spacing, Typography, Colors, Card } from '~/newUI'
import DoughnutChart from '~/components/DoughnutChart/DoughnutChart'
import format from '~/services/format'

const styles = StyleSheet.create({
  scoreChartContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.s3
  },
  content: {
    paddingVertical: Spacing.s3
  },
  scoreChart: {
    flex: 1,
    alignItems: 'center'
  },
  scoreInfoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    marginBottom: Spacing.s3,
    paddingLeft: Spacing.s3
  },
  scoreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Spacing.s3,
    marginBottom: Spacing.s3
  },
  scoreDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scoreSquare: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: Spacing.s1
  }
})

export default class ScoreChart extends React.PureComponent {
  state = {
    scoreChartSize: 0,
    scoreData: {}
  }

  getScoreData = () => Object.keys(this.props.scores).map(key => ({
    label: `Score ${key}`,
    totalPercent: this.props.scores[key].totalPercent,
    value: this.props.scores[key].total,
    color: Colors[`score${key}`]
  }))

  showScore = () => {
    const { hideValue } = this.props
    const scoreData = this.getScoreData()
    return scoreData.map((score) => {
      return (
        <View key={score.label} style={styles.scoreInfo}>
          <View style={styles.scoreDetail}>
            <View style={[styles.scoreSquare, { backgroundColor: score.color }]} />
            <Typography.T6 color={'#485465'}>{score.label}</Typography.T6>
          </View>
          { hideValue
            ? <Typography.T6 color={'#485465'}>{format('percentage', score.totalPercent)}</Typography.T6>
            : <Typography.T6 color={'#485465'}>{score.value} &middot; {format('percentage', score.totalPercent)}</Typography.T6>
          }

        </View>
      )
    })
  }

  render () {
    const { outerStyle, title, totalScore, chartMargin } = this.props
    const scoreData = this.getScoreData()
    const { scoreChartSize } = this.state

    return (
      <Card outerStyle={outerStyle} shadowProps={{ x: 0, y: 0, opacity: 0.5 }}>
        <View style={styles.content}>
          {title && <Typography.T1 style={styles.title} color={Colors.mutualBlue}>{title}</Typography.T1>}

          <View style={styles.scoreChartContainer}>

            {/* Doughnut chart */}
            <View
              style={styles.scoreChart}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout
                this.setState({ scoreChartSize: height })
              }}>
              <DoughnutChart size={scoreChartSize} data={scoreData} margin={chartMargin} total={totalScore} />
            </View>

            {/* Score Display */}
            <View style={styles.scoreInfoContainer}>
              {this.showScore()}
            </View>

          </View>
        </View>

      </Card>
    )
  }
}
