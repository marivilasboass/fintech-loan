import React from 'react'
import Tutorial from '~/components/Tutorial'
import InvestorTutorial1 from './images/InvestorTutorial1'
import { ProfileFingerprintIcon } from '~/newUI'
import InvestorTutorial3 from './images/InvestorTutorial3'
import { api } from '~/services/api'
import { Alert } from 'react-native'
import Sentry from 'sentry-expo'
import * as R from 'ramda'

const pages = [{
  instructionTitle: 'Uhuuul!',
  description: 'Sua conta foi criada com sucesso! Agora precisamos descobrir o seu perfil de investidor.',
  image: <InvestorTutorial1 />
}, {
  instructionTitle: 'Seu Perfil',
  description: 'Nos contando mais sobre os seus objetivos de investimento, nós estaremos aptos a encontrar as opções ideais para você.',
  image: <ProfileFingerprintIcon />
}, {
  instructionTitle: 'Recomendações',
  description: 'Tente ser o mais fiel possível aos seus objetivos, desta forma a sua experiência será a melhor possível .',
  image: <InvestorTutorial3 />
}]

export default class InvestmentTutorial extends React.PureComponent {
  state = {
    loading: false
  }

  fetchQuestions = async () => {
    const { navigation } = this.props
    try {
      this.setState({ loading: true })
      const { data: result } = await api.post('account/user/getQuestions')
      const { data: questions } = result
      const parsedQuestions = R.map((question) => ({ ...question, answer: question.defaultAnswer }), questions)
      navigation.navigate('InvestorOnboardingQuestions', { parsedQuestions })
      this.setState({ loading: false })
    } catch (err) {
      Alert.alert('Oops', 'Houve um problema com o tutorial, por favor reinicie o aplicativo ou contate a nossa central de atendimento')
      this.setState({ loading: false })
      Sentry.captureException(err)
    }
  }

  render () {
    const { loading } = this.state
    return (
      <Tutorial
        buttonText='Vamos iniciar!'
        onPressButton={() => this.fetchQuestions()}
        pages={pages}
        loading={loading}
      />
    )
  }
}
