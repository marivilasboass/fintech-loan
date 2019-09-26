import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { withKnobs } from '@storybook/addon-knobs'
import { View } from '~/newUI'

import DoughnutChart from './DoughnutChart'

const data = [
  { value: 1, color: '#0000ff' },
  { value: 8, color: '#00ff00' },
  { value: 3, color: '#ff0000' },
  { value: 4, color: '#00ffff' }
]

storiesOf('DoughnutChart', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <DoughnutChart total={540} size={250} data={data} />
  ))
