import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Row, Typography, ProgressBar, Spacing, Colors } from '~/newUI'
import format from '~/services/format'
import { Users, Clock } from '../icons'
import moment from 'moment'

const styles = StyleSheet.create({
  infoBox: {
    paddingBottom: Spacing.s7
  },

  progressBar: {
    marginVertical: Spacing.s6
  },

  investmentInfo: {
    marginLeft: Spacing.s1
  }
})

export default class InvestedLotsDetails extends React.PureComponent {
  render () {
    const {
      titleProps,
      numberOfAvailableLots,
      financedAmountCents,
      quotasInfo,
      expiresAt,
      loading
    } = this.props
    const { totalInvestedPercentage, totalInvestedCents, numberOfInvestors } = quotasInfo
    return (
      <View style={styles.infoBox}>
        <Row style={{ justifyContent: 'center' }}>
          <Typography.H5 {...titleProps} variant='regular' loading={loading} loaderProps={{ width: 220 }}>
            <Typography.H5 {...titleProps} variant='regular'>Restam</Typography.H5>
            <Typography.H5 {...titleProps}> {numberOfAvailableLots} cotas </Typography.H5>
            <Typography.H5 {...titleProps} variant='regular'>disponíveis</Typography.H5>
          </Typography.H5>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <Typography.T2 loading={loading} loaderProps={{ width: 250 }}>
            <Typography.T2>Captados</Typography.T2>
            <Typography.T1> {format('currency', totalInvestedCents / 100)} </Typography.T1>
            <Typography.T2>de {format('currency', financedAmountCents / 100)}</Typography.T2>
          </Typography.T2>
        </Row>
        <ProgressBar style={styles.progressBar} value={totalInvestedPercentage} />
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Row>
            <Clock />
            <Typography.T4 style={styles.investmentInfo} loading={loading} loaderProps={{ width: 110 }}>
              <Typography.T4 color={Colors.darkestGray}>Expira em </Typography.T4>
              <Typography.T4 color={Colors.darkestGray} variant='bold'>{moment(expiresAt).fromNow(true)}</Typography.T4>
            </Typography.T4>
          </Row >
          <Row>
            <Users />
            <Typography.T4 style={styles.investmentInfo} loading={loading} loaderProps={{ width: 130 }}>
              <Typography.T4 color={Colors.darkestGray} variant='bold'>
                {numberOfInvestors} {numberOfInvestors === 1 ? 'pessoa' : 'pessoas'}
              </Typography.T4>
              <Typography.T4 color={Colors.darkestGray}> {numberOfInvestors === 1 ? 'investiu' : 'investiram'}</Typography.T4>
            </Typography.T4>
          </Row >
        </Row>
      </View>

    )
  }
}
