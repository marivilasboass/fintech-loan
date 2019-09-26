import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import ProgressBar from './ProgressBar'

storiesOf('ProgressBar', module)
  .addDecorator(getStory => (
    <View paddedHorizontally>{getStory()}</View>
  ))
  .add('basic', () => (
    <View style={{ height: 100, backgroundColor: '#000' }}>
      <ProgressBar value={0.7} />
    </View>
  ))
