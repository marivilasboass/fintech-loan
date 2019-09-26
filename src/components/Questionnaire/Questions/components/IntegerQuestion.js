import React from 'react'
import QuestionPage from '~/components/Questionnaire/QuestionPage'
import { MaskedInput, Typography, Colors } from '~/newUI'

export default class IntegerQuestion extends React.PureComponent {
  onChange = (maskedValue) => {
    const parsedValue = +maskedValue
    this.props.onChange(parsedValue)
  }

  render () {
    const { answer, ...otherProps } = this.props

    const parsedAnswer = `${answer || 0}`

    return (
      <QuestionPage {...otherProps} canContinue={answer !== null} plainHint buttonText={'Ok, Vamos Continuar'} buttonStyle={{ backgroundColor: Colors.secondary }}>
        <MaskedInput
          value={parsedAnswer}
          keyboardType='numeric'
          maxLength={2}
          underlineColorAndroid='transparent'
          onChange={this.onChange}
          autoFocus
          withCursor
        >
          <Typography.H2>{parsedAnswer}</Typography.H2>
        </MaskedInput>
      </QuestionPage>
    )
  }
}
