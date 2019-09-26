import React from 'react'
import QuestionPage from '~/components/Questionnaire/QuestionPage'
import { MaskedInput, Typography, Colors } from '~/newUI'
import { parse } from '~/services/parse'
import format from '~/services/format'

export default class CurrencyQuestion extends React.PureComponent {
  onChange = (maskedValue) => {
    const parsedValue = parse('currency', maskedValue)
    this.props.onChange(parsedValue)
  }

  render () {
    const { answer, ...otherProps } = this.props

    const parsedAnswer = `${answer || 0}`
    const formattedAnswer = format('newCurrency', parsedAnswer)

    return (
      <QuestionPage {...otherProps} canContinue={answer !== null} plainHint buttonText={'Ok, Vamos Continuar'} buttonStyle={{ backgroundColor: Colors.secondary }} textStyle={{ fontSize: 16, fontFamily: 'lato-semibold' }}>
        <MaskedInput
          value={parsedAnswer}
          keyboardType='numeric'
          maxLength={11}
          underlineColorAndroid='transparent'
          onChange={this.onChange}
          autoFocus
          withCursor
        >
          <Typography.H2 variant='light' color={Colors.warmGray}>R$ </Typography.H2><Typography.H2 variant='heavy'>{formattedAnswer}</Typography.H2>
        </MaskedInput>
      </QuestionPage>
    )
  }
}
