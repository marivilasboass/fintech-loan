import * as R from 'ramda'
import React from 'react'
import { Alert, StyleSheet } from 'react-native'
import Sentry from 'sentry-expo'
import { ActivityIndicator, Colors, View } from '~/newUI'
import { api } from '~/services/api'
import Questions from '~/components/Questionnaire/Questions'

const styles = StyleSheet.create({
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
  }
})

export default class LoanQuestionnaire extends React.PureComponent {
  state = {
    questions: null,
    loading: true
  }

  componentDidMount = () => {
    this.fetchQuestions()
  }

  fetchQuestions = async () => {
    try {
      const { data: result } = await api.post('credit-score/user/getQuestions')
      const { data: questions } = result
      const parsedQuestions = R.map((question) => ({ ...question, answer: question.defaultAnswer }), questions)
      this.setState({ questions: parsedQuestions, loading: false })
    } catch (err) {
      Alert.alert('Oops', 'Houve um problema durante a simulação de empréstimo, favor entrar em contato com nosso setor de atendimento')
      Sentry.captureException(err)
    }
  }

  onFinish = async (questionnaire) => {
    const { update, navigation } = this.props
    const requestedAmountCents = questionnaire.requestedAmount.answer
    const motiveValue = questionnaire.motive.answer.value
    const motive = questionnaire.motive.choices.find(({ value }) => value === motiveValue).label

    update({ initialRequestedAmountCents: requestedAmountCents, requestedAmountCents, motive })

    const answers = Object.values(questionnaire).map(R.pick(['code', 'answer']))

    try {
      await api.post('credit-score/user/answerQuestions', { answers })

      navigation.navigate('BasicInformation')
    } catch (err) {
      Alert.alert('Oops', 'Houve um problema durante a simulação de empréstimo, favor entrar em contato com nosso setor de atendimento')
      Sentry.captureException(err)
    }
  }

  onExit = () => {
    this.props.screenProps.navigation.goBack(null)
  }

  render () {
    const { questions, loading } = this.state
    return (
      <React.Fragment>
        {loading
          ? (
            <View style={styles.loading}>
              <ActivityIndicator size={48} color={Colors.primary} />
            </View>
          )
          : (
            <Questions
              questions={questions}
              onExit={this.onExit}
              onFinish={this.onFinish}
            />
          )
        }
      </React.Fragment>

    )
  }
}
