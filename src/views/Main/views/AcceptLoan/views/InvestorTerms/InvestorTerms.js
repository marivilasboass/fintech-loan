import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Sentry from 'sentry-expo'
import Skeleton from '~/components/Skeleton'

import FirstTerm from './components/FirstTerm'
import SecondTerm from './components/SecondTerm'

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexGrow: 1
  }
})

export default class InvestorTerms extends React.Component {
  state = {
    firstTerm: true,
    loading: true
  }

  componentDidMount () {
    const { navigation, acceptedInvestorTermsAt, hasToUpdatedSuitability } = this.props

    if (!acceptedInvestorTermsAt) {
      this.setState({ loading: false })
      return
    }
    if (acceptedInvestorTermsAt && hasToUpdatedSuitability) {
      navigation.navigate('SuitabilityIntro')
      return
    }

    navigation.navigate('ConfirmInvestment')
  }

  onAcceptAll = async () => {
    try {
      const { hasToUpdatedSuitability } = this.props
      this.setState({ loading: true })
      await this.props.acceptTerms('investor')
      this.setState({ loading: false })
      if (hasToUpdatedSuitability) {
        this.props.navigation.navigate('SuitabilityIntro')
        return
      }
      this.props.navigation.navigate('ConfirmInvestment')
    } catch (err) {
      this.setState({ loading: false })
      Sentry.captureException(err)
      Alert.alert('Ops!', 'Não foi possível finalizar o investimento, entre em contato com nossa central de atendimento.')
    }
  }

  render () {
    const { navigation } = this.props
    const { firstTerm, loading } = this.state

    if (loading) {
      return <View />
    }

    return (
      <Skeleton banner='Investimento' navigation={navigation}>
        <View style={styles.container}>
          {firstTerm
            ? (
              <FirstTerm
                onAccept={() => this.setState({ firstTerm: false })}
              />
            ) : (
              <SecondTerm
                onAccept={this.onAcceptAll}
              />
            )}
        </View>
      </Skeleton>
    )
  }
}
