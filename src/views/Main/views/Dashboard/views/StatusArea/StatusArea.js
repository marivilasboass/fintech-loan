import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Spacing, Typography, Colors, Card, Switcher } from '~/newUI'
import { ProgressBar } from '../../components'
import { Separator } from '~/components/AdvancedFilter/views/Filter/components'

const styles = StyleSheet.create({
  wrapper: {
    margin: Spacing.s3
  },
  title: {
    marginBottom: Spacing.s3
  },
  lateInvestiments: {
    flexDirection: 'row'
  },
  center: {
    alignSelf: 'center'
  },
  lateInvestimentsTitle: {
    marginVertical: Spacing.s3
  },
  valueTextContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.s3
  },
  received: {
    marginRight: Spacing.s4
  },
  toReceive: {
    marginRight: Spacing.s3
  },
  lateInvestimentValue: {
    width: 120
  },
  lateInvestimentRange: {
    alignItems: 'flex-end',
    width: 60
  },
  lateLoans: {
    alignItems: 'center',
    marginBottom: 36 // switcher size
  },
  switcher: {
    marginBottom: Spacing.s6
  }
})

const statusSwitcher = { left: { label: 'Geral', value: 'General' }, right: { label: 'Este mês', value: 'Monthly' } }

export default class StatusArea extends React.PureComponent {
  state = {
    switcherValue: 'General'

  }

  changeStatusConfig = ({ value }) => {
    this.setState({ switcherValue: value })
    this.props.update({ statusActiveConfig: value })
  }

  showLateLoans = () => {
    const { info } = this.props
    const { lateLoans, dateRange } = info

    return lateLoans.map(({ amount, value, percentage }, index) => {
      if (dateRange.length <= index) {
        return
      }
      const fontWeight = index === 0 ? 'bold' : 'regular'
      return (
        <View key={index} style={styles.lateInvestiments}>
          <View style={styles.lateInvestimentRange}>
            <Typography.T4 variant={fontWeight}>{dateRange[index]}</Typography.T4>
          </View>
          <ProgressBar
            style={{ marginHorizontal: 10 }}
            height={8}
            width={90}
            primaryProgress={{ progress: percentage, color: Colors.red }}
            hideLabels
          />
          <Typography.T4 variant={fontWeight} style={styles.lateInvestimentValue}>R$ {value} ({amount})</Typography.T4>
        </View>
      )
    })
  }

  render () {
    const { outerStyle, info } = this.props
    const { received, planned } = info
    const { switcherValue } = this.state
    return (
      <Card outerStyle={outerStyle} style={styles.wrapper}>

        <Typography.T1 style={styles.title} color={Colors.mutualBlue}>{'Status'}</Typography.T1>

        <Switcher style={styles.switcher} {...statusSwitcher} value={switcherValue} onChange={this.changeStatusConfig} />

        <View style={styles.center}>
          <View style={styles.valueTextContainer}>
            <Typography.T4 style={styles.received}>Recebido</Typography.T4>
            <Typography.T4 color={Colors.money}>R$ {received}</Typography.T4>
          </View>
          <View style={styles.valueTextContainer}>
            <Typography.T4 style={styles.toReceive}>A receber</Typography.T4>
            <Typography.T4>R$ {planned}</Typography.T4>
          </View>
        </View>

        <Separator noMargin />

        <View style={styles.lateLoans}>
          <Typography.T4 style={styles.lateInvestimentsTitle} color={Colors.warmGray}>Em atraso</Typography.T4>
          <View style={styles.center}>
            {this.showLateLoans()}
          </View>
        </View>

      </Card>
    )
  }
}
