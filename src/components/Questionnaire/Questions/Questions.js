import * as R from 'ramda'
import React from 'react'
import { BackHandler } from 'react-native'
import IntegerQuestion from './components/IntegerQuestion'
import CurrencyQuestion from './components/CurrencyQuestion'
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion'
import RadioChoice from './components/RadioChoice'

export default class Questions extends React.PureComponent {
  constructor (props) {
    super(props)

    const { questions } = props
    const currentQuestionCode = this.getQuestionCodeByIndex(questions, 0)
    this.state = {
      questions,
      currentQuestionCode
    }
  }

  getQuestionCodeByIndex = (questions, index) => {
    const questionCodes = Object.keys(questions)
    return questionCodes[index]
  }

  getQuestionIndexByCode = (questions, code) => {
    const questionCodes = Object.keys(questions)

    return questionCodes.indexOf(code)
  }

  handleBackPress = () => {
    this.onBack()
    return true
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  getQuestionComponentByAnswerType = (answerType) => {
    const answerTypeToComponentMap = {
      integer: IntegerQuestion,
      number: IntegerQuestion,
      currency: CurrencyQuestion,
      multipleChoice: MultipleChoiceQuestion,
      radioChoice: RadioChoice
    }

    const QuestionComponent = answerTypeToComponentMap[answerType]

    if (!QuestionComponent) {
      throw new Error(`Unknown answer type ${answerType}`)
    }

    return QuestionComponent
  }

  onChange = (changedAnswer) => {
    this.setState(({ questions, currentQuestionCode }) => {
      const currentQuestion = questions[currentQuestionCode]
      const updatedQuestion = R.assoc('answer', changedAnswer, currentQuestion)
      const updatedQuestions = R.assoc(currentQuestionCode, updatedQuestion, questions)

      return { questions: updatedQuestions }
    })
  }

  onContinue = () => {
    const { onContinueAddition } = this.props
    this.setState(({ questions, currentQuestionCode }) => {
      const nextQuestionIndex = this.getQuestionIndexByCode(questions, currentQuestionCode) + 1
      const nextQuestionCode = this.getQuestionCodeByIndex(questions, nextQuestionIndex)

      if (!nextQuestionCode) {
        this.props.onFinish(questions)
        return
      }

      if (onContinueAddition) {
        onContinueAddition(questions)
      }

      return { currentQuestionCode: nextQuestionCode }
    })
  }

  onBack = () => {
    this.setState(({ currentQuestionCode, questions }) => {
      const previousQuestionIndex = this.getQuestionIndexByCode(questions, currentQuestionCode) - 1

      if (previousQuestionIndex < 0) {
        this.props.onExit(questions)
        return
      }

      const previousQuestionCode = this.getQuestionCodeByIndex(questions, previousQuestionIndex)
      return { currentQuestionCode: previousQuestionCode }
    })
  }

  render () {
    const { currentQuestionCode, questions } = this.state
    const question = questions[currentQuestionCode]
    const currentQuestionIndex = this.getQuestionIndexByCode(questions, currentQuestionCode)
    const QuestionComponent = question.custom || this.getQuestionComponentByAnswerType(question.answerType)

    return (
      <QuestionComponent
        {...this.state}
        {...question}
        onChange={this.onChange}
        onContinue={this.onContinue}
        onBack={this.onBack}
        answer={question.answer}
        currentStep={currentQuestionIndex + 1}
        totalSteps={Object.keys(questions).length}
        loading={this.props.loading}
      />
    )
  }
}
