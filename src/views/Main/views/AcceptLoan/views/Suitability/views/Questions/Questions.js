import React from 'react'
import Questions from '~/components/Questionnaire/Questions'

export default class SuitabilityQuestions extends React.PureComponent {
  onExit = () => {
    const { screenProps } = this.props.screenProps
    const { previousRoute, loanId } = screenProps.navigation.state.params
    screenProps.navigation.navigate(previousRoute, loanId)
  }

  onFinish = (questionnaire) => {
    this.props.fetchAccount()
    this.props.saveInvestorOnboardingAnswers(questionnaire)
    this.props.navigation.navigate('Profile')
  }

  render () {
    const { navigation } = this.props.screenProps
    const { questions } = navigation.state.params
    return (
      <Questions
        questions={questions}
        onExit={this.onExit}
        onFinish={this.onFinish}
        onContinueAddition={this.props.onContinueAddition}
      />
    )
  }
}
