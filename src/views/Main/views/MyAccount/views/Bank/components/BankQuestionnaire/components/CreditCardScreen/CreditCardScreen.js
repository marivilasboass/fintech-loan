import React from 'react'
import { Colors } from '~/newUI'
import banks from '~/constants/banks'
import QuestionPage from '~/components/Questionnaire/QuestionPage'
import AccountInputs from '../../../AccountInputs'

export default class CreditCardScreen extends React.PureComponent {
  render () {
    const { answer, questions, ...otherProps } = this.props
    const chosenBank = banks[questions.whatsYourBank.answer.value]
    return (
      <QuestionPage {...otherProps} hideDescription canContinue={answer !== null} buttonText={'Continuar'} buttonStyle={{ backgroundColor: Colors.secondary }}>
        <AccountInputs
          bank={chosenBank}
          onChange={accountChange => { this.props.onChange(accountChange) }}
        />
      </QuestionPage>
    )
  }
}
