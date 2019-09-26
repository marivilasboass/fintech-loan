import React from 'react'
import { StyleSheet, ScrollView, BackHandler } from 'react-native'
import { View, BaseHeader, HeaderButton, Colors, Typography, Spacing, Text, CountdownButton, Message, InfoModal } from '~/newUI'
import InvestmentSummary from '~/components/InvestmentSummary'
import ReturnChart from '~/components/ReturnChart'
import { BackArrow } from '~/newUI/Icons'
import format from '~/services/format'
import ScoreChart from '~/components/ScoreChart/ScoreChart'
import TimerManager from '../../components/TimerManager'

const styles = StyleSheet.create({
  fixedHeader: {
    height: 250,
    position: 'absolute',
    flex: 1,
    right: 0,
    top: 0,
    left: 0,
    backgroundColor: Colors.mutualBlue
  },
  title: {
    marginBottom: Spacing.s2
  },
  subTitle: {
    marginBottom: Spacing.s8
  },
  finishContainer: {
    backgroundColor: Colors.white,
    paddingBottom: Spacing.s6,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray
  },
  totalText: {
    paddingVertical: Spacing.s6
  },
  info: {
    marginBottom: Spacing.s6
  }
})

export default class Summary extends React.PureComponent {
  state = {
    loading: false,
    infoModalVisible: false,
    infoModal: {}
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBack)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBack)
    BackHandler.addEventListener('hardwareBackPress', this.props.onBack)
  }

  updateTimer = (reset) => {
    if (reset) {
      this.props.resetTimer()
      return
    }
    const { countdown } = this.props
    this.props.update({
      countdown: countdown - 1
    })
  }

  onBack = async () => {
    this.setState({ loading: true })
    await this.props.removeLoansReserved()
    this.updateTimer(true)
    this.setState({ loading: false })
    this.props.enableCountdown()
    this.props.onBack()
  }

  handleModalVisibility = (infoModal) => {
    const { infoModalVisible } = this.state
    this.setState({ infoModalVisible: !infoModalVisible, infoModal: infoModal || {} })
  }

  render () {
    const { rightComponent: StepCounter, countdown, simulationResults, onAdvance, countdownDisabled } = this.props
    const { loading, infoModal, infoModalVisible } = this.state
    const {
      totalToInvestmentCents, totalProfitPercents,
      totalProfitExpectedPercents, totalLoansPerScore, totalReservedLoans,
      totalProfitExpectedCents
    } = simulationResults

    return (
      <TimerManager countdown={countdown} updateTimer={this.updateTimer} onRefresh={this.props.refreshLoansReserved}>
        {
          ({ timer, refreshTime, toggleNeedRefresh }) => (
            <React.Fragment>
              <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
                <View style={styles.fixedHeader} />
                <BaseHeader
                  style={{ backgroundColor: Colors.mutualBlue }}
                  statusBarProps={{ barStyle: 'light-content', backgroundColor: Colors.mutualBlue }}
                  leftComponent={(
                    <HeaderButton onPress={this.onBack}>
                      <BackArrow color={Colors.white} />
                    </HeaderButton>
                  )}
                  rightComponent={(
                    <StepCounter />
                  )}
                />
                <View paddedHorizontally>
                  <Typography.H3 color={Colors.white} style={styles.title} align='center'>Resumo do portfólio</Typography.H3>
                  <Typography.T2 color={Colors.white} style={styles.subTitle} align='center'>Selecionamos diversos empréstimos a partir do seu filtro, avalie as informações para concluir o investimento com sucesso</Typography.T2>
                </View>
                <View paddedHorizontally>
                  <InvestmentSummary investment={totalToInvestmentCents} profit={totalProfitExpectedCents} profitPercentage={totalProfitExpectedPercents} />
                  <ReturnChart hired={totalProfitPercents} expected={totalProfitExpectedPercents} onPressInfo={this.handleModalVisibility} />
                  <ScoreChart chartMargin={Spacing.s6} totalScore={totalReservedLoans} scores={totalLoansPerScore} outerStyle={{ marginBottom: Spacing.s6 }} />
                </View>
                <View paddedHorizontally>
                  <Message variant='info' style={styles.info}>
                    <Typography.T3>Ao concluir o investimento, realizaremos os empréstimos, gerando a sua carteira de investimento e Termo de Endosso.</Typography.T3>
                  </Message>
                </View>
              </ScrollView>
              <View paddedHorizontally style={styles.finishContainer}>
                <Text fontSize={18} align='center' style={styles.totalText}>
                  R$ <Text fontSize={18} variant='bold'>{format('newCurrency', totalToInvestmentCents)}</Text> em {totalReservedLoans} pedidos
                </Text>
                <CountdownButton
                  timer={timer}
                  disabled={countdownDisabled}
                  refreshTime={refreshTime}
                  countdown={countdown}
                  loading={loading}
                  title='Concluir investimento'
                  onPress={onAdvance}
                  onRefreshNeeded={() => toggleNeedRefresh(true)}
                />
              </View>
              <InfoModal onClose={this.handleModalVisibility} info={infoModal} visible={infoModalVisible} />

            </React.Fragment>
          )
        }
      </TimerManager>
    )
  }
}
