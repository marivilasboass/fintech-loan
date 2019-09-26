import React from 'react'
import { Alert } from 'react-native'
import Sentry from 'sentry-expo'

import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'
import { Terms, Text } from '~/newUI'
import accountStatuses from '~/constants/accountStatuses'

export default class BorrowerTerms extends React.PureComponent {
  onAccept = () => {
    if (!this.state.acceptedFirstTerm) {
      this.setState({ acceptedFirstTerm: true, confirmed: false })
      return
    }

    this.onAcceptAll()
  }

  onAcceptAll = async () => {
    const { navigation, acceptTerms, fetchAccount } = this.props
    const navigationParams = navigation.state.params

    try {
      this.setState({ loading: true })
      await acceptTerms('borrower')
      const { status } = await fetchAccount()
      this.setState({ loading: false })

      if (status !== accountStatuses.approved) {
        navigation.navigate('ToKnowYouBetter', navigationParams)
        return
      }

      navigation.navigate('ConfirmPassword', navigationParams)
    } catch (err) {
      Sentry.captureException(err)
      Alert.alert('Oops!', 'Houve um erro ao confirmar os termos, favor entrar em contato com nossa equipe de atendimento')
      this.setState({ loading: false })
    }
  }

  state = {
    loading: true,
    confirmed: false,
    acceptedFirstTerm: false
  }

  render () {
    const { navigation } = this.props
    const { confirmed, loading, acceptedFirstTerm } = this.state

    return (
      <ViewWithHeaderAndButton
        backgroundType='none'
        onPressBack={() => navigation.goBack(null)}
      >
        <ViewWithHeaderAndButton.Header>
          <Text.H4>Para continuar, precisamos que você aceite nossos termos</Text.H4>
        </ViewWithHeaderAndButton.Header>

        <ViewWithHeaderAndButton.Content>
          {(!acceptedFirstTerm ? (
            <Terms
              confirmed={confirmed}
              onLoadEnd={() => this.setState({ loading: false })}
              onConfirmChanged={confirmed => this.setState({ confirmed })}
              confirmText='Eu concordo com os Termos e Condições de Uso para os Tomadores'
              uri='http://mutual.club/Mutual.Termos.e.condicoes.Tomadores.html'
            />
          ) : (
            <Terms
              confirmed={confirmed}
              onLoadEnd={() => this.setState({ loading: false })}
              onConfirmChanged={confirmed => this.setState({ confirmed })}
              confirmText='Eu concordo com a Procuração para Representação Junto A Instituição Financeira.'
              uri='http://mutual.club/procuracao.tomador.html'
            />
          ))}
        </ViewWithHeaderAndButton.Content>

        <ViewWithHeaderAndButton.Button
          onPress={this.onAccept}
          disabled={!confirmed || loading}
          title='Confirmar'
        />
      </ViewWithHeaderAndButton>
    )
  }
}
