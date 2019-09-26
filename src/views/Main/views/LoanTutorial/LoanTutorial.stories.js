import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import LoanTutorial from './LoanTutorial'

storiesOf('LoanTutorial', module)
  .addDecorator(getStory => <View style={{ flex: 1 }}>{getStory()}</View>)
  .add('normal', () => (
    <LoanTutorial
      navigation={{ getParam: () => 'foo' }}
    />
  ))
