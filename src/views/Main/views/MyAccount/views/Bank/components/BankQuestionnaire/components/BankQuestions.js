import React from 'react'
import CreditCardScreen from './CreditCardScreen'

export const bankQuestions = {
  whatsYourBank: {
    answer: null,
    answerType: 'radioChoice',
    choices: [
      { value: '104', label: 'Caixa Econômica F.', secondaryLabel: '104' },
      { value: '237', label: 'Bradesco', secondaryLabel: '237' },
      { value: '341', label: 'Itaú Únibanco', secondaryLabel: '341' },
      { value: '001', label: 'Banco do Brasil', secondaryLabel: '001' },
      { value: '033', label: 'Santander', secondaryLabel: '033' },
      { value: '041', label: 'Banrisul', secondaryLabel: '041' },
      { value: '077', label: 'Banco Inter', secondaryLabel: '077' }
    ],
    code: 'whatsYourBank',
    defaultAnswer: 0,
    description: 'Escolha o banco que deseja receber os valores, quando forem sacados da sua carteira:',
    hint: null,
    lastAnsweredAt: null,
    minutesBetweenAnswers: 43200,
    title: 'Qual seu banco',
    backButtonIcon: 'modal'
  },
  bankType: {
    answer: null,
    answerType: 'radioChoice',
    choices: [
      { value: 'cc', label: 'Conta Corrente' },
      { value: 'cp', label: 'Conta poupança' }
    ],
    code: 'bankType',
    defaultAnswer: null,
    description: 'Agora precisamos saber qual o tipo da sua conta bancária:',
    hint: null,
    lastAnsweredAt: null,
    minutesBetweenAnswers: 43200,
    title: 'Tipo de conta?'
  },
  creditCard: {
    answer: null,
    answerType: 'custom',
    custom: (props) => <CreditCardScreen {...props} />,
    choices: null,
    code: 'creditCard',
    defaultAnswer: null,
    description: null,
    hint: null,
    lastAnsweredAt: null,
    minutesBetweenAnswers: 43200,
    title: 'Dados bancários'
  },
  ownership: {
    answer: null,
    answerType: 'radioChoice',
    choices: [
      { value: 'yes', label: 'Sim' },
      { value: 'no', label: 'Não' }
    ],
    code: 'ownership',
    defaultAnswer: null,
    description: 'Confirma que esta conta bancária está registrada em seu nome e CPF?',
    hint: 'Obrigatóriamente toda conta bancária precisa estar registrada em seu nome e CPF.',
    lastAnsweredAt: null,
    minutesBetweenAnswers: 43200,
    title: 'Titularidade'
  }
}
