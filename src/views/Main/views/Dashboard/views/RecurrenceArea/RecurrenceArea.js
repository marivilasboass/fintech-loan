import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { View, Colors, Spacing, Card } from '~/newUI'
import { Separator } from '~/components/AdvancedFilter/views/Filter/components'
import { SubtitleLabel, MultipleCardInfo } from '../../components'
import LineChart from '~/components/LineChart/LineChart'

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: Spacing.s3
  },
  lineChartContainer: {
    marginHorizontal: Spacing.s3
  },
  lineChart: {
    marginVertical: Spacing.s1
  }
})

export default class RecurrenceArea extends PureComponent {
  state = {
    lineGraphicSize: 0
  }

  getGraphicLines = () => {
    const { info } = this.props
    const { primaryData, secondaryData } = info
    return [{ color: Colors.mutualBlue, data: primaryData }, { color: Colors.mutualPink, data: secondaryData }]
  }

  render () {
    const { outerStyle, handleInfoPress, info } = this.props
    const { lineGraphicSize } = this.state
    const { primaryRate, primaryProfit, secondaryRate, secondaryProfit, cdiRate } = info
    const lines = this.getGraphicLines()

    return (
      <Card outerStyle={outerStyle} style={styles.cardContainer}>
        <MultipleCardInfo
          info={[
            { title: 'Retorno',
              value: `${primaryProfit}%`,
              valueDescription: primaryRate,
              description: `Retorno ${secondaryRate.toLowerCase()} de ${secondaryProfit}%`,
              info: 'O quanto o empréstimo retorna, ganho do investimento',
              onPressInfo: handleInfoPress
            },
            {
              title: 'CDI',
              value: cdiRate ? `${cdiRate}%` : '0%',
              valueDescription: 'de CDI',
              description: ' '
            }]}
          borderless
        />
        <View
          style={styles.lineChartContainer}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout
            this.setState({ lineGraphicSize: width })
          }}>

          <Separator noMargin />

          <View style={styles.lineChart}>
            <LineChart lines={lines} width={lineGraphicSize} />
          </View>

          <SubtitleLabel
            labels={[{ labelName: `Retorno ${primaryRate}`, color: Colors.mutualBlue },
              { labelName: `Retorno ${secondaryRate}`, color: Colors.mutualPink }]}
          />
        </View>
      </Card>

    )
  }
}
