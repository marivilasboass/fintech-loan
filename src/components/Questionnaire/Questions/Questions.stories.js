import React from 'react'
import { Alert } from 'react-native'

import { storiesOf } from '@storybook/react-native'
import { withKnobs, text } from '@storybook/addon-knobs'
import { ActivityIndicator } from '~/newUI'
import { api, setAuth } from '~/services/api'

import Questions from './Questions'

const onExit = (questions) => Alert.alert('onExit', JSON.stringify(questions))
const onFinish = (questions) => { Alert.alert('onFinish', JSON.stringify(questions)) }

const questions = {
  totalIncome: {
    code: 'totalIncome',
    title: 'Renda total',
    description: 'Declare aqui a sua renda total, ou seja, a renda do seu emprego principal acrescida de eventuais benefícios',
    hint: 'Podemos considerar um trabalho fixo, aquele que gere renda mensal estável e com valor mínimo garantido (sem comissões e etc).',
    answerType: 'currency',
    defaultAnswer: null,
    answer: null
  },
  numberOfChildren: {
    code: 'numberOfChildren',
    title: 'Quantos filhos você tem?',
    description: 'Lorem ipsum',
    hint: 'Bar',
    answerType: 'integer',
    defaultAnswer: 0,
    answer: null
  },
  hasDefaulted: {
    code: 'hasDefaulted',
    title: 'Você está negativado?',
    description: 'Lorem ipsum',
    hint: '"Negativado" é quando uma pessoa esta com restrições no CPF, relacionado a dívidas em atraso contraídas no mercado.',
    answerType: 'multipleChoice',
    choices: {
      yes: { value: 'yes', label: 'Sim' },
      no: { value: 'no', label: 'Não' }
    },
    answer: null,
    defaultAnswer: null
  },
  requestedAmount: {
    code: 'requestedAmount',
    title: 'Quanto está precisando?',
    description: 'De quanto dinheiro você precisa?',
    hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    answerType: 'currency',
    answer: null,
    defaultAnswer: null
  }
}

class RemoteQuestionnaire extends React.PureComponent {
  state = {
    questions: null
  }

  componentDidMount = () => {
    this.fetchQuestions()
  }

  fetchQuestions = async () => {
    const { username, password } = this.props
    const { data: signInResponse } = await api.post('new-auth/public/signIn', { username, password }, { noAuth: true })
    setAuth(signInResponse.data)
    const { data: result } = await api.post('credit-score/user/getQuestions')

    this.setState({ questions: result.data })
  }

  render () {
    const { questions } = this.state

    if (!questions) {
      return (<ActivityIndicator size={44} />)
    }

    return (
      <Questions {...({ questions, onExit, onFinish })} />
    )
  }
}

storiesOf('Questions', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <Questions {...({ questions, onExit, onFinish })} />
  ))
  .add('from remote', () => (<RemoteQuestionnaire username={text('username', '15523566713')} password={text('password', '123456')} />))
