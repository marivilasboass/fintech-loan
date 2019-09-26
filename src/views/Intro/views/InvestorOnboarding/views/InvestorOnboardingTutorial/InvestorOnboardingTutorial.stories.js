import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import InvestorOnboardingTutorial from './InvestorOnboardingTutorial'

storiesOf('InvestorOnboardingTutorial', module)
  .addDecorator(getStory => <View style={{ flex: 1 }}>{getStory()}</View>)
  .add('normal', () => (
    <InvestorOnboardingTutorial />
  ))
