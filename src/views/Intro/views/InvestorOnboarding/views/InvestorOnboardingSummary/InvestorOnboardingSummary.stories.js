import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import InvestorOnboardingSummary from './InvestorOnboardingSummary'

storiesOf('InvestorOnboardingSummary', module)
  .addDecorator(getStory => <View style={{ flex: 1 }}>{getStory()}</View>)
  .add('normal', () => (
    <InvestorOnboardingSummary />
  ))
