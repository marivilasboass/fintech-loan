import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { Alert } from 'react-native'

import { FastSelector } from '~/newUI'

const object = [
  { numberOfInstallments: '6x' },
  { numberOfInstallments: '9x' },
  { numberOfInstallments: '12x' }
]

storiesOf('FastSelector', module)
  .add('basic', () => (
    <FastSelector options={object} keyObject='numberOfInstallments' onSelect={event => Alert.alert(event.numberOfInstallments)} />
  ))
