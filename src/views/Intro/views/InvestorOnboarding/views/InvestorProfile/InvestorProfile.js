import React from 'react'
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native'
import { api } from '~/services/api'
import Sentry from 'sentry-expo'
import { View, Typography, Spacing, Message, Button, Colors, BaseHeader, HeaderButton, ProfileFingerprintIcon } from '~/newUI'
import { BackArrow } from '~/newUI/Icons'
import RadioCircle from '~/newUI/RadioGroup/components/RadioCircle'

const styles = StyleSheet.create({
  titleText: {
    marginBottom: Spacing.s3
  },
  message: {
    marginVertical: Spacing.s6
  },
  wrapper: {
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  messageFooter: {
    paddingTop: Spacing.s5,
    paddingBottom: Spacing.s2,
    borderTopWidth: 1,
    borderTopColor: Colors.black30,
    flexDirection: 'row',
    marginTop: Spacing.s6
  },
  messageText: {
    marginLeft: 10,
    flex: 1
  }
})

export default class InvestorProfile extends React.PureComponent {
  state = {
    riskAccepted: false,
    loading: false
  }

  getProfileInfo = () => {
    const { userInvestorProfile } = this.props.screenProps
    switch (userInvestorProfile) {
    case 'lowRisk':
      return {
        title: 'Perfil Conservador',
        description: 'A carteira conservadora se ajusta ao investidor que possui pouca ou nenhuma experiência com produtos financeiros arriscados, ou que prefere investir apenas em renda fixa, tesouro, etc.',
        message: 'A Mutual é uma empresa de investimento de alto risco, não sendo indicada para investidores que possuem perfil Conservador.'
      }
    case 'moderateRisk':
      return {
        title: 'Perfil Moderado',
        description: 'Investidor que aceita correr riscos, pois procura rendimentos acima da média, mas atualmente possui baixa participação em produtos arriscados. Costuma alocar a maior parte da sua renda em produtos de renda fixa e similares.',
        message: 'A Mutual é uma empresa de empréstimos de alto risco. Ao aceitar este tipo de investimento você assume o risco.'
      }
    case 'highRisk':
      return {
        title: 'Perfil Arrojado',
        description: 'Experiência em outros investimentos de risco (ações, derivados e câmbio) e que compreende o benefício da diversificação. Aceitando correr riscos, em busca de grandes ganhos.',
        message: 'A Mutual é uma empresa de empréstimos de alto risco. Ao aceitar este tipo de investimento você assume o risco.'
      }
    }
  }

  showMessage = (message) => {
    const { riskAccepted } = this.state
    const { userInvestorProfile } = this.props.screenProps
    if (userInvestorProfile === 'lowRisk') {
      const messageFooter = (
        <TouchableWithoutFeedback onPress={() => this.setState({ riskAccepted: !riskAccepted })}>
          <View style={styles.messageFooter}>
            <RadioCircle selected={riskAccepted} />
            <Typography.T1 style={styles.messageText}>Estou ciente e assumo os riscos</Typography.T1>
          </View>
        </TouchableWithoutFeedback>
      )
      return (
        <Message variant='warning' style={styles.message} innerContainer={messageFooter}>
          <Typography.T3>
            {message}
          </Typography.T3>
        </Message>
      )
    }
    return (
      <Message variant='info' style={styles.message}>
        <Typography.T3>
          {message}
        </Typography.T3>
      </Message>
    )
  }

  onContinue = async () => {
    const { navigation } = this.props
    try {
      this.setState({ loading: true })
      const { data: result } = await api.post('loan/user/portfolio')
      const { data } = result
      navigation.navigate('InvestorOnboardingSummary', { data })
      this.setState({ loading: false })
    } catch (err) {
      Alert.alert('Oops', 'Houve um problema com o tutorial, por favor reinicie o aplicativo ou contate a nossa central de atendimento')
      this.setState({ loading: false })
      Sentry.captureException(err)
    }
  }

  render () {
    const { riskAccepted, loading } = this.state
    const { title, description, message } = this.getProfileInfo()
    const { userInvestorProfile } = this.props.screenProps
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.wrapper}>
          <BaseHeader
            style={{ backgroundColor: Colors.white }}
            statusBarProps={{ barStyle: 'light-content' }}
            leftComponent={(
              <HeaderButton onPress={() => this.props.navigation.goBack()}>
                <BackArrow color={Colors.secondary} />
              </HeaderButton>
            )}
          />
          <View paddedHorizontally style={styles.container}>
            <View>
              <Typography.H3 align='center' style={styles.titleText}>{title}</Typography.H3>
              <Typography.T2 align='center'>
                {description}
              </Typography.T2>
            </View>
            <View style={{ alignItems: 'center' }}>
              <ProfileFingerprintIcon small />
            </View>
            {this.showMessage(message)}
            <Button
              title='Estou ciente, desejo continuar'
              onPress={() => this.onContinue()}
              style={{ marginBottom: Spacing.s6 }}
              disabled={userInvestorProfile === 'lowRisk' && !riskAccepted}
              loading={loading}
            />
          </View>

        </ScrollView>
      </React.Fragment>
    )
  }
}
