import React from 'react'
import { StyleSheet } from 'react-native'
import math from 'mathjs'
import { NavigationScreenProp } from 'react-navigation'

import { Colors, Typography, View, TitleAndValueRow, Spacing } from '~/newUI'
import Summary from '~/components/Summary'
import accountStatuses from '~/constants/accountStatuses'

import { SimulatedLoan } from '~/libs/@types/mutual-types/credit-score'
import ConfirmLoanBase from '../components/ConfirmLoanBase'
import format from '~/services/format'

const styles = StyleSheet.create({
  content: {
    borderRadius: 10,
    borderWidth: 1,
    flexGrow: 1,
    borderColor: Colors.solitude,
    backgroundColor: Colors.white
  },

  row: {
    marginBottom: Spacing.s3
  },

  total: {
    marginVertical: Spacing.s6
  },

  fistCard: {
    marginTop: Spacing.s5,
    marginBottom: Spacing.s1
  }
})

type Props = {
  acceptedBorrowerTermsAt: string | null,
  fetchAccount: () => { status: accountStatuses },
  navigation: NavigationScreenProp,
  screenProps: { navigation: NavigationScreenProp },
  status: accountStatuses,
  firstName: string,
  loan: SimulatedLoan
}

export default class ConfirmLoanB extends React.PureComponent<Props> {
  renderYearTaxes = (props) => {
    const { loan } = this.props
    return (
      <Typography.T2 {...props}>
        <Typography.T1 format='percentage' color={Colors.primary}>{loan.interestPercentagePerMonth}</Typography.T1>
        <Typography.T2 color={Colors.primary}> a.m.</Typography.T2>
      </Typography.T2>
    )
  }

  renderCet = (props) => {
    const { loan } = this.props
    return (
      <Typography.T2 {...props}>
        <Typography.T1 format='percentage'>{loan.cetPercentagePerYear}</Typography.T1>
        <Typography.T2> a.a.</Typography.T2>
      </Typography.T2>
    )
  }

  renderDueDate = (props) => {
    const { loan } = this.props
    return (
      <Typography.T2 {...props} color={Colors.primary}>
        <Typography.T1 color={Colors.primary}>dia {loan.bestPayDay} </Typography.T1>
        de cada mês
      </Typography.T2>
    )
  }

  renderTotalToPay = (props) => {
    const { loan } = this.props
    return (
      <Typography.T2 {...props} color={Colors.primary}>
        <Typography.T2 color={Colors.primary}>{loan.numberOfInstallments}x R$ </Typography.T2>
        <Typography.H4 cents format='newCurrency' color={Colors.primary}>{loan.installmentAmountCents}</Typography.H4>
      </Typography.T2>
    )
  }

  render () {
    const { navigation, screenProps, loan, status, firstName, acceptedBorrowerTermsAt, fetchAccount } = this.props

    return (
      <ConfirmLoanBase
        acceptedBorrowerTermsAt={acceptedBorrowerTermsAt}
        fetchAccount={fetchAccount}
        navigation={navigation}
        screenProps={screenProps}
        status={status}
        fixedHeaderSize={270}
        title={`Tudo certo, ${firstName}!`}
        subTitleSmall='Encontramos a parcela que cabe no seu bolso, sem prejudicar seu orçamento:'
        buttonTitle='Liberar meu empréstimo'
      >
        <View style={styles.content}>
          <Summary>
            <Summary.Card style={styles.fistCard}>
              <TitleAndValueRow style={styles.row} title={{ text: 'Seu empréstimo' }} currency value={{ text: format('newCurrency', math.divide(loan.requestedAmountCents, 100)) }} />
              <TitleAndValueRow style={styles.row} title={{ text: 'Taxa de Juros' }} value={{ component: this.renderYearTaxes }} />
              <TitleAndValueRow style={styles.row} title={{ text: 'IOF' }} currency value={{ text: format('newCurrency', math.divide(loan.iofAmountCents, 100)) }} />
              <TitleAndValueRow style={styles.row} title={{ text: 'CET' }} value={{ component: this.renderCet }} />
              <TitleAndValueRow style={styles.row} title={{ text: 'Vencimento' }} value={{ component: this.renderDueDate }} />
            </Summary.Card>

            <Summary.Card>
              <TitleAndValueRow style={styles.total} title={{ text: 'Total a pagar', component: Typography.H5 }} value={{ component: this.renderTotalToPay }} />
            </Summary.Card>
          </Summary>
        </View>
      </ConfirmLoanBase>
    )
  }
}
