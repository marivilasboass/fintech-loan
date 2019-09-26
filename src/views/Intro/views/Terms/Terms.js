import React from 'react'
import { StyleSheet, Alert } from 'react-native'

import { Terms, View, Spacing, Colors, Text, Button } from '~/newUI'
import { resetNavigationTo } from '~/services/navigation'
import { attemptToGetLocation } from '~/services/location'
import accountStatuses from '~/constants/accountStatuses'
import Location from '~/components/Location'

import CreateProfileHeader from '../../components/CreateProfileHeader'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  },

  container: {
    flex: 1,
    paddingHorizontal: Spacing.s6,
    paddingBottom: Spacing.s12 + Spacing.s1,
    justifyContent: 'space-between'
  },

  title: {
    marginBottom: Spacing.s5
  },

  button: {
    marginTop: Spacing.s6
  }
})

const errorTypeToMessage = {
  SYSTEM_ERROR: 'Houve uma falha no cadastro. Tente novamente mais tarde ou entre em contato com nossa central de atendimento',
  ACCOUNT_ALREADY_CREATED: 'Já existe um usuário com esse CPF na nossa base',
  REGISTRATION_DATA_NOT_FOUND: 'Infelizmente não conseguimos aprovar o seu perfil nesse momento. Tente novamente em 30 dias',
  MISSING_CPF_REQUIRED_DATA: 'Infelizmente não conseguimos aprovar o seu perfil nesse momento. Tente novamente em 30 dias',
  CPF_IS_DEAD: 'Infelizmente não conseguimos aprovar o seu perfil nesse momento. Tente novamente em 30 dias',
  CPF_AGE_REQUIREMENT: 'Infelizmente não conseguimos aprovar o seu perfil nesse momento. Tente novamente em 30 dias',
  // CPF_IS_DEAD: 'CPF cadastrado se encontra em óbito na Receita Federal',
  // CPF_AGE_REQUIREMENT: 'Não permitimos cadastros de menores de idade',
  INVALID_CPF: 'CPF cadastrado é inválido',
  INVALID_CPF_FORMAT: 'CPF cadastrado é inválido',
  NO_LOCATION: 'Precisamos de sua localização para criar sua conta',
  ACCOUNT_DELETED: 'Essa conta está deletada',
  // Temporary workaround for borrowers until we implement segmented register
  REGISTRATION_DATA_NOT_FOUND_BORROWER: 'Infelizmente não conseguimos aprovar um limite pra você agora. Tente novamente em dois meses.'
}

export default class TermsView extends React.PureComponent {
  state = {
    acceptTerms: false,
    disabledButton: false,
    loading: false,
    requestingLocation: false,
    location: null
  }

  handleAcceptTerms = () => {
    this.setState(prevState => ({ acceptTerms: !prevState.acceptTerms }))
    if (this.state.acceptTerms) {
      this.setState({ disabledButton: false })
    } else {
      this.setState({ disabledButton: true })
    }
  }

  attemptToRegister = async () => {
    const { register, navigation } = this.props
    this.setState({ loading: true })

    try {
      const location = await this.getLocation()

      if (!location) {
        this.setState({ requestingLocation: true, loading: false })
        return
      }

      const account = await register(location)
      if (account.status === accountStatuses.noLimit || account.status === accountStatuses.fraud) {
        resetNavigationTo(navigation, { routePath: ['ProfileRejected'] })
        return
      }

      resetNavigationTo(navigation, { routePath: ['Welcome'] })
    } catch (err) {
      const message = errorTypeToMessage[err.message] || errorTypeToMessage.SYSTEM_ERROR

      Alert.alert('Oops', message,
        [{ text: 'OK', onPress: () => this.setState({ loading: false, disabledButton: true }) }],
        { cancelable: true }
      )
    }
  }

  onAdvance = () => {
    this.props.navigation.navigate('Welcome')
  }

  onBack = () => {
    this.props.navigation.goBack(null)
  }

  getLocation = async () => {
    if (this.state.location) {
      return this.state.location
    }

    const location = await attemptToGetLocation()
    return location
  }

  onLocation = (location) => {
    if (this.state.loading) {
      return
    }

    this.setState({ requestingLocation: false, location })
    this.attemptToRegister()
  }

  render () {
    const { requestingLocation } = this.state

    return (
      <React.Fragment>
        <Location onLocation={this.onLocation} isVisible={requestingLocation} />
        <View style={styles.wrapper}>

          <CreateProfileHeader onBack={this.onBack} />
          <View style={styles.container}>
            <Text.T2 variant='heavy' color={Colors.nightRider} style={styles.title}>
            Para continuar, precisamos que você aceite nossos termos.
            </Text.T2>
            <Terms
              confirmText='Eu concordo com o Termo e Condições de Uso e Política de privacidade'
              onConfirmChanged={this.handleAcceptTerms}
              confirmed={this.state.acceptTerms}
              description='Eu concordo com o Termo e Condições de Uso e Política de Privacidade'
              uri='http://mutual.club/Mutual.Termos.Gerais.e.Condicoes.de.uso.html'
            />
            <Button
              disabled={!this.state.disabledButton}
              title='Confirmar'
              onPress={this.attemptToRegister}
              style={styles.button}
              loading={this.state.loading}
            />
          </View>
        </View>
      </React.Fragment>
    )
  }
}
