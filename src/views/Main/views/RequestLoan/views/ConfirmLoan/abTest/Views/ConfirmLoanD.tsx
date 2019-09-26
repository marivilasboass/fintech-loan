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
    marginBottom: Spacing.s1
  },

  card: {
    marginTop: Spacing.s5,
    marginBottom: Spacing.s1
  },

  title: {
    marginTop: Spacing.s1
  },

  marginBottom: {
    marginBottom: Spacing.s6
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

export default class ConfirmLoanD extends React.PureComponent<Props> {
  renderYearTaxes = (props) => {
    const { loan } = this.props
    return (
      <Typography.H4 color={Colors.primary} variant='regular' {...props}>
        <Typography.H4 color={Colors.primary} format='percentage'>{loan.interestPercentagePerMonth}</Typography.H4> a.m.
      </Typography.H4>
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

  renderTotal = (props) => {
    const { loan } = this.props
    return (
      <Typography.H4 color={Colors.primary} variant='regular' {...props}>
        R$ <Typography.H4 color={Colors.primary} cents format='newCurrency'>{loan.totalAmountCents}</Typography.H4>
      </Typography.H4>
    )
  }

  render () {
    const { navigation, screenProps, loan, status, acceptedBorrowerTermsAt, fetchAccount } = this.props

    return (
      <ConfirmLoanBase
        acceptedBorrowerTermsAt={acceptedBorrowerTermsAt}
        fetchAccount={fetchAccount}
        navigation={navigation}
        screenProps={screenProps}
        status={status}
        fixedHeaderSize={270}
        title={`Meu empréstimo`}
        subTitleSmall='com uma das melhores taxas do mercado, simples assim:'
        buttonTitle='Confirmar'
      >
        <View style={[styles.content, styles.marginBottom]}>
          <Summary>
            <Summary.Card style={styles.card}>
              <View paddedHorizontally>
                <Typography.T1 style={styles.title}>Valor a pagar</Typography.T1>
                <Typography.H5 variant='regular' style={styles.total} color={Colors.warmGray}>
                  <Typography.H1 color={Colors.primary} variant='light'>R$ </Typography.H1>
                  <Typography.H1 cents format='newCurrency' color={Colors.primary}>{loan.installmentAmountCents}</Typography.H1> em <Typography.H5 color={Colors.warmGray}>{loan.numberOfInstallments}</Typography.H5>x
                </Typography.H5>
                <Typography.T2 style={styles.row}>Vencimento dia {loan.bestPayDay} de cada mês</Typography.T2>
              </View>
            </Summary.Card>
            <Summary.Card style={styles.card}>
              <TitleAndValueRow style={styles.row} title={{ text: 'Valor solicitado', component: Typography.T1 }} value={{ text: 'Seus juros', component: Typography.T1 }} />
              <TitleAndValueRow style={styles.row} title={{ component: this.renderTotal }} value={{ component: this.renderYearTaxes }} />
            </Summary.Card>
          </Summary>
        </View>
        <View style={styles.content}>
          <Summary>
            <Summary.Card style={styles.card}>
              <TitleAndValueRow style={styles.row} title={{ text: 'Custo efetivo total' }} value={{ component: this.renderCet }} />
              <TitleAndValueRow style={styles.row} title={{ text: 'IOF' }} currency value={{ text: format('newCurrency', math.divide(loan.iofAmountCents, 100)) }} />
            </Summary.Card>
          </Summary>
        </View>
      </ConfirmLoanBase>
    )
  }
}
