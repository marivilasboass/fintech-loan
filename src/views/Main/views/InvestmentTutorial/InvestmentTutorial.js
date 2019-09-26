import React from 'react'
import { Image } from 'react-native'
import Tutorial from '~/components/Tutorial'

const pages = [{
  instructionTitle: 'Aqui você é como um banco',
  description: 'O lucro e o risco da operação são todos seus. Por isso, é importante estar atento ao score do tomador',
  image: <Image source={require('./images/1-investidor.png')} resizeMode='contain' />
}, {
  instructionTitle: 'Em caso de atraso no pagamento',
  description: 'Nós realizamos a cobrança via app, e-mail e até telefone. Além disso, as parcelas do empréstimo ganham juros e multa.',
  image: <Image source={require('./images/2-investidor.png')} resizeMode='contain' />
}, {
  instructionTitle: 'E se o pagamento não for efetuado?',
  description: 'Nós fazemos toda a cobrança por você! Negativação automática 30 dias após a inadimplência. Além de multa de 2% e juros moratórios de 0,033% ao dia recebidos por você após o pagamento.',
  image: <Image source={require('./images/3-investidor.png')} resizeMode='contain' />
}]

export default class InvestmentTutorial extends React.PureComponent {
  render () {
    const { navigation } = this.props
    const loanId = navigation.getParam('loanId')
    const quotas = navigation.getParam('quotas')

    return (
      <Tutorial
        title='Esse é seu primeiro investimento!'
        subtitle={`Antes de prosseguir é importante saber que:`}
        buttonText='Continuar com o investimento'
        onPressButton={() => navigation.navigate('AcceptLoan', { previousRoute: 'InvestmentTutorial', loanId, quotas })}
        pages={pages} />
    )
  }
}
