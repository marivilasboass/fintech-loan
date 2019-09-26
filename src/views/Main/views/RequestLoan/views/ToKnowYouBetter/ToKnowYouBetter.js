import React from 'react'
import { StyleSheet } from 'react-native'

import { Colors, Text, Spacing, View, Button } from '~/newUI'
import * as SvgIcons from '~/newUI/Icons'
import CreateProfileHeader from '~/views/Intro/components/CreateProfileHeader'

import Location from '~/components/Location'
import { attemptToGetLocation } from '~/services/location'

import Sentry from 'sentry-expo'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  },

  container: {
    flex: 1,
    paddingHorizontal: Spacing.s6,
    paddingBottom: Spacing.s5 + 2,
    justifyContent: 'space-between'
  },

  title: {
    marginTop: Spacing.s3,
    marginBottom: Spacing.s2,
    paddingHorizontal: Spacing.s13
  },

  subtitle: {
    paddingHorizontal: Spacing.s14
  }
})

export default class ToKnowYouBetter extends React.PureComponent {
  state = {
    loading: false,
    requestingLocation: false,
    location: null
  }

  onBack = () => {
    this.props.navigation.goBack(null)
  }

  handleAccept = async () => {
    this.setState({ loading: true })

    const location = await this.getLocation()

    if (!location) {
      this.setState({ loading: false, requestingLocation: true })
      return
    }

    try {
      await this.props.sendLoanRequest(location)
    } catch (err) {
      Sentry.captureException(err)
    }

    this.setState({ loading: false })
    this.props.screenProps.navigation.navigate('Pendencies')
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
    this.handleAccept()
  }

  render () {
    const { requestingLocation, loading } = this.state
    return (
      <React.Fragment>
        <Location onLocation={this.onLocation} isVisible={requestingLocation} />

        <View style={styles.wrapper}>
          <CreateProfileHeader onBack={this.onBack} />

          <View style={styles.container}>
            <Text.T1 variant='heavy' color={Colors.nightRider} align='center' style={styles.title}>
            Agora precisamos te conhecer um pouco melhor
            </Text.T1>
            <SvgIcons.PiggyBank style={{ alignSelf: 'center' }} />
            <Text.T3 align='center' style={styles.subtitle}>Não se preocupe, seu pedido será salvo e publicado automaticamente depois de preencher suas pendências :) </Text.T3>
            <Button
              iconRight={{ name: 'arrow-forward', size: 20 }}
              title='Vamos lá'
              loading={loading}
              onPress={this.handleAccept}
            />
          </View>
        </View>
      </React.Fragment>
    )
  }
}
