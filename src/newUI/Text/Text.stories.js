import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import Text from './Text'

storiesOf('Text', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .add('default', () => (
    <Text>Texto padrão</Text>
  ))
  .add('variants', () => (
    <View>
      <Text variant='regular'>Texto padrão</Text>
      <Text variant='semibold'>Texto semibold</Text>
      <Text variant='bold'>Texto bold</Text>
      <Text variant='heavy'>Texto heavy</Text>
    </View>
  ))
  .add('markdown', () => (
    <Text.Markdown>{`# Titulo

    Conteudo

    ## SubTitulo

    Mais Conteudo`}</Text.Markdown>
  ))
  .add('predefined', () => (
    <View>
      <Text.T1>Texto.T1 = 24</Text.T1>
      <Text.T2>Texto.T2 = 20</Text.T2>
      <Text.T3>Texto.T3 = 16</Text.T3>
      <Text.T4>Texto.T4 = 14</Text.T4>
      <Text.T5>Texto.T5 = 12</Text.T5>
      <Text.H1>Texto.H1 = 32 heavy</Text.H1>
      <Text.H2>Texto.H2 = 28 bold</Text.H2>
      <Text.H3>Texto.H3 = 24 bold</Text.H3>
      <Text.H4>Texto.H4 = 20 bold</Text.H4>
      <Text.H5>Texto.H5 = 16 semibold</Text.H5>
    </View>
  ))
