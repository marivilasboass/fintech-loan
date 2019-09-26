import React from 'react'
import { StyleSheet, Alert, ScrollView } from 'react-native'
import math from 'mathjs'
import moment from 'moment'

import { Text, Typography, View, Colors, Spacing, Row, Message, ProgressPercentageAndValue } from '~/newUI'
import accountStatuses from '~/constants/accountStatuses'
import UserProfileHeader from '~/components/UserProfileHeader'
import { isAnalysisStatus } from '~/services/accountStatuses'
import InvestmentWarning from './components/InvestmentWarning'

import {
  InvestmentHeader,
  BottomSheetDetail,
  LoanDetails,
  MoreDetails,
  BottomSheetConfirmation,
  InvestedLotsDetails,
  InvestmentControlButton
} from './components'

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: Colors.white,
    flex: 1
  },

  container: {
    paddingHorizontal: Spacing.s6
  },

  title: {
    marginTop: Spacing.s7,
    marginBottom: Spacing.s3
  },

  infoBox: {
    paddingBottom: Spacing.s7
  },

  infoBoxBorder: {
    borderTopWidth: 1,
    borderColor: Colors.lineGray
  },

  info: {
    marginTop: Spacing.s2,
    marginBottom: Spacing.s15
  },

  rowInfo: {
    marginHorizontal: Spacing.s2,
    marginVertical: Spacing.s2
  }

})

const titleProps = {
  color: Colors.marineBlue,
  style: styles.title,
  align: 'center'
}

const initialInfo = {
  totalToReceiveCents: 0,
  totalToInvestCents: 0,
  totalProfitCents: 0
}

const CDIDefaultPercentage = 0.06

export default class InvestmentDetail extends React.PureComponent {
  state = {
    bottomSheet: false,
    confirmation: false,
    loading: false,
    refreshing: false,
    selectedLots: [],
    lots: this.props.loan.availableLots,
    quotasInfo: this.props.loan.quotasInfo,
    showWarning: false
  }

  componentDidMount () {
    this.addLot()
  }

  getAvailableLots = async () => {
    const { fetchAvailableLots, loan } = this.props
    this.setState({ loading: true })
    const availableLots = await fetchAvailableLots(loan._id)
    this.setState({ loading: false })
    return availableLots
  }

  getTotal = () =>
    this.state.selectedLots.reduce(
      (accu, { financedAmountCents, maxProfitCents }) => {
        return {
          totalToInvestCents: accu.totalToInvestCents + financedAmountCents,
          totalProfitCents: accu.totalProfitCents + maxProfitCents,
          totalToReceiveCents: accu.totalToReceiveCents + financedAmountCents + maxProfitCents
        }
      }, initialInfo)

  addLot = () => {
    const { selectedLots, lots } = this.state
    if (selectedLots.length < lots.length) {
      this.setState({ selectedLots: [...selectedLots, lots[selectedLots.length]] })
    }
  }

  removeLot = () => {
    const { selectedLots } = this.state
    if (selectedLots.length > 1) {
      const lots = [...selectedLots]
      lots.pop()
      this.setState({ selectedLots: lots })
    }
  }

  goToMarketPlaceAndRefresh = () => {
    this.props.startPagination()
    this.onBack()
  }

