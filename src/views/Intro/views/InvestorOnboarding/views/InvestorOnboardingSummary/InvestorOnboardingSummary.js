import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, BaseHeader, HeaderButton, Colors, Typography, Spacing, Button, Message, InfoModal } from '~/newUI'
import InvestmentSummary from '~/components/InvestmentSummary'
import ReturnChart from '~/components/ReturnChart'
import { BackArrow } from '~/newUI/Icons'
import ScoreChart from '~/components/ScoreChart/ScoreChart'
import { resetNavigationTo } from '~/services/navigation'

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
  info: {
    marginVertical: Spacing.s6
  }
})

export default class InvestorOnboardingSummary extends React.PureComponent {
  state = {
    loading: false,
    infoModalVisible: false,
    infoModal: {}
  }

  handleModalVisibility = (infoModal) => {
    const { infoModalVisible } = this.state
    this.setState({ infoModalVisible: !infoModalVisible, infoModal: infoModal || {} })
  }

  onContinue = () => {
    const rootNavigation = this.props.screenProps.screenProps.navigation
    resetNavigationTo(
      rootNavigation,
      { routePath: ['Main'] }
    )
  }

  getScoreData = (distribute) => {
    const scoreData = {}
    Object.keys(distribute).forEach(key => {
      scoreData[key] = { total: distribute[key].numberOfQuotas, totalPercent: distribute[key].idealPercentage }
    })
    return scoreData
  }

  render () {
    const { infoModal, infoModalVisible } = this.state
    const { data } = this.props.navigation.state.params
    const { distribute, financedAmountCents, investorProfitContract, investorProfitExpected } = data
    const scoreData = this.getScoreData(distribute)
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
          <View style={styles.fixedHeader} />
          <BaseHeader
            style={{ backgroundColor: Colors.mutualBlue }}
            statusBarProps={{ barStyle: 'light-content', backgroundColor: Colors.mutualBlue }}
            leftComponent={(
              <HeaderButton onPress={() => this.props.navigation.goBack()}>
                <BackArrow color={Colors.white} />
              </HeaderButton>
            )}
          />
          <View paddedHorizontally>
            <Typography.H3 color={Colors.white} style={styles.title} align='center'>Carteira recomendada</Typography.H3>
            <Typography.T2 color={Colors.white} style={styles.subTitle} align='center'>Simulamos uma carteira de investimentos com base no seu perfil, onde cada tomador foi selecionado cuidadosamente:</Typography.T2>
          </View>
          <View paddedHorizontally>
            <InvestmentSummary investment={financedAmountCents / 100} profit={investorProfitExpected.amountCents / 100} profitPercentage={investorProfitExpected.percent / 100} />
            <ReturnChart hired={investorProfitContract.percent / 100} expected={investorProfitExpected.percent / 100} onPressInfo={this.handleModalVisibility} />
            <ScoreChart hideValue chartMargin={Spacing.s6} scores={scoreData} />
          </View>
          <View paddedHorizontally>
            <Message variant='info' style={styles.info}>
              <Typography.T3>
                A sua carteira foi cuidadosamente selecionada de acordo com os seus objetivos de investimento, portanto aconselhamos que você use estas indicações na hora de investir.
              </Typography.T3>
            </Message>
          </View>
        </ScrollView>
        <View paddedHorizontally style={styles.finishContainer}>
          <Button
            onPress={() => this.onContinue()}
            title={'Continuar'}
          />
        </View>
        <InfoModal onClose={this.handleModalVisibility} info={infoModal} visible={infoModalVisible} />
      </React.Fragment>
    )
  }
}
