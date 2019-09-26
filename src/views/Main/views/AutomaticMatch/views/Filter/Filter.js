import React from 'react'
import { Alert } from 'react-native'

import AutomaticMatchPages from '../../components/AutomaticMatchPages'
import Advanced from '~/components/AdvancedFilter'

const getErrorReasonText = ({ code }) => {
  switch (code) {
  case 'FILTER_NOT_FOUND_LOANS':
    return {
      title: 'Ops!',
      description: 'Nenhum empréstimo disponível para o filtro.'
    }
  default:
    return {
      title: 'Ops!',
      description: 'Não há empréstimos segundo os critérios que você selecionou nesse momento. Mude seu filtro ou tente novamente mais tarde.'
    }
  }
}

export default class Filter extends React.PureComponent {
  state = {
    loading: false
  }

  onAdvance = async () => {
    const { getAutomaticMatchResults, onAdvance, update, navigation } = this.props
    try {
      this.setState({ loading: true })
      const result = await getAutomaticMatchResults()
      update({ simulationResults: result })
      this.setState({ loading: false })
      onAdvance()
    } catch (err) {
      const { response } = err
      if (response.data.code === 'NOT_FOUND_LOANS_TO_INVESTED') {
        Alert.alert(
          'Você não possui saldo suficiente',
          'Recomendamos que carregue a sua carteira com saldo o suficiente para diversificar no mínimo em 3 investimentos.',
          [
            { text: 'Ok', onPress: () => navigation.navigate('Wallet', { addMoney: true, amountNeededToInvest: 2000 }) }
          ],
          { cancelable: false }
        )
        return
      }
      const alert = getErrorReasonText(response.data)
      Alert.alert(
        alert.title,
        alert.description
      )
      this.setState({ loading: false })
    }
  }

  render () {
    const { totalAvailiable, ...otherProps } = this.props
    const { loading } = this.state
    return (
      <AutomaticMatchPages
        {...otherProps}
        title={`Encontramos “${totalAvailiable} pedidos” disponíveis, vamos filtrar!`}
        subtitle='Defina o perfil de tomadores do seu novo portfólio a partir dos dados abaixo:'
        onAdvance={this.onAdvance}
        loading={loading}
      >
        <Advanced short />
      </AutomaticMatchPages>
    )
  }
}
