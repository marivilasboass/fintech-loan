import React from 'react'
import { StyleSheet, BackHandler, Alert } from 'react-native'
import Sentry from 'sentry-expo'

import { steps, terms } from '../../constants/steps'
import { View, Typography, Colors, Spacing } from '~/newUI'
import ConfirmPasswordBottomSheet from '~/components/ConfirmPasswordBottomSheet'
import format from '~/services/format'
import InformativeModal from '~/components/InformativeModal'

const styles = StyleSheet.create({
  stepsCount: {
    paddingRight: Spacing.s6
  }
})

export default class Wizard extends React.PureComponent {
  state = {
    step: 0,
    active: false,
    loading: false,
    initialized: false,
    finished: false,
    countdownDisabled: false,
    steps,
    password: ''
  }

  goBack = () => this.setState(({ step }) => ({ step: step - 1 }))

  onAdvance = () => {
    const { step, steps } = this.state
    if (step !== steps.length - 1) {
      this.setState(({ step }) => ({ step: step + 1 }))
      return
    }
    this.toggleModal()
  }

  navigateBack = () => {
    if (this.state.step === 0) {
      this.props.navigation.goBack()
    }
    if (this.state.step > 0) {
      this.goBack()
    }
    return true
  }

  componentDidMount () {
    this.props.clearFilter()
    if (!this.props.acceptedInvestorTermsAt) {
      this.setState({ steps: [...this.state.steps, terms] })
    }
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack)
    this.setState({ initialized: true })
  }

  componentWillUnmount () {
    this.props.clear()
    this.props.clearFilter()
    BackHandler.removeEventListener('hardwareBackPress', this.navigateBack)
  }

  onChangePassword = (password) => this.setState({ password })

  toggleModal = () => this.setState({ active: !this.state.active })

  closeModal = () => this.setState({
    active: false,
    password: ''
  })

  onConfirmPassword = async () => {
    const { password } = this.state
    const { verifyPassword, confirmReservedLoans } = this.props
    try {
      this.setState({ loading: true })
      const confirmPassword = await verifyPassword(password)
      if (!confirmPassword) {
        this.setState({ loading: false })
        Alert.alert('Ops!', 'A senha não confere.')
        return
      }
      this.setState({ countdownDisabled: true })
      await confirmReservedLoans()
      this.setState({ active: false, loading: false, finished: true })
    } catch (err) {
      this.setState({ loading: false, countdownDisabled: false })
      Sentry.captureException(err)
      Alert.alert('Ops!', 'Não foi possível concluir o investimento, tente novamente mais tarde.')
    }
  }

  enableCountdown = () => this.setState({ countdownDisabled: false })

  navigateToInvestments = () => this.props.navigation.navigate('MyInvestments')

  renderRightComponent = () => {
    const { step, steps } = this.state
    const { blueHeader } = steps[step]
    return (
      <View>
        <Typography.T2
          style={styles.stepsCount}
          color={blueHeader ? Colors.white : Colors.warmGray}
        >
          Etapa {step + 1} de {steps.length}
        </Typography.T2>
      </View>
    )
  }

  render () {
    const { navigation, simulationResults } = this.props
    const { step, password, active, loading, initialized, steps, finished, countdownDisabled } = this.state

    const { component: StepView, ...props } = steps[step]
    const { totalToInvestmentCents } = simulationResults

    if (!initialized) {
      return null
    }

    return (
      <React.Fragment>
        <StepView
          rightComponent={this.renderRightComponent}
          onAdvance={this.onAdvance}
          navigation={navigation}
          onBack={this.navigateBack}
          toggleConfirmPasswordModal={this.toggleModal}
          countdownDisabled={countdownDisabled}
          enableCountdown={this.enableCountdown}
          {...props}
        />
        <InformativeModal
          isVisible={finished}
          title={`Parabéns ${this.props.nickname}`}
          description='Investimento concluído. Agora estamos alocando os tomadores selecionados em seu novo investimento.'
          success
          onTimerFinish={this.navigateToInvestments}
          timed
        />
        <ConfirmPasswordBottomSheet
          title='Para sua segurança'
          subtitle={`Digite a sua senha para concluir o investimento de ${format('currency', totalToInvestmentCents)}`}
          active={active}
          value={password}
          loading={loading}
          btnTitle='Confirmar novo investimento'
          onChange={this.onChangePassword}
          onAdvance={this.onConfirmPassword}
          onClose={this.closeModal}
        />
      </React.Fragment>
    )
  }
}
