import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import Typography from './Typography'

storiesOf('Typography', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .add('All', () => (
    <View>
      <Typography.T1>T1: 16 - bold</Typography.T1>
      <Typography.T2>T2: 16 - regular</Typography.T2>
      <Typography.T3>T3: 14 - semibold</Typography.T3>
      <Typography.T4>T4: 14 - regular</Typography.T4>
      <Typography.T5>T5: 13 - regular</Typography.T5>
      <Typography.T6>T6: 12 - regular</Typography.T6>

      <Typography.H1>H1: 32 - heavy</Typography.H1>
      <Typography.H2>H2: 28 - bold</Typography.H2>
      <Typography.H3>H3: 24 - heavy</Typography.H3>
      <Typography.H4>H4: 20 - heavy</Typography.H4>
      <Typography.H5>H5: 20 - bold</Typography.H5>
    </View>
  ))
