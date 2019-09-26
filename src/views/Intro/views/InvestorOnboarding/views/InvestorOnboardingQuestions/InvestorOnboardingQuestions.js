import React from 'react'
import Questions from '~/components/Questionnaire/Questions'

export default class InvestorOnboardingQuestions extends React.PureComponent {
  onExit = () => {
    this.props.navigation.goBack(null)
  }

  onFinish = (questionnaire) => {
    this.props.screenProps.saveInvestorOnboardingAnswers(questionnaire)
    this.props.navigation.navigate('InvestorProfile')
  }

  render () {
    const { parsedQuestions } = this.props.navigation.state.params
    return (
      <Questions
        questions={parsedQuestions}
        onExit={this.onExit}
        onFinish={this.onFinish}
        onContinueAddition={this.props.screenProps.saveInvestorOnboardingAnswers}
      />
    )
  }
}
