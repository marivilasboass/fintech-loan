import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { withKnobs, number, boolean } from '@storybook/addon-knobs'
import { View } from '~/newUI'

import AvatarProgress from './AvatarProgress'

storiesOf('AvatarProgress', module)
  .addDecorator(getStory =>
    <View paddedHorizontally>{getStory()}</View>
  )
  .addDecorator(withKnobs)
  .add('basic', () => (
    <AvatarProgress total={number('Total', 10)} value={number('Value', 2)} error={boolean('Error', false)} />
  ))
