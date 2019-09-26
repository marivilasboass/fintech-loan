import React from 'react'

import { Card, View, Typography, Spacing, Colors } from '~/newUI'
import format from '~/services/format'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dashed
  },
  row: {
    flexDirection: 'row',
    paddingVertical: Spacing.s5
  },
  halfContent: {
    flex: 1,
    paddingHorizontal: Spacing.s2
  },
  card: {
    height: 130
  }
})

export default class InvestmentSummary extends React.PureComponent {
  render () {
    const { profit, investment, profitPercentage } = this.props
    return (
      <View style={{ marginBottom: 20 }}>
        <Card shadowProps={{ x: 0, y: 0, opacity: 0.5 }} style={styles.card}>
          <View style={[styles.row].concat(styles.border)}>
            <Typography.T1 align='right' style={styles.halfContent}>Investimento</Typography.T1>
            <Typography.T2 style={styles.halfContent} color={Colors.scoreA}>R$ <Typography.T1 color={Colors.scoreA}>{format('newCurrency', investment)}</Typography.T1></Typography.T2>
          </View>
          <View style={styles.row}>
            <Typography.T2 align='right' style={styles.halfContent}>Lucro esperado</Typography.T2>
            <View style={styles.halfContent}>
              <Typography.T2>R$ <Typography.T1>{format('newCurrency', profit)}</Typography.T1></Typography.T2>
              <Typography.T2 color={Colors.warmGray}>({format('percentage', profitPercentage * 100).replace('.', ',')} a.a)</Typography.T2>
            </View>
          </View>
        </Card>
      </View>
    )
  }
}
