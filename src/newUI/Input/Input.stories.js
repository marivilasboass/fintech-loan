import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import Input from './Input'

storiesOf('Input', module)
  .addDecorator(getStory => (
    <KeyboardAwareScrollView>
      <View paddedHorizontally>{getStory()}</View>
    </KeyboardAwareScrollView>
  )
  )
  .add('empty', () => (
    <Input />
  ))
  .add('label', () => (
    <Input label='Label' />
  ))
  .add('value', () => (
    <Input label='Label' defaultValue='1252' />
  ))
  .add('loading', () => (
    <Input loading label='CEP' defaultValue='22060-020' />
  ))
  .add('error', () => (
    <Input
      defaultValue='679495'
      label='Código'
      error='Código inexistente. Tente novamente.'
    />
  ))
  .add('masked', () => (
    <Input
      defaultValue='11111111111'
      mask='cpf'
      label='CPF'
    />
  ))
  .add('exact length', () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Input
        label='Agencia'
        exactLength={4}
        defaultValue='0298'
      />
      <Input
        label='Conta'
        exactLength={5}
        defaultValue='21622'
      />
      <Input
        label='Lolz'
        exactLength={8}
        defaultValue='0298'
      />
    </View>
  ))
  .add('kitchen sink', () => (
    <View>
      <Input label='First' defaultValue='Primeiro' />
      <Input label='Second' defaultValue='' loading placeholder='Buscando...' />
      <Input label='Oie' defaultValue='' />
      <Input label='Third' defaultValue='Oie' error='Erro!' />
    </View>
  ))
