import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import InstallmentsProgressBar from './InstallmentsProgressBar'

const firstSix = [{ _id: 1, status: 'paid' }, { _id: 2, status: 'paid' }, { _id: 3, status: 'paid' }, { _id: 4, status: 'paid' }, { _id: 5, late: true }, { _id: 6, dueDate: new Date() }]

const generateArray = (items) => {
  const array = [...firstSix]
  for (let i = 0; i < items - 6; i++) {
    array.push({ _id: i + 7, dueDate: '2019-01-01' })
  }
  return array
}

storiesOf('InstallmentsProgressBar', module)
  .addDecorator(getStory => <View>{getStory()}</View>)
  .add('6x', () => (
    <View paddedHorizontally>
      <InstallmentsProgressBar installments={[...firstSix]} />
    </View>
  ))
  .add('12x', () => (
    <View paddedHorizontally>
      <InstallmentsProgressBar installments={generateArray(12)} />
    </View>
  ))
  .add('24x', () => (
    <View paddedHorizontally>
      <InstallmentsProgressBar installments={generateArray(24)} />
    </View>
  ))
  .add('36x', () => (
    <View paddedHorizontally>
      <InstallmentsProgressBar installments={generateArray(36)} />
    </View>
  ))
