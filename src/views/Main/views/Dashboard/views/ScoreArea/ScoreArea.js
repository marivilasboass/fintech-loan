import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Spacing, Typography, Colors, Card } from '~/newUI'
import DoughnutChart from '~/components/DoughnutChart/DoughnutChart'

const styles = StyleSheet.create({
  scoreChartContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.s3
  },
  bottomMargin: {
    marginBottom: Spacing.s7
  },
  scoreChart: {
    flex: 2,
    alignItems: 'center'
  },
  scoreInfoWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreInfoDivider: {
    flex: 1,
    alignItems: 'center'
  },
  scoreInfoValue: {
    flex: 3,
    alignItems: 'flex-end'
  },
  scoreInfoPercentage: {
    flex: 3,
    alignSelf: 'flex-start'
  },
  scoreInfo: {
    flexDirection: 'row',
    flex: 3
  },
  title: {
    marginVertical: Spacing.s3,
    paddingLeft: Spacing.s3
  },
  scoreInfoContainer: {
    flexDirection: 'row',
    marginLeft: Spacing.s3,
    marginBottom: Spacing.s3,
    justifyContent: 'space-between'
  },
  scoreDetail: {
    flex: 2,
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

const scoreDefaults = [
  { label: 'Score A', color: Colors.scoreA },
  { label: 'Score B', color: Colors.scoreB },
  { label: 'Score C', color: Colors.scoreC },
  { label: 'Score D', color: Colors.scoreD },
  { label: 'Score E', color: Colors.scoreE }
]

export default class ScoreArea extends React.PureComponent {
  state = {
    scoreChartSize: 0,
    scoreData: [],
    totalScore: 0
  }

  componentDidMount = () => {
    this.setScoreData()
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.info !== this.props.info) {
      this.setScoreData()
    }
  }

  setScoreData = () => {
    const { info: scores } = this.props
    let totalScore = 0
    const scoreData = scores.map(({ total, totalPercent }, index) => {
      totalScore += total
      return { label: scoreDefaults[index].label, value: total, percentage: totalPercent, color: scoreDefaults[index].color }
    })
    this.setState({ scoreData, totalScore })
  }

  showScore = () => {
    const { scoreData } = this.state
    return scoreData.map((score, index) => {
      return (
        <View key={index} style={styles.scoreInfoContainer}>
          <View style={styles.scoreDetail}>
            <View style={[styles.scoreSquare, { backgroundColor: score.color }]} />
            <Typography.T6 variant='semibold' color={'#485465'}>{score.label}</Typography.T6>
          </View>
          <View style={styles.scoreInfo}>
            <View style={styles.scoreInfoValue} >
              <Typography.T6 variant='semibold' color={'#485465'}>{score.value}</Typography.T6>
            </View>
            <View style={styles.scoreInfoDivider}>
              <Typography.T6 variant='semibold' color={'#485465'}>-</Typography.T6>
            </View>
            <View style={styles.scoreInfoPercentage}>
              <Typography.T6 variant='semibold' color={'#485465'}>{score.percentage}%</Typography.T6>
            </View>
          </View>
        </View>
      )
    })
  }

  render () {
    const { outerStyle } = this.props
    const { scoreChartSize, scoreData, totalScore } = this.state
    return (
      <Card outerStyle={outerStyle} style={styles.bottomMargin}>

        <Typography.T2 style={styles.title} variant={'bold'} color={Colors.mutualBlue}>{'Score'}</Typography.T2>

        <View style={styles.scoreChartContainer}>

          {/* Doughnut chart */}
          <View
            style={styles.scoreChart}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout
              this.setState({ scoreChartSize: height })
            }}>
            <DoughnutChart size={scoreChartSize} data={scoreData} margin={15} total={totalScore || ''} />
          </View>

          {/* Score Display */}
          <View style={styles.scoreInfoWrapper}>
            {this.showScore()}
          </View>

        </View>

      </Card>
    )
  }
}
