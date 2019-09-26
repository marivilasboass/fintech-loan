import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Colors, Row, Spacing, Shadow, Typography } from '~/newUI'

const styles = StyleSheet.create({
  shadowWrapper: {
    marginTop: -55
  },

  container: {
    paddingHorizontal: Spacing.s6
  },

  detailsRow: {
    marginBottom: Spacing.s3
  },

  profitRow: {
    paddingVertical: Spacing.s4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lineGray,
    marginBottom: Spacing.s4
  },

  lastRow: {
    marginBottom: Spacing.s5
  }
})

export default class LoanDetails extends React.PureComponent {
  render () {
    const {
      initialSimulation,
      total,
      selectedLots,
      loading
    } = this.props

    const { totalToInvestCents, totalProfitCents, totalToReceiveCents } = total
    const profit = totalProfitCents / 100
    const { investorTotalProfitPercentage, bestPayDay, numberOfInstallments } = initialSimulation

    return (
      <Shadow layout='auto' radius={6} border={4} outerStyle={styles.shadowWrapper} color={Colors.nightRider} opacity={0.09}>
        <View style={styles.profitRow}>
          <Row style={[styles.container, { alignItems: 'center' }]}>
            <Typography.T1 color={Colors.nightRider}>Você Lucra</Typography.T1>
            <Text loading={loading} loaderProps={{ width: 140 }}>
              <Typography.T1 variant='bold' format='currency' color={Colors[`scoreA`]}>
                {profit}
              </Typography.T1>
              <Typography.T2 color={Colors[`scoreA`]}> (</Typography.T2>
              <Typography.T2 color={Colors[`scoreA`]} format='percentage'>
                {investorTotalProfitPercentage}
              </Typography.T2>
              <Typography.T2 color={Colors[`scoreA`]}>)</Typography.T2>
            </Text>
          </Row>
        </View>

        <View style={styles.container}>
          <Row style={styles.detailsRow}>
            <Typography.T2 color={Colors.nightRider}>Você investe</Typography.T2>
            <Text loading={loading} loaderProps={{ width: 120 }} >
              <Typography.T1 color={Colors.nightRider} format='currency'>{totalToInvestCents / 100}</Typography.T1>
              <Typography.T2 color={Colors.nightRider}> ({selectedLots.length} {selectedLots.length === 1 ? 'cota' : 'cotas'})</Typography.T2>
            </Text>
          </Row>

          <Row style={styles.detailsRow}>
            <Text.T3 color={Colors.nightRider}>Você recebe no total</Text.T3>
            <Text.T3 color={Colors.nightRider} loading={loading} loaderProps={{ width: 100 }} variant='bold' format='currency'>{totalToReceiveCents / 100}</Text.T3>
          </Row>

          <Row style={styles.detailsRow}>
            <Text.T3 color={Colors.nightRider}>Recebendo em</Text.T3>
            <Text loading={loading} loaderProps={{ width: 120 }}>
              <Text.T3 variant='bold' color={Colors.nightRider}>{numberOfInstallments}</Text.T3>
              <Text color={Colors.nightRider}>x de </Text>
              <Text variant='bold' format='currency' color={Colors.nightRider}>{totalToReceiveCents / numberOfInstallments / 100}</Text>
            </Text>
          </Row>

          <Row style={[styles.detailsRow, styles.lastRow]}>
            <Text.T3 color={Colors.nightRider}>Todo dia</Text.T3>
            <Text.T3 variant='bold' loading={loading} loaderProps={{ width: 110 }} color={Colors.nightRider}>{`${bestPayDay} de cada mês`}</Text.T3>
          </Row>
        </View>
      </Shadow>
    )
  }
}
