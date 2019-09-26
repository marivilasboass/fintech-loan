import React from 'react'
import { StyleSheet } from 'react-native'
import Sentry from 'sentry-expo'

import { Text, Colors, FastSelector, Typography } from '~/newUI'
import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'
import Summary from '~/components/Summary'
import limits from '~/constants/limits'
import * as analytics from '~/services/analytics'

import AmountInput from './components/AmountInput'
import AlertManager from './components/AlertManager'

const styles = StyleSheet.create({
  cardStyle: {
    paddingVertical: 22
  },

  question: {
    marginBottom: 20
  },

  box: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.solitude,
    backgroundColor: Colors.white
  }
})

const installmentOptions = limits.installments.map(installment => ({
  installment,
  installmentLabel: `${installment}x`
}))

const bestPayDayOptions = [
  { bestPayDay: 5 },
  { bestPayDay: 10 },
  { bestPayDay: 15 },
  { bestPayDay: 20 },
  { bestPayDay: 25 }
]

export default class BasicInformation extends React.PureComponent {
  state = {
    validAmount: this.props.requestedAmountCents >= 50000,
    approvedAlertIsVisible: false
  }

  onBlurAmountField = () => {
    if (this.amountInput && this.amountInput.isFocused()) {
      this.amountInput.blur()
    }

    if (this.props.requestedAmountCents >= 50000) {
      this.setState({ validAmount: true })
    } else {
      this.setState({ validAmount: false })
    }
  }

  onSimulate = async () => {
    const { update, checkIfHasActiveLoan, simulateLoan, navigation } = this.props
    this.setState({ alertState: 'loading' })

    try {
      const hasActiveLoan = await checkIfHasActiveLoan()

      if (hasActiveLoan) {
        this.setState({ alertState: 'hasActiveLoan' })
        return
      }

      const simulation = await simulateLoan()

      if (simulation.result === 'approved') {
        analytics.track('UserHasLimit')
        this.setState({ alertState: null })
        await update({ loan: simulation.simulations[0] })
        navigation.navigate('ConfirmLoan')
        return
      }

      if (simulation.result === 'optionsAvailable') {
        analytics.track('UserHasLimit')
        this.setState({ alertState: 'hasRecommendations' })
        return
      }

      if (simulation.result === 'denied') {
        analytics.track('UserHasNoLimit')
        this.setState({ alertState: 'refused' })
        return
      }
    } catch (err) {
      Sentry.captureException(err)

      this.setState({ alertState: 'error' })
    }
  }

  render () {
    const { screenProps, navigation, requestedAmountCents, numberOfInstallments, bestPayDay, update } = this.props

    const { validAmount, alertState } = this.state
    const disabledButton = requestedAmountCents && validAmount && numberOfInstallments && bestPayDay
    return (
      <React.Fragment>
        <AlertManager
          alertState={alertState}
          parentNavigation={screenProps.navigation}
          navigation={navigation}
          onClose={() => this.setState({ alertState: null })}
        />

        <ViewWithHeaderAndButton backgroundType='fixed' hideButtonWhenKeyboardOpen onPressBack={() => screenProps.navigation.goBack(null)}>
          <ViewWithHeaderAndButton.Header>
            <Text.H3 color={Colors.white} align='center'>Solicite seu empréstimo</Text.H3>
          </ViewWithHeaderAndButton.Header>

          <ViewWithHeaderAndButton.Content style={styles.box}>
            <Summary>
              <Summary.Card style={styles.cardStyle}>
                <Typography.T1 variant='heavy' align='center'>De qual valor você precisa?</Typography.T1>
                <AmountInput
                  onChange={(amount) => { update({ requestedAmountCents: Math.round(amount * 100) }) }}
                  amount={requestedAmountCents / 100}
                  ref={amountInput => { this.amountInput = amountInput }}
                  min={500}
                  onBlur={this.onBlurAmountField}
                  validAmount={this.state.validAmount}
                />
              </Summary.Card>

              <Summary.Card style={styles.cardStyle}>
                <Typography.T1 variant='heavy' align='center' style={styles.question}>Em quantas vezes deseja parcelar?</Typography.T1>
                <FastSelector
                  options={installmentOptions}
                  selectedOption={numberOfInstallments}
                  valueKey='installment'
                  labelKey='installmentLabel'
                  onSelect={option => update({ numberOfInstallments: option.installment })}
                />
              </Summary.Card>

              <Summary.Card style={styles.cardStyle}>
                <Typography.T1 variant='heavy' align='center' style={styles.question}>Qual é o melhor dia para vencimento?</Typography.T1>
                <FastSelector
                  options={bestPayDayOptions}
                  selectedOption={bestPayDay}
                  valueKey='bestPayDay'
                  labelKey='bestPayDay'
                  onSelect={({ bestPayDay }) => update({ bestPayDay })}
                />
              </Summary.Card>
            </Summary>
          </ViewWithHeaderAndButton.Content>

          <ViewWithHeaderAndButton.Button
            disabled={!disabledButton}
            iconRight={{ name: 'arrow-forward', size: 20 }}
            title='Próximo'
            onPress={this.onSimulate}
          />
        </ViewWithHeaderAndButton>
      </React.Fragment>
    )
  }
}
