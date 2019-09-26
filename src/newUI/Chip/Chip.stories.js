import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Chip from './Chip'

storiesOf('Chip', module)
  .add('basic', () => (
    <Chip text='Texto' />
  ))
  .add('onClose', () => (
    <Chip text='Rio de Janeiro, RJ' onClose={() => alert('clicou')} />
  ))
