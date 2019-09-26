import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import InvestorOnboardingQuestions from './InvestorOnboardingQuestions'

storiesOf('InvestorOnboardingQuestions', module)
  .addDecorator(getStory => <View style={{ flex: 1 }}>{getStory()}</View>)
  .add('normal', () => (
    <InvestorOnboardingQuestions />
  ))
