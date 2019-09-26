import React from 'react'
import QuestionPage from '~/components/Questionnaire/QuestionPage'
import { Colors, Input } from '~/newUI'
import * as profileValidators from '~/utils/profileValidators'

export default class CurrencyQuestion extends React.PureComponent {
  state = {
    newEmail: this.props.answer,
    emailError: '',
    repeatedEmail: this.props.answer,
    repeatedEmailError: '',
    canContinue: false
  }

  onChangeEmail = (newEmail) => {
    const { oldEmail } = this.props
    const emailError = oldEmail === newEmail ? 'Por favor escolher um e-mail diferente do atual' : profileValidators.emailValidator(newEmail)
    this.setState({ emailError, newEmail })
    this.props.onChange(newEmail)
  }

  onChangeReapetedEmail = (repeatedEmail) => {
    this.setState({ repeatedEmail, repeatedEmailError: this.state.newEmail !== repeatedEmail ? 'Por Favor verificar o e-mail, estão diferentes.' : null })
  }

  render () {
    const { ...otherProps } = this.props
    const { newEmail, emailError, repeatedEmail, repeatedEmailError } = this.state
    const canContinue = !emailError && !repeatedEmailError && newEmail && repeatedEmail && newEmail === repeatedEmail
    return (
      <QuestionPage {...otherProps} canContinue={canContinue} buttonText={'Continuar'} buttonStyle={{ backgroundColor: Colors.secondary }}>
        <Input
          label='E-mail'
          onChange={(email) => this.onChangeEmail(email)}
          value={newEmail}
          autoCorrect={false}
          autoCapitalize='none'
          textContentType='emailAddress'
          keyboardType='email-address'
          error={emailError}
        />
        <Input
          label='Repetir e-mail'
          onChange={(email) => this.onChangeReapetedEmail(email)}
          value={repeatedEmail}
          autoCorrect={false}
          autoCapitalize='none'
          textContentType='emailAddress'
          keyboardType='email-address'
          error={repeatedEmailError}
        />
      </QuestionPage>
    )
  }
}
