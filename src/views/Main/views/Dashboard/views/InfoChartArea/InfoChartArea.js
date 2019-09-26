import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Colors, Spacing, Card } from '~/newUI'
import { CardInfo, SubtitleLabel, MultipleCardInfo } from '../../components'
import { Separator } from '~/components/AdvancedFilter/views/Filter/components'
import DoughnutChart from '~/components/DoughnutChart/DoughnutChart'

const styles = StyleSheet.create({
  doughnutChartContainer: {
    flexDirection: 'row',
    marginVertical: Spacing.s6
  },
  chartsArea: {
    marginHorizontal: Spacing.s3
  },
  doughnutChart: {
    flex: 1,
    alignItems: 'center'
  },
  doughnutInfo: {
    flex: 1
  }
})

export default class InfoChartArea extends React.PureComponent {
  state = {
    progressBarWidth: 0,
    doughnutChartSize: 0
  }

  render () {
    const { outerStyle, handleInfoPress, info, dashboardActiveConfig } = this.props
    const { doughnutChartSize } = this.state
    const { plannedValue, realizedValue, installmentsInfo, descriptions } = info
    const { interest, interestPercentage, primary, primaryPercentage } = installmentsInfo
    const chartData = [{ value: primaryPercentage, color: Colors.mutualBlue },
      { value: interestPercentage, color: Colors.mutualPink }]
    return (
      <Card outerStyle={outerStyle}>
        <MultipleCardInfo
          info={[
            { title: 'Recebido',
              value: `R$ ${realizedValue}`,
              info: descriptions.right,
              onPressInfo: handleInfoPress
            },
            { title: dashboardActiveConfig,
              value: `R$ ${plannedValue}`,
              info: descriptions.left,
              onPressInfo: handleInfoPress
            }
          ]}
          borderless
        />
        <View
          style={styles.chartsArea}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout
            this.setState({ progressBarWidth: width })
          }}>
          <Separator noMargin />
          <View style={styles.doughnutChartContainer}>
            {/* Doughnut chart */}
            <View
              style={styles.doughnutChart}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout
                this.setState({ doughnutChartSize: height })
              }}>
              <DoughnutChart size={doughnutChartSize} data={chartData} margin={5} total={realizedValue} />
            </View>

            <View style={styles.doughnutInfo}>
              <CardInfo
                title={`Principal (${primaryPercentage}%)`}
                infoTitle='Principal'
                value={`R$ ${primary}`}
                style={{ marginTop: 0 }}
                info={descriptions.main}
                onPressInfo={handleInfoPress}
              />
              <CardInfo
                title={`Juros (${interestPercentage}%)`}
                titleColor={Colors.mutualPink}
                value={`R$ ${interest}`}
                style={{ marginVertical: 0 }}
              />
              <SubtitleLabel
                labels={[{ labelName: 'Principal', color: Colors.mutualBlue },
                  { labelName: 'Juros', color: Colors.mutualPink }]}
                style={{ marginTop: 4 }}
              />
            </View>
          </View>
        </View>
      </Card>
    )
  }
}
