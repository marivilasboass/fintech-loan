import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import InvestorProfile from './InvestorProfile'

storiesOf('InvestorProfile', module)
  .addDecorator(getStory => <View style={{ flex: 1 }}>{getStory()}</View>)
  .add('normal', () => (
    <InvestorProfile
      navigation={{ getParam: () => 'foo' }}
    />
  ))
