import React from 'react'
import { Alert } from 'react-native'
import Questions from '~/components/Questionnaire/Questions'
import { track } from '~/services/analytics'
import { bankQuestions } from './components/BankQuestions'

const getErrorReasonText = ({ code, expected }) => {
  switch (code) {
  case 'INVALID_BRANCH_NUMBER_LENGTH':
    return `Por favor verifique se sua agência possui ${expected} dígitos. Caso necessário preencha com zeros à esquerda`
  case 'INVALID_BRANCH_DIGIT':
    return 'Por favor verifique se sua agência e dígito estão corretos'
  case 'INVALID_OPERATION_LENGTH':
    return `Por favor verifique se sua operação possui ${expected} dígitos.`
  case 'INVALID_ACCOUNT_DIGIT':
    return 'Por favor verifique se sua conta e dígito estão corretos'
  }

  return 'Por favor, verifique a sua agência e conta corrente no cartão do seu banco'
}

export default class BankQuestionnaire extends React.PureComponent {
  state = {
    passedIntroduction: false,
    questions: null
  }

  onFinish = async (questionnaire) => {
    const { code, agency, account, accountType } = this.props
    const { valid, reason, agency: newAgency, account: newAccount } = questionnaire.creditCard.answer
    const { value: newAccountType } = questionnaire.bankType.answer
    const { value: newCode } = questionnaire.whatsYourBank.answer
    const newBank = { code: newCode, accountType: newAccountType, account: newAccount, agency: newAgency }

    if (valid === false) {
      const reasonText = getErrorReasonText(reason)
      Alert.alert('Conta inválida', reasonText)
      return
    }

    if (code === newCode && agency === newAgency && account === newAccount && accountType === newAccountType) {
      Alert.alert(
        'Dados bancários já estão salvos',
        'Esta conta já está cadastrada'
      )
      return
    }

    Alert.alert(
      'Essa mudança pode levar até 8 horas',
      'Durante esse tempo você não poderá mudar sua conta bancária e realizar um saque',
      [
        {
          text: 'Ok',
          onPress: () => this.save(newBank)
        },
        {
          text: 'Cancelar'
        }
      ]
    )
  }

  save = async (newBank) => {
    this.setState({ loading: true })

    await this.props.updateBank(newBank)

    this.setState({ loading: false })

    track('UpdateBank')
    if (this.props.error) {
      Alert.alert('Erro', this.props.error)
      return
    }

    Alert.alert('Salvo com sucesso')
  }

  onExit = () => {
    this.props.onClose()
  }

  render () {
    return (
      <Questions
        loading={this.props.loading}
        questions={bankQuestions}
        onExit={this.onExit}
        onFinish={this.onFinish}
      />
    )
  }
}