  handleAccept = async () => {
    const { balance, screenProps, hasInvestment, loan, navigation } = this.props
    const { _id } = loan
    const { status } = await this.props.fetchAccount()

    if (status === accountStatuses.pendingData) {
      return Alert.alert(
        'Pendências',
        'Você precisa resolver suas pendências de cadastro antes de investir',
        [
          {
            text: 'Visualizar pendências',
            onPress: () => navigation.navigate('Pendencies')
          }
        ]
      )
    }

    if (isAnalysisStatus(status)) {
      return Alert.alert(
        'Cadastro em análise...',
        'Ainda estamos analisando as informações do seu seu perfil. Por favor aguarde, nós iremos avisá-lo :)',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Investments')
          }
        ]
      )
    }

    if (status === accountStatuses.fraud) {
      return Alert.alert(
        'Conta  bloqueada',
        'Sua conta foi bloqueada! Entre em contato com nosso suporte',
        [
          {
            text: 'Ok',
            onPress: () => screenProps.navigation.navigate('Pendencies')
          }
        ]
      )
    }

    if (status === accountStatuses.noLimit) {
      return Alert.alert(
        'Conta sem limite',
        'Sua conta não possui limite. Você poderá verificar seu limite novamente em 30 dias.',
        [
          {
            text: 'Ok',
            onPress: () => screenProps.navigation.navigate('Pendencies')
          }
        ]
      )
    }
    const { totalToInvestCents } = this.getTotal()
    const amountToInvest = totalToInvestCents / 100
    const amountNeededToInvest = amountToInvest - balance
    if (amountNeededToInvest > 0) {
      return Alert.alert(
        'Você não possui saldo suficiente',
        'Recomendamos que carregue sua carteira com saldo suficiente para diversificar em pelo menos 20 cotas, assim diluindo seu risco.',
        [
          { text: 'Ok', onPress: () => navigation.navigate('Wallet', { addMoney: true }) }
        ],
        { cancelable: false }
      )
    }
    const { selectedLots } = this.state
    const quotas = selectedLots.reduce((acc, { totalQuotas }) => acc + totalQuotas, 0)
    if (!hasInvestment) {
      navigation.navigate('InvestmentTutorial', { loanId: _id, quotas })
    } else {
      navigation.navigate('AcceptLoan', { previousRoute: 'Investment', loanId: _id, quotas })
    }
  }

  toggleBottomSheet = () => this.setState(prevState => ({ bottomSheet: !prevState.bottomSheet }))

  openConfirmation = async () => {
    const { loading, selectedLots } = this.state
    try {
      const { availableLots, quotasInfo } = await this.getAvailableLots()
      if (availableLots.length < selectedLots.length) {
        this.setState({ lots: availableLots, selectedLots: availableLots, quotasInfo })
        Alert.alert('Ops!', `Quantidade indisponível. Selecionamos ${availableLots.length} lote(s) para você`)
        return
      }
      if (availableLots.length >= selectedLots.length) {
        const updatedSelectedLots = selectedLots.slice(0, selectedLots.length)
        this.setState({ lots: availableLots, selectedLots: updatedSelectedLots, quotasInfo })
      }
    } catch (e) {
      Alert.alert(
        'Ops!',
        'As cotas pra esse emprestimos acabaram.',
        [{
          text: 'Sair',
          onPress: () => this.goToMarketPlaceAndRefresh()
        }],
        { cancelable: false }
      )
    }
    if (selectedLots.length > 2) {
      this.setState({ showWarning: true })
      return
    }
    this.setState(prevState => ({
      confirmation: !loading
    }))
  }

  closeConfirmation = () => {
    this.setState({
      confirmation: false
    })
  }

  onBack = () => {
    this.props.navigation.goBack(null)
  }

  onContinueToInvest = () => {
    const { loading } = this.state
    this.setState({ showWarning: false, confirmation: !loading })
  }

  render () {
    const { isSelf, loan } = this.props
    const { selectedLots, lots, loading, quotasInfo, showWarning } = this.state
    const { borrower, initialSimulation, borrowerScoreData, expiresAt } = loan
    const { financedAmountCents, numberOfInstallments, investorTotalProfitPercentage } = initialSimulation

    const {
      monthlyCommitmentPercent,
      monthlyCommitmentWithInstallmentPercent,
      rangeIncomeCents,
      relativeIncomeRange
    } = borrowerScoreData

    const memberSince = moment(borrower.createdAt).format('MMMM [de] YYYY')
    const rangeIncome = {
      start: math.divide(rangeIncomeCents.start, 100),
      finish: rangeIncomeCents.finish ? math.divide(rangeIncomeCents.finish, 100) : null
    }

    const availableIncomePercent = Math.max(1 - monthlyCommitmentWithInstallmentPercent, 0)

    const total = this.getTotal()

    const simpleReturnTax = Math.pow(1 + 0.07, numberOfInstallments / 12) - 1

    return (
      <View style={styles.backgroundContainer}>
        {showWarning && (
          <InvestmentWarning
            isVisible={showWarning}
            onContinue={this.onContinueToInvest}
            onCancel={() => this.setState({ showWarning: false })}
          />
        )}
        <View style={this.state.bottomSheet && { backgroundColor: Colors.stage }}>
          <InvestmentHeader onBack={this.onBack} />
        </View>
        <ScrollView>
          <UserProfileHeader
            user={borrower}
            score={loan.scoreFull}
            onPress={this.toggleBottomSheet}
          />

          <View style={styles.container}>
            <LoanDetails
              selectedLots={selectedLots}
              total={total}
              loading={loading}
              {...loan}
            />

            <InvestedLotsDetails
              titleProps={titleProps}
              financedAmountCents={financedAmountCents}
              numberOfAvailableLots={lots.length}
              quotasInfo={quotasInfo}
              expiresAt={expiresAt}
              loading={loading}
            />

            <View style={[ styles.infoBox, styles.infoBoxBorder ]}>
              <Typography.H5 {...titleProps}>Comparativo de investimento</Typography.H5>
              <Typography.T2 align='center' color={Colors.nightRider}>
                Prazo de <Typography.T1>{numberOfInstallments} meses</Typography.T1>
              </Typography.T2>
              <Row style={styles.rowInfo}>
                <Typography.T3 color={Colors.darkestGray}>Mutual</Typography.T3>
                <Typography.T4 color={Colors.darkestGray}>Potencial de lucro</Typography.T4>
              </Row>

              <ProgressPercentageAndValue loading={loading} colors={Colors.lightToDarkBlue} value={investorTotalProfitPercentage} percentage={investorTotalProfitPercentage} roi={total.totalProfitCents} />
              <View style={styles.rowInfo}>
                <Typography.T3 color={Colors.darkestGray}>Renda fixa</Typography.T3>
              </View>
              <ProgressPercentageAndValue loading={loading} colors={Colors.lightToDarkYellow} value={CDIDefaultPercentage} percentage={simpleReturnTax} roi={total.totalToInvestCents * simpleReturnTax} />
            </View>

            <View style={[styles.infoBox, styles.infoBoxBorder]}>
              <Text.T2 {...titleProps} variant='bold'>Renda mensal estimada</Text.T2>
              {rangeIncome.finish ? (
                <Row style={{ justifyContent: 'center' }}>
                  <Text color={Colors.nightRider}>Faixa de </Text>
                  <Text variant='bold' format='currencyRounded' color={Colors.nightRider}>{rangeIncome.start}</Text>
                  <Text color={Colors.nightRider}> à </Text>
                  <Text variant='bold' format='currencyRounded' color={Colors.nightRider}>{rangeIncome.finish}</Text>
                </Row>
              ) : (
                <Row style={{ justifyContent: 'center' }}>
                  <Text color={Colors.nightRider}>Faixa mensal de </Text>
                  <Text format='currencyRounded'>{rangeIncome.start}</Text>
                  <Text color={Colors.nightRider}>+.</Text>
                </Row>
              )}
            </View>

            <MoreDetails
              loan={loan} titleProps={titleProps}
              onPress={this.toggleBottomSheet} style={[styles.infoBox, styles.infoBoxBorder]}
            />

            {loan.motive && (
              <View style={[styles.infoBox, styles.infoBoxBorder]}>
                <Text.T2 {...titleProps} variant='bold'>Motivo do empréstimo</Text.T2>
                <Text align='center' color={Colors.nightRider}>{loan.motive}</Text>
              </View>
            )}

            <View style={[styles.infoBox, styles.infoBoxBorder]}>
              <Text style={styles.title} align='center'>
                <Text.T2 {...titleProps}>Reside em</Text.T2>
                <Text.T2 {...titleProps} variant='bold'> {borrower.address.city}, {borrower.address.state}</Text.T2>
              </Text>
              <Text align='center' color={Colors.nightRider}>Membro da Mutual desde {memberSince}</Text>
            </View>

            <Message variant='info' style={styles.info}>
              <Text.T4 align='center'>
                Os custos de cobrança, intermediação, e originação do empréstimo junto a instituição financeira já estão cobertos na proposta de investimento.
              </Text.T4>
            </Message>
          </View>
        </ScrollView>
        <InvestmentControlButton
          onAdd={this.addLot}
          onRemove={this.removeLot}
          onPress={this.openConfirmation}
          loading={loading}
          selectedLots={selectedLots}
          disabled={isSelf}
          totalToInvestCents={total.totalToInvestCents}
        />

        <BottomSheetConfirmation
          active={this.state.confirmation}
          onPress={this.closeConfirmation}
          onConfirm={this.handleAccept}
          selectedLots={selectedLots}
          lots={lots}
          total={total}
          loan={loan}
        />

        <BottomSheetDetail
          active={this.state.bottomSheet} onPress={this.toggleBottomSheet}
          loan={loan} relativeIncomeRange={relativeIncomeRange}
          monthlyCommitmentWithInstallmentPercent={monthlyCommitmentWithInstallmentPercent}
          rangeIncome={rangeIncome} monthlyCommitmentPercent={monthlyCommitmentPercent}
          availableIncomePercent={availableIncomePercent}
        />
      </View>
    )
  }
}
