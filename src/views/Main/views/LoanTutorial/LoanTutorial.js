import React from 'react'
import { Text, StyleSheet, Image } from 'react-native'
import Tutorial from '~/components/Tutorial'

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  }
})

const pages = [{
  instructionTitle: 'Envie a documentação necessária',
  description: <Text>Após ter seu <Text style={styles.bold}>perfil aprovado</Text>, iremos publicar seu pedido de empréstimo automaticamente.</Text>,
  image: <Image source={require('./images/1-tomador.png')} resizeMode='contain' />
}, {
  instructionTitle: 'Solicite o seu empréstimo e nós divulgaremos o seu pedido aos investidores',
  description: <Text>Sua solicitação ficará disponível para uma rede de investidores que podem escolher <Text style={styles.bold}>investir em você ou não</Text>.</Text>,
  image: <Image source={require('./images/2-tomador.png')} resizeMode='contain' />
}, {
  instructionTitle: 'Aguarde pela conexão de um investidor',
  description: <Text>Após publicado seu empréstimo terá 3 dias úteis para ser investido. <Text style={styles.bold}>Caso seja</Text>, o valor compensará na sua conta da Mutual e poderá ser sacado para sua conta bancária.</Text>,
  image: <Image source={require('./images/3-tomador.png')} resizeMode='contain' />
}]

export default class LoanTutorial extends React.PureComponent {
  render () {
    return (
      <Tutorial
        title='Bem-vindo à Mutual!'
        subtitle='Para solicitar seu empréstimo,
siga as seguintes instruções:'
        buttonText='Avançar'
        onPressButton={() => this.props.navigation.navigate('RequestLoan')}
        pages={pages}
      />
    )
  }
}
