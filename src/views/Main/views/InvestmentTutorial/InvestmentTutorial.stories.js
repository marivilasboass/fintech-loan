import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import InvestmentTutorial from './InvestmentTutorial'

storiesOf('InvestmentTutorial', module)
  .addDecorator(getStory => <View style={{ flex: 1 }}>{getStory()}</View>)
  .add('normal', () => (
    <InvestmentTutorial
      navigation={{ getParam: () => 'foo' }}
    />
  ))
