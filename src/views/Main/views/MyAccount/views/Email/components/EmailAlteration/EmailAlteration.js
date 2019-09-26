import React from 'react'
import { Alert } from 'react-native'
import Questions from '~/components/Questionnaire/Questions'
import { getEmailQuestions } from './components/EmailQuestions'

export default class EmailAlteration extends React.PureComponent {
  state = {
    currentScreen: 0,
    loading: false,
    emailQuestions: getEmailQuestions(this.props.email)
  }

  onFinish = async (questionnaire) => {
    const email = questionnaire.emailChange.answer

    this.setState({ loading: true })

    await this.props.updateEmail({ email })

    this.setState({ loading: false })

    if (this.props.error) {
      Alert.alert('Error', this.props.error)
      return
    }

    Alert.alert(
      'Seus dados foram atualizados com sucesso',
      '',
      [
        {
          text: 'OK',
          onPress: () => this.props.onClose()
        }
      ],
      { cancelable: true, onDismiss: () => this.props.onClose() }
    )
  }

  onExit = () => {
    this.props.onClose()
  }

  render () {
    const { loading, emailQuestions } = this.state
    return (
      <Questions
        loading={loading}
        questions={emailQuestions}
        onExit={this.onExit}
        onFinish={this.onFinish}
      />
    )
  }
}
