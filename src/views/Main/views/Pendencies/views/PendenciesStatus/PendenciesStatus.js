import React from 'react'
import Sentry from 'sentry-expo'
import { StyleSheet, RefreshControl, AppState } from 'react-native'

import { Icon, Spacing, Colors } from '~/newUI'
import navigateBack from '~/utils/navigateBack'
import accountStatuses from '~/constants/accountStatuses'
import { getIdentificationStatus, getAddressStatus, getGeneralStatus, isResolvedStatus } from '~/services/pendencyStatus'
import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'
import { track } from '~/services/analytics'
import { isAnalysisStatus } from '~/services/accountStatuses'

import PendencyCard from './components/PendencyCard'
import StatusHeader from './components/StatusHeader'
import SupportAlert from './components/SupportAlert'
import AnalysisModal from './components/AnalysisModal'

const styles = StyleSheet.create({
  pendencyCard: {
    marginBottom: Spacing.s6
  }
})

export default class PendenciesStatus extends React.Component {
  constructor (props) {
    super(props)

    const generalStatus = getGeneralStatus(props.pendencies)
    const isAnalysisModalVisible = (
      (isAnalysisStatus(props.status)) ||
      (isResolvedStatus(generalStatus) && props.pressedFakeConfirmPendenciesButton)
    )

    this.state = {
      loading: false,
      isSupportAlertVisible: false,
      isAnalysisModalVisible,
      appState: AppState.currentState,
      inputValue: ''
    }
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.fetchAccount()
    }

    this.setState({ appState: nextAppState })
  }

  componentDidMount = () => {
    const { fetchAccount, status } = this.props
    if (status === accountStatuses.approved) {
      this.handleApproval()
      return
    }

    fetchAccount()
    this.startPolling()
  }

  onPullToRefresh = async () => {
    this.setState({ loading: true })

    await this.props.fetchAccount()

    this.setState({ loading: false })
  }

  componentWillUnmount = () => {
    this._pollingInterval && clearInterval(this._pollingInterval)
  }

  componentDidUpdate = (prevProps) => {
    const { status, pendencies } = this.props

    this.handleStatusChange(status, pendencies, prevProps.status, prevProps.pendencies)
  }

  handleStatusChange = (status, pendencies, prevStatus, prevPendencies) => {
    if (prevStatus !== status && status === accountStatuses.approved) {
      this.handleApproval()
      return
    }

    if (isAnalysisStatus(prevStatus) && status === accountStatuses.pendingData) {
      this.handleRejection()
      return
    }

    const generalStatus = getGeneralStatus(pendencies)
    const prevGeneralStatus = getGeneralStatus(prevPendencies)

    if (isResolvedStatus(prevGeneralStatus) && generalStatus === 'rejected') {
      this.handleRejection()
    }
  }

  handleApproval = () => {
    const { userType, screenProps, hasActiveLoan } = this.props

    if (userType === 'borrower' && !hasActiveLoan) {
      screenProps.navigation.navigate('RequestLoan')
      return
    }

    if (userType === 'borrower') {
      screenProps.navigation.navigate('MyLoans')
      return
    }

    screenProps.navigation.navigate('Investments')
  }

  handleRejection = () => {
    this.setState({ isAnalysisModalVisible: false })
    this.props.update({ pressedFakeConfirmPendenciesButton: false })
  }

  onConfirm = () => {
    this.setState({ isAnalysisModalVisible: true })
    this.props.update({ pressedFakeConfirmPendenciesButton: true })
  }

  startPolling = () => {
    this._pollingInterval = setInterval(() => {
      this.props.fetchAccount()
    }, 30 * 1000)
  }

  hideAlert = () => this.setState({ isSupportAlertVisible: false })

  showAlert = () => this.setState({ isSupportAlertVisible: true })

  sendSupport = async () => {
    this.setState({ sendSupportStatus: 'loading' })
    track('PendenciesSendSupport')

    try {
      await this.props.sendSupport(this.state.inputValue)
    } catch (err) {
      this.setState({ sendSupportStatus: 'error' })
      Sentry.captureException(err)
      return
    }

    this.setState({ sendSupportStatus: 'success' })
  }

  render () {
    const { pendencies, navigation, userType, pressedFakeConfirmPendenciesButton, screenProps: { navigation: screenNavigation } } = this.props
    const { isSupportAlertVisible, inputValue, loading, isAnalysisModalVisible, sendSupportStatus } = this.state

    const identificationStatus = getIdentificationStatus(pendencies)
    const addressStatus = getAddressStatus(pendencies)
    const generalStatus = getGeneralStatus(pendencies)

    const isConfirmEnabled = isResolvedStatus(generalStatus) && !pressedFakeConfirmPendenciesButton

    return (
      <React.Fragment>
        <SupportAlert
          isVisible={isSupportAlertVisible}
          value={inputValue}
          status={sendSupportStatus}
          onChange={inputValue => this.setState({ inputValue })}
          onRetry={() => this.setState({ sendSupportStatus: null })}
          onCancel={this.hideAlert}
          onAccept={this.sendSupport}
        />

        <AnalysisModal
          isVisible={isAnalysisModalVisible}
          showButtons={userType === 'investor'}
          onExit={() => screenNavigation.navigate('Investments')}
        />

        <ViewWithHeaderAndButton
          backgroundType='header'
          onPressBack={() => navigateBack(screenNavigation)}
          rightIcon={<Icon type='svg' name='Help' />}
          onRightIconPress={this.showAlert}
          refreshControl={(
            <RefreshControl
              colors={[Colors.secondary]}
              refreshing={loading}
              onRefresh={this.onPullToRefresh}
            />
          )}
        >
          <ViewWithHeaderAndButton.Header>
            <StatusHeader status={generalStatus} userType={userType} />
          </ViewWithHeaderAndButton.Header>

          <ViewWithHeaderAndButton.Content>
            <PendencyCard
              style={styles.pendencyCard}
              title='Endereço'
              description='CEP, rua, número...'
              status={addressStatus}
              progress={0}
              onPress={() => navigation.navigate('Address')}
            />

            <PendencyCard
              style={styles.pendencyCard}
              title='Dados Pessoais'
              description='Estado civil, gênero...'
              status={pendencies.personalInformation.status}
              progress={0}
              onPress={() => navigation.navigate('Personal')}
            />

            <PendencyCard
              style={styles.pendencyCard}
              title='Dados bancários'
              description='Banco, agência, conta...'
              status={pendencies.bank.status}
              progress={0}
              onPress={() => navigation.navigate('Bank')}
            />

            <PendencyCard
              style={styles.pendencyCard}
              title='Identificação'
              description='Selfie e um documento'
              status={identificationStatus}
              progress={0}
              onPress={() => navigation.navigate('Identification')}
            />
          </ViewWithHeaderAndButton.Content>

          <ViewWithHeaderAndButton.Button
            title='Confirmar'
            onPress={this.onConfirm}
            disabled={!isConfirmEnabled}
          />
        </ViewWithHeaderAndButton>
      </React.Fragment>
    )
  }
}
