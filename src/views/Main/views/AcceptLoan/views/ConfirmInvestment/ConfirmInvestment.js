import React from 'react'
import { Alert, BackHandler } from 'react-native'
import * as R from 'ramda'
import Sentry from 'sentry-expo'
import navigateBack from '~/utils/navigateBack'
import { track } from '~/services/analytics'
<<<<<<< HEAD
import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'
import { Password, Text, Colors } from '~/newUI'
=======
import Password from '~/components/Password'
import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'
import { Text, Colors } from '~/newUI'
>>>>>>> def9ecca... change component for newUI ConfirmInvestiment

export default class ConfirmInvestment extends React.PureComponent {
  state = {
    loading: false
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const { hasInvestment, screenProps } = this.props
    const { navigation } = screenProps
    if (!hasInvestment) {
      navigation.navigate('Investment')
      return
    }
    navigateBack(navigation)
  }

  goBackToInvestmentsAndUpdate = () => {
    const { navigation } = this.props.screenProps
    this.props.startPagination()
    navigation.navigate('Investments')
  }

  submit = async () => {
    const { navigation } = this.props.screenProps
    const { verifyPassword, confirmInvestment, loan, changeFlagStatus } = this.props
    const { password } = this.state
    const quotas = navigation.getParam('quotas')

    this.setState({ loading: true })

    try {
      const confirmPassword = await verifyPassword(password)

      if (!confirmPassword) {
        this.setState({ loading: false })
        Alert.alert('Investimento', 'A senha não confere.')
        return
      }
    } catch (err) {
      Sentry.captureException(err)
      Alert.alert('Investimento', 'Não foi possível verificar sua senha, tente novamente mais tarde')
      this.setState({ loading: false })
      return
    }

    try {
      await confirmInvestment(loan._id, quotas)
      this.setState({ loading: false })

      track('MakeInvestment', {
        value: loan.initialSimulation.financedAmountCents / 100,
        amount: loan.requestedAmountCents / 100,
        financedAmount: loan.initialSimulation.financedAmountCents / 100,
        totalAmount: loan.initialSimulation.totalAmountCents / 100,
        payDay: loan.bestPayDay,
        numberOfInstallments: loan.numberOfInstallments,
        investorProfitTotalPercent: loan.initialSimulation.investorProfitTotalPercent
      })

      Alert.alert('Investimento realizado', 'Agora precisamos de até 3 dias (úteis) para concluir este processo', [{
        text: 'Ok!',
        onPress: async () => {
          changeFlagStatus('hasInvestment', true)
          navigation.navigate('MyInvestments')
        }
      }], { cancelable: false })
    } catch (err) {
      this.setState({ loading: false })

      Sentry.captureException(err)
      const responseErrorCode = R.path(['response', 'data', 'code'], err)
      const responseStatus = R.path(['response', 'status'], err)
      if (responseStatus === 400 && responseErrorCode === 'LOAN_NOT_PUBLISHED') {
        Alert.alert(
          'Empréstimo indisponível',
          'Alguém acabou de investir nesse empréstimo, ele se encontra indisponível'
        )
        return
      }
      if (responseErrorCode === 'LOAN_NOT_AVAILABLE_TO_THIS_QUOTAS_QTY') {
        Alert.alert(
          'Cotas indisponíveis',
          'Alguém acabou de investir nas cotas desse empréstimo, eles estão indisponíveis',
          [{
            text: 'Ok',
            onPress: () => this.goBackToInvestmentsAndUpdate()
          }],
          { cancelable: false }
        )
        return
      }
      Alert.alert('Erro', 'Erro ao realizar o investimento, tente novamente')
    }
  }

  render () {
    const { navigation } = this.props
    const { loading, password } = this.state

    return (
      <React.Fragment>
        <ViewWithHeaderAndButton backgroundType='header' onPressBack={() => navigation.goBack(null)}>
          <ViewWithHeaderAndButton.Header>
            <Text.T2 color={Colors.white} align='center'>Para sua segurança</Text.T2>
            <Text.H3 color={Colors.white} align='center'>Digite sua senha para confirmar o pedido</Text.H3>
          </ViewWithHeaderAndButton.Header>
          <ViewWithHeaderAndButton.Content>
            <Password
<<<<<<< HEAD
              onChange={password => this.setState({ password })}
              value={password}
=======
              title='Insira sua senha'
              description='Por medida de segurança'
              submitText='Realizar investimento'
              submit={this.submit}
              loading={loading}
>>>>>>> def9ecca... change component for newUI ConfirmInvestiment
            />
          </ViewWithHeaderAndButton.Content>
          <ViewWithHeaderAndButton.Button
            disabled={!password || password.length !== 6}
            loading={loading}
            onPress={this.onConfirm}
<<<<<<< HEAD
            title='Realizar investimento'
=======
            title='Solicitar empréstimo'
>>>>>>> def9ecca... change component for newUI ConfirmInvestiment
          />
        </ViewWithHeaderAndButton>
      </React.Fragment>
    )
  }
}
