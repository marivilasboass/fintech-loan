import React from 'react'
import QuestionPage from '~/components/Questionnaire/QuestionPage'
import { RadioGroup } from '~/newUI'

export default class RadioChoice extends React.PureComponent {
  onChange = (value) => {
    this.props.onChange(value)
  }

  render () {
    const { answer, choices, ...otherProps } = this.props
    return (
      <QuestionPage {...otherProps} canContinue={answer !== null}>
        <RadioGroup
          items={Object.values(choices)}
          value={answer}
          onChange={this.onChange}
        />
      </QuestionPage>
    )
  }
}
