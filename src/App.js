import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Font, AppLoading } from 'expo'

import Sentry from 'sentry-expo'

import numeral from 'numeral'
import 'numeral/locales/pt-br'
import moment from 'moment'
import 'moment/locale/pt-br'

import { Loader } from '~/UI'
import { configureStore } from '~/store/configureStore'
import config from '~/../config'
import * as analytics from '~/services/analytics'
import { downloadUpdateIfAvailable } from '~/services/updates'
import { setPersistor } from '~/services/persistor'

import StorybookUI from '~/../storybook'

import RootNavigator from './views'

Sentry.config(config.sentryDNS, {
  release: config.version,
  environment: config.environment
}).install()

downloadUpdateIfAvailable()

analytics.initialize()

numeral.locale('pt-br')
moment.locale('pt-br')

const { store, persistor } = configureStore()

setPersistor(persistor)

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }

  loadFonts = () => Font.loadAsync({
    'open-sans-bold': require('./../assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-light': require('./../assets/fonts/OpenSans-Light.ttf'),
    'open-sans-regular': require('./../assets/fonts/OpenSans-Regular.ttf'),
    'gilroy-extra-bold': require('./../assets/fonts/Gilroy-ExtraBold.ttf'),
    'gilroy-regular': require('./../assets/fonts/Gilroy-Regular.ttf'),
    'mutual-icons': require('./../assets/fonts/mutual-icons/font/mutual-icons.ttf'),
    'lato-regular': require('./../assets/fonts/Lato-Regular.ttf'),
    'lato-semibold': require('./../assets/fonts/Lato-Semibold.ttf'),
    'lato-bold': require('./../assets/fonts/Lato-Bold.ttf'),
    'lato-heavy': require('./../assets/fonts/Lato-Heavy.ttf'),
    'lato-black': require('./../assets/fonts/Lato-Black.ttf'),
    'lato-light': require('./../assets/fonts/Lato-Light.ttf')
  })

  render () {
    const { fontLoaded } = this.state

    if (!fontLoaded) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => this.setState({ fontLoaded: true })}
          onError={Sentry.captureException}
        />
      )
    }

    if (process.env.STORYBOOK_ONLY) {
      return <StorybookUI />
    }

    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loader.FullScreen />}
          persistor={persistor}
        >
          <RootNavigator />
        </PersistGate>
      </Provider>
    )
  }
}
