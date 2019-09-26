import React from 'react'
import { ScrollView } from 'react-native'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import Placeholder from './Placeholder'

storiesOf('Placeholder', module)
  .addDecorator(getStory => (
    <ScrollView>
      <View paddedHorizontally>{getStory()}</View>
    </ScrollView>
  ))
  .add('default', () => (
    <Placeholder />
  ))
