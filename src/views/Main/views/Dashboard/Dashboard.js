import React from 'react'
import { StyleSheet, Switch, ScrollView, Platform, TouchableWithoutFeedback } from 'react-native'
import { View, Typography, Colors, Spacing, ActivityIndicator, InfoModal, FixedHeader, HeaderButton, Icon, InfoIcon } from '~/newUI'
import { MultipleCardInfo } from './components'
import { InfoChartArea, RecurrenceArea, ScoreArea, StatusArea, SubHeader, TopInfoArea } from './views'
import descriptionTexts from '~/constants/dashboardDescriptions'
import InformativeModal from '~/components/InformativeModal'

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  container: {
    margin: Spacing.s5
  },
  loading: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'white'
  },
  topContentContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  spaceBetweenComponentes: {
    marginVertical: Spacing.s5
  },
  switchSize: {
    transform: Platform.OS === 'ios' ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [{ scaleX: 1 }, { scaleY: 1 }]
  }
})

export default class Dashboard extends React.PureComponent {
  state = {
    switchValue: !this.props.featureFlags.enableExpectedReturn,
    switcherValue: 'General',
    infoModalVisible: false,
    infoModal: {}
  }

  componentDidMount = () => {
    const { fetchDashboard, update, featureFlags } = this.props
    const { enableExpectedReturn } = featureFlags
    const dashboardActiveConfig = enableExpectedReturn ? 'Esperado' : 'Máximo'
    update({ dashboardActiveConfig })
    fetchDashboard()
  }

  handleModalVisibility = (infoModal) => {
    const { infoModalVisible } = this.state
    this.setState({ infoModalVisible: !infoModalVisible, infoModal: infoModal || {} })
  }

  changeDashboardActiveConfig = () => {
    const { switchValue } = this.state
    const activeConfig = !switchValue ? 'Máximo' : 'Esperado'
    this.setState({ switchValue: !switchValue })
    this.props.update({ dashboardActiveConfig: activeConfig })
  }

  onCloseModal = () => {
    const { clearError, navigation } = this.props
    clearError()
    navigation.navigate('Investments')
  }

  showErrorModal = () => {
    return (
      <View style={styles.loading}>
        <InformativeModal
          isVisible title={'Erro de conexão!'}
          description={'Houve um problema ao tentar obter os dados. Verifique sua conexão com a internet e tente novamente'}
          buttonText={'Tente Novamente'}
          buttonPress={() => this.props.fetchDashboard()}
          onRequestClose={this.onCloseModal}
        />
      </View>
    )
  }

  render () {
    const { navigation, topAreaInfo, infoChartAreaValues,
      recoveredInfo, defaultsInfo, scoreAreaInfo, statusAreaInfo, recurrenceAreaInfo,
      walletBalance, fetchLineChartData, fetchLateLoans, dashboardActiveConfig, loading, error, featureFlags, update } = this.props
    const { enableExpectedReturn } = featureFlags
    const { switchValue, infoModalVisible, infoModal } = this.state
    const scoreStyle = enableExpectedReturn ? styles.spaceBetweenComponentes : { marginBottom: Spacing.s5 }
    return (
      <React.Fragment>

        {loading
          ? (
            <View style={styles.loading}>
              <ActivityIndicator size={48} color={Colors.primary} />
            </View>
          )
          : (
            error
              ? this.showErrorModal()
              : null
          )
        }

        <FixedHeader
          leftComponent={(
            <HeaderButton onPress={() => navigation.goBack()}>
              <Icon type='svg' name='ChevronLeft' color={Colors.white} />
            </HeaderButton>
          )}
          centerTitle={'Dashboard'}
        />

        <SubHeader walletBalance={walletBalance} onPress={() => navigation.navigate('Wallet')} />

        <ScrollView contentContainerStyle={styles.wrapper}>

          <View style={styles.container}>

            <View style={styles.switchContainer}>

              <TouchableWithoutFeedback onPress={() => this.handleModalVisibility({ title: 'Dashboard', text: descriptionTexts.dashboard })}>
                <View style={styles.topContentContainer}>
                  <Typography.T1 color={Colors.mutualBlue}>Dashboard</Typography.T1>
                  <View style={{ marginLeft: 5 }}>
                    <InfoIcon />
                  </View>
                </View>
              </TouchableWithoutFeedback>

              { enableExpectedReturn
                ? (
                  <View style={styles.topContentContainer}>
                    <Typography.T4 color={switchValue ? Colors.warmGray : Colors.mutualBlue} variant={'bold'}>Esperado</Typography.T4>
                    <Switch
                      style={styles.switchSize}
                      trackColor={{ true: Colors.marineBlue }}
                      onValueChange={() => this.changeDashboardActiveConfig()}
                      value={switchValue}
                    />
                    <Typography.T4 color={switchValue ? Colors.mutualBlue : Colors.warmGray} variant={'bold'}>Máximo</Typography.T4>
                  </View>
                )
                : null
              }

            </View>

            <TopInfoArea info={topAreaInfo} />

            <InfoChartArea
              outerStyle={styles.spaceBetweenComponentes}
              dashboardActiveConfig={dashboardActiveConfig}
              handleInfoPress={this.handleModalVisibility}
              info={infoChartAreaValues}
            />

            {/* Non-compliance card */}
            <MultipleCardInfo
              info={[
                { title: 'Inadimplência',
                  value: `R$ ${defaultsInfo.lateInvestments}`,
                  description: 'Em atraso (+90 dias)'
                },
                { title: 'Índice',
                  value: `${defaultsInfo.percentage}%`,
                  valueDescription: 'de Inadimplência',
                  description: `${defaultsInfo.amount} empréstimos`
                }]}
            />

            {/* Recovered card */}
            <MultipleCardInfo
              outerStyle={styles.spaceBetweenComponentes}
              info={[
                { title: 'Recuperado',
                  value: `R$ ${recoveredInfo.recovered}`,
                  description: 'Valores em cobrança',
                  info: recoveredInfo.descriptions.recovered,
                  onPressInfo: this.handleModalVisibility
                },
                { title: 'Índice',
                  value: `${recoveredInfo.percentage}%`,
                  valueDescription: 'de Recuperação',
                  description: `${recoveredInfo.amount} empréstimos`
                }]}
            />

            { enableExpectedReturn
              ? (
                <RecurrenceArea
                  dashboardActiveConfig={dashboardActiveConfig}
                  handleInfoPress={this.handleModalVisibility}
                  info={recurrenceAreaInfo}
                  fetchLineChartData={fetchLineChartData}
                />
              )
              : null
            }

            <StatusArea
              outerStyle={styles.spaceBetweenComponentes}
              info={statusAreaInfo}
              fetchLateLoans={fetchLateLoans}
              update={update}
            />

            <ScoreArea outerStyle={scoreStyle} info={scoreAreaInfo} />

          </View>

        </ScrollView>

        <InfoModal onClose={this.handleModalVisibility} info={infoModal} visible={infoModalVisible} />

      </React.Fragment>
    )
  }
}
