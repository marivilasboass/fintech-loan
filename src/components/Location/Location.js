import React from 'react'
import { AppState, StyleSheet, Platform } from 'react-native'
import { KeepAwake } from 'expo'
import Sentry from 'sentry-expo'

import { Button, Text, View, Colors, Spacing, Modal } from '~/newUI'
import { Map } from '~/newUI/Icons'
import { getLocation, openGeneralLocationSettings, isLocationServicesEnabled, openAppLocationSettings, askForLocationPermission } from '~/services/location'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.s6,
    paddingVertical: Spacing.s12
  },

  mapIconContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.s6
  },

  mapIconLabel: {
    marginTop: Spacing.s8
  },

  buttonContainer: {
    width: '100%'
  }
})

export default class Location extends React.PureComponent {
  state = {
    appState: AppState.currentState,
    locationTimedOut: false,
    gettingLocation: false
  }

  onModalShow = async () => {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  onModalHide = () => {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.attemptToGetLocation()
    }

    this.setState({ appState: nextAppState })
  }

  onPress = async () => {
    const hasLocationPermission = await askForLocationPermission()
    if (!hasLocationPermission) {
      await openAppLocationSettings()
      return
    }

    const locationServicesEnabled = await isLocationServicesEnabled()
    // On some android devices it falsely reports locationServicesEnabled then errors when getting location
    if (!locationServicesEnabled || this.state.locationTimedOut) {
      await openGeneralLocationSettings()
      this.setState({ locationTimedOut: false })
      return
    }

    await this.attemptToGetLocation()
  }

  attemptToGetLocation = async () => {
    try {
      this.setState({ gettingLocation: true })
      const location = await getLocation()
      this.setState({ gettingLocation: false })

      if (location) {
        this.props.onLocation(location)
      }
    } catch (err) {
      this.setState({ gettingLocation: false })

      if (err.message === 'Location timeout') {
        this.setState({ locationTimedOut: true })
        return
      }

      Sentry.captureException(err)
    }
  }

  render () {
    const { style, ...otherProps } = this.props
    const { gettingLocation, locationTimedOut } = this.state

    return (
      <Modal style={[styles.container].concat(style)} onModalShow={this.onModalShow} onModalHide={this.onModalHide} {...otherProps}>
        <KeepAwake />

        <Text.H3 variant='heavy' color={Colors.nightRider} align='center' style={styles.title}>
          Precisamos da sua localização para continuar
        </Text.H3>

        <View style={styles.mapIconContainer}>
          <Map />
          <Text.T4 align='center' style={styles.mapIconLabel}>
            Por favor, habilite sua localização para continuar.
            {locationTimedOut && Platform.OS === 'android' && (<Text.T4 variant='bold'>{`\nCertifique-se que a localização foi habilitada em modo "Alta precisão (GPS e redes)"`}</Text.T4>)}
          </Text.T4>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            loading={gettingLocation}
            title='Habilitar localização'
            onPress={this.onPress}
          />
        </View>
      </Modal>
    )
  }
}
