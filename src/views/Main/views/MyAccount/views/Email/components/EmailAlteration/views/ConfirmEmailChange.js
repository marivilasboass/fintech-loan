import React from 'react'
import QuestionPage from '~/components/Questionnaire/QuestionPage'
import { RadioGroup } from '~/newUI'

export default class ConfirmEmailChange extends React.PureComponent {
  onChange = (value) => {
    this.props.onChange(value)
  }

  render () {
    const { answer, choices, ...otherProps } = this.props
    const newEmail = otherProps.questions.emailChange.answer
    const newProps = { ...otherProps, description: `Confirma que o e-mail ${newEmail} esta correto e pertence a você?` }
    return (
      <QuestionPage {...newProps} canContinue={answer && answer.value === 'yes'}>
        <RadioGroup
          items={Object.values(choices)}
          value={answer}
          onChange={this.onChange}
        />
      </QuestionPage>
    )
  }
}
