import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { WebBrowser } from 'expo'
import * as R from 'ramda'

import { View, Typography, Colors, Spacing, Card, TitleAndValueRow, Button, Message } from '~/newUI'
import TitledContainer from '~/components/TitledContainer'
import LoanInstallmentCarousel from '~/components/LoanInstallmentCarousel'
import { fullNameAbbreviation } from '~/utils/stringHelper'
import format from '~/services/format'
import { InvestmentStatus } from './components'
import { getInstallmentsToReceive, getAmountToReceiveCents } from '~/utils/installmentsHelpers'
import { hasInstallmentsToPay, isFinished } from '~/utils/investmentsHelpers'

import { LoadingIndicator } from '../../../../components'
import moment from 'moment'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  buttonContainer: {
    paddingVertical: Spacing.s6,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white
  },
  message: {
    marginVertical: Spacing.s6,
    marginHorizontal: Spacing.s6
  },
  investmentConditionItem: {
    paddingBottom: Spacing.s3
  },
  separator: {
    marginVertical: Spacing.s6,
    paddingVertical: Spacing.s5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.dashed,
    borderBottomColor: Colors.dashed,
    marginHorizontal: Spacing.s6
  },
  investmentCondition: {
    paddingVertical: Spacing.s5
  }
})

export default class Details extends React.PureComponent {
  openCCB = () => {
    const { navigation } = this.props.screenProps
    const { investment } = navigation.state.params
    if (investment.mutualCcb) {
      WebBrowser.openBrowserAsync(investment.mutualCcb)
    }
  }

  checkIfHasInstallments = () => {
    const { navigation } = this.props.screenProps
    const { installments } = this.props
    const { investment } = navigation.state.params

    if (hasInstallmentsToPay(investment, installments)) {
      return true
    }

    return false
  }

  getTotalToReceive = () => {
    const { navigation } = this.props.screenProps
    const { investment } = navigation.state.params
    const { installments } = this.props
    const { totalFinancedAmountCents, maxProfitCents } = investment
    if (installments.length > 0) {
      return getAmountToReceiveCents(installments) / 100
    }
    return (maxProfitCents + totalFinancedAmountCents) / 100
  }

  renderInstallmentsTotal = (props) => {
    const { navigation } = this.props.screenProps
    const { installments } = this.props
    const { investment } = navigation.state.params
    if (installments.length === 0) {
      const { initialNumberOfInstallments } = investment
      return <Typography.T2 {...props}>{initialNumberOfInstallments}x</Typography.T2>
    }
    return (
      <Typography.T2 {...props}>
        {installments.length}x de R$ <Typography.T1 format='newCurrency'>{!R.isEmpty(installments) && installments[0].initialAmountDueCents / 100}</Typography.T1>
      </Typography.T2>
    )
  }

  fetchInstallments = () => {
    const { navigation } = this.props.screenProps
    const { investment } = navigation.state.params
    if (investment.activeNegotiationId) {
      this.props.fetchInstallments(investment.activeNegotiationId)
    }
  }

  render () {
    const { navigation } = this.props.screenProps
    const { loading, installments, selectInstallment } = this.props
    const { investment } = navigation.state.params
    const { totalFinancedAmountCents, borrower, totalReceivedCents } = investment

    const hasInstallments = this.checkIfHasInstallments()
    const totalToReceive = this.getTotalToReceive()

    const installmentsToReceive = getInstallmentsToReceive(installments)

    const lastInstallment = installments[installments.length - 1]

    return (
      <View style={styles.wrapper}>
        <LoadingIndicator active={loading} />
        <ScrollView>
          <InvestmentStatus onPress={selectInstallment} noInstalllmentsToExpire={!hasInstallments} investment={investment} loading={loading} installments={installments} />

          {hasInstallments && (
            <TitledContainer
              outerStyle={{ paddingHorizontal: 0, marginTop: 0 }}
              innerStyle={{ marginHorizontal: Spacing.s6 }}
              title={'PRÓXIMOS RECEBIMENTOS'}
              titleStyle={{ color: Colors.white }} >
              <LoanInstallmentCarousel onPress={selectInstallment} data={installmentsToReceive} />
            </TitledContainer>
          )}

          <TitledContainer title={'CONDIÇÕES DO INVESTIMENTO'}>
            <Card style={styles.investmentCondition}>
              <TitleAndValueRow currency title={{ text: 'Valor Investido', component: Typography.T1 }} value={{ text: format('newCurrency', totalFinancedAmountCents / 100), component: Typography.H5 }} />
              <TitleAndValueRow style={styles.separator} title={{ text: 'Tomador' }} value={{ text: fullNameAbbreviation(borrower.nickname) }} />
              <TitleAndValueRow currency style={styles.investmentConditionItem} title={{ text: 'Recebido' }} value={{ text: format('newCurrency', totalReceivedCents / 100) }} />
              <TitleAndValueRow currency style={styles.investmentConditionItem} title={{ text: 'À receber' }} value={{ props: { loading }, text: format('newCurrency', totalToReceive) }} />
              <TitleAndValueRow style={styles.investmentConditionItem} title={{ text: 'Parcelamento' }} value={{ component: this.renderInstallmentsTotal }} />
              <TitleAndValueRow title={{ text: 'Quitação prevista' }} value={{ text: lastInstallment ? moment(lastInstallment.dueDate).format('DD/MM/YYYY') : '-', component: Typography.T1 }} />
            </Card>
          </TitledContainer>

          <Message variant='info' style={styles.message}>
            <Typography.T3>
              {
                isFinished(investment)
                  ? 'Consulte o seu contrato (CCB) sempre que necessário, nele constam todas as informações legais do seu empréstimo junto a Mutual'
                  : 'Parcelamento e demais informações, serão exibidas após concluirmos o processo de análise.'
              }
            </Typography.T3>
          </Message>

        </ScrollView>
        { isFinished(investment) && (
          <View style={styles.buttonContainer} paddedHorizontally>
            <Button title='Visualizar meu contrato' onPress={this.openCCB} />
          </View>
        )}
      </View>
    )
  }
}
