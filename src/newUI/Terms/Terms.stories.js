import React from 'react'

import { storiesOf } from '@storybook/react-native'

import { View, Spacing } from '~/newUI'

import Terms from './Terms'

storiesOf('Terms', module)
  .addDecorator(getStory => <View style={{ flex: 1, padding: Spacing.s6 }}>{getStory()}</View>)
  .add('WebView Terms', () => (
    <Terms
      confirmed={false}
      onConfirmChanged={f => f}
      confirmText='Eu concordo com os Termos e Condições de Uso para os Tomadores'
      uri='http://mutual.club/Mutual.Termos.e.condicoes.Tomadores.html'
    />
  ))
