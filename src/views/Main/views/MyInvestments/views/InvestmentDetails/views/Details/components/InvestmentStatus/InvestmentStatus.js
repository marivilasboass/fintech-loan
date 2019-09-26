import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo'
import * as R from 'ramda'

import { View, Typography, InstallmentsProgressBar, Colors, Spacing } from '~/newUI'
import { getStatus } from '~/services/investmentStatuses'
import { getAmountToReceiveCents } from '~/utils/installmentsHelpers'

const backgroundExtraSize = 80

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  container: {
    position: 'relative'
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: Spacing.s6
  },
  title: {
    marginBottom: Spacing.s3
  },
  installments: {
    marginVertical: Spacing.s6
  }
})

export default class InvestmentStatus extends React.PureComponent {
  state = {
    height: 0
  }

  handleOnPress = (installment) => {
    if (this.props.installments.length > 0) {
      this.props.onPress(installment)
    }
  }

  render () {
    const { installments, investment, noInstalllmentsToExpire } = this.props
    const { height } = this.state

    const { totalReceivedCents, installments: loanInstallments } = investment
    const { title, subTitle, color } = getStatus(investment)

    const installmentsAvailable = R.isEmpty(installments) ? loanInstallments : installments

    const extraSize = noInstalllmentsToExpire ? 0 : backgroundExtraSize
    const totalHeight = height > 0 ? height + extraSize : 0
    const marginBottom = subTitle ? Spacing.s6 : 0

    const totalToReceive = (totalReceivedCents + getAmountToReceiveCents(installments)) / 100

    return (
      <View style={styles.container} onLayout={event => this.setState({ height: event.nativeEvent.layout.height })}>
        <LinearGradient
          colors={color}
          style={[styles.background].concat({ height: totalHeight })}
        />
        <View style={[styles.titleContainer].concat([{ marginBottom }])} paddedHorizontally>
          <Typography.H5 adaptSize style={styles.title} color={Colors.white}>
            {title}
          </Typography.H5>
          { subTitle ? (
            <Typography.T2 align='center' adaptSize color={Colors.white}>{subTitle}</Typography.T2>
          ) : (
            <Typography.T2 adaptSize color={Colors.white}>
              Você já recebeu R$ <Typography.T1 format='newCurrency' color={Colors.white}> {totalReceivedCents} </Typography.T1> de <Typography.T2 format='currency' color={Colors.white}>{totalToReceive}</Typography.T2>
            </Typography.T2>
          )}
        </View>
        { !subTitle && (
          <View style={styles.installments} paddedHorizontally>
            <InstallmentsProgressBar onPress={this.handleOnPress} installments={installmentsAvailable} />
          </View>
        )}
      </View>
    )
  }
}
