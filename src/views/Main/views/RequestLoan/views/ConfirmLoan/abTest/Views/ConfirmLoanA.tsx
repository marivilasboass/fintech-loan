import React from 'react'
import { StyleSheet } from 'react-native'
import math from 'mathjs'
import { NavigationScreenProp } from 'react-navigation'

import { Text, Colors, Tag, Row, Typography, View } from '~/newUI'
import Summary from '~/components/Summary'
import accountStatuses from '~/constants/accountStatuses'

import { SimulatedLoan } from '~/libs/@types/mutual-types/credit-score'
import ConfirmLoanBase from '../components/ConfirmLoanBase'

const styles = StyleSheet.create({
  containerRates: {
    marginVertical: 6
  },

  content: {
    borderRadius: 10,
    borderWidth: 1,
    flexGrow: 1,
    borderColor: Colors.solitude,
    backgroundColor: Colors.white
  },

  tag: {
    width: 60,
    justifyContent: 'center'
  },

  internalContainer: {
    paddingHorizontal: 18
  },

  loanValue: {
    marginVertical: 20
  },

  plots: {
    marginTop: 20,
    marginBottom: 16
  },

  payDay: {
    marginBottom: 20
  },

  totalPayable: {
    paddingVertical: 16
  },

  lastRate: {
    marginBottom: 18
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

export default class ConfirmLoanA extends React.PureComponent<Props> {
  render () {
    const { navigation, screenProps, loan, status, firstName, acceptedBorrowerTermsAt, fetchAccount } = this.props

    return (
      <ConfirmLoanBase
        acceptedBorrowerTermsAt={acceptedBorrowerTermsAt}
        fetchAccount={fetchAccount}
        navigation={navigation}
        screenProps={screenProps}
        status={status}
        title={`Tudo certo, ${firstName}!`}
        subTitle='Você já pode finalizar seu pedido.'
        buttonTitle='Confirmar'
      >
        <View style={styles.content}>
          <Summary>
            <Summary.Card>
              <Row style={[styles.loanValue, styles.internalContainer]}>
                <Typography.T2 variant='semibold'>Valor do empréstimo</Typography.T2>
                <Typography.T2 variant='semibold' format='currencyRounded'>{math.divide(loan.requestedAmountCents, 100)}</Typography.T2>
              </Row>
              <Row style={[styles.containerRates, styles.internalContainer]}>
                <Tag style={styles.tag}>
                  <Typography.T3>Juros</Typography.T3>
                </Tag>
                <Row>
                  <Typography.T2 format='percentage'>{loan.interestPercentagePerMonth}</Typography.T2>
                  <Typography.T2> a.m.</Typography.T2>
                </Row>
              </Row>
              <Row style={[styles.containerRates, styles.internalContainer]}>
                <Tag style={styles.tag}>
                  <Typography.T3>IOF</Typography.T3>
                </Tag>
                <Typography.T2 cents format='currency'>{loan.iofAmountCents}</Typography.T2>
              </Row>
              <Row style={[styles.containerRates, styles.lastRate, styles.internalContainer]}>
                <Tag style={styles.tag}>
                  <Typography.T3>CET</Typography.T3>
                </Tag>
                <Row>
                  <Typography.T2 format='percentage'>{loan.cetPercentagePerMonth}</Typography.T2>
                  <Typography.T2> a.m.</Typography.T2>
                </Row>
              </Row>
            </Summary.Card>

            <Summary.Card>
              <Row style={[styles.plots, styles.internalContainer]}>
                <Text.H5>Parcelas</Text.H5>
                <Typography.T2>
                  <Typography.T1 color={Colors.primary}>{loan.numberOfInstallments}x</Typography.T1> de <Typography.T1 format='currency' cents color={Colors.primary}>{loan.installmentAmountCents}</Typography.T1>
                </Typography.T2>
              </Row>
              <Row style={[styles.payDay, styles.internalContainer]}>
                <Typography.T2 variant='semibold'>Vencimento</Typography.T2>
                <Typography.T2>dia {loan.bestPayDay} de cada mês</Typography.T2>
              </Row>
            </Summary.Card>

            <Summary.Card>
              <Row style={[styles.totalPayable, styles.internalContainer]}>
                <Typography.T2 variant='semibold'>Total a pagar</Typography.T2>
                <Typography.H4 cents color={Colors.primary} format='currency'>{loan.totalAmountCents}</Typography.H4>
              </Row>
            </Summary.Card>
          </Summary>
        </View>
      </ConfirmLoanBase>
    )
  }
}
