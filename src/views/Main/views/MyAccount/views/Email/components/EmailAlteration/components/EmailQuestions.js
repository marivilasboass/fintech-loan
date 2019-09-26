import React from 'react'
import EmailChange from '../views/EmailChange'
import ConfirmEmailChange from '../views/ConfirmEmailChange'

export const getEmailQuestions = (oldEmail) => {
  return {
    emailChange: {
      answer: null,
      answerType: 'custom',
      custom: (props) => <EmailChange {...props} />,
      choices: null,
      code: 'emailChange',
      defaultAnswer: null,
      description: 'Insira o seu e-mail abaixo, você receberá todas as mensagens da Mutual neste e-mail:',
      hint: null,
      lastAnsweredAt: null,
      minutesBetweenAnswers: 43200,
      title: 'Alteração de e-mail',
      oldEmail,
      backButtonIcon: 'modal'
    },
    confirmEmailChange: {
      answer: null,
      answerType: 'custom',
      custom: (props) => <ConfirmEmailChange {...props} />,
      choices: [
        { value: 'yes', label: 'Sim' },
        { value: 'no', label: 'Não' }
      ],
      code: 'confirmEmailChange',
      defaultAnswer: null,
      description: null,
      hint: null,
      lastAnsweredAt: null,
      minutesBetweenAnswers: 43200,
      title: 'Confirmação'
    }
  }
}
