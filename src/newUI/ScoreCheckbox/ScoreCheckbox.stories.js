import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import ScoreCheckbox from './ScoreCheckbox'
import Spacing from '../Spacing'

storiesOf('ScoreCheckbox', module)
  .addDecorator(getStory => <View>{getStory()}</View>)
  .add('default', () => (
    <View style={{ padding: Spacing.s5 }}>
      <ScoreCheckbox style={{ marginBottom: Spacing.s5 }} score='A' profit='25,95' />
      <ScoreCheckbox style={{ marginBottom: Spacing.s5 }} score='B' profit='29,05' />
      <ScoreCheckbox style={{ marginBottom: Spacing.s5 }} score='C' profit='38,41' />
      <ScoreCheckbox style={{ marginBottom: Spacing.s5 }} score='D' profit='55,41' />
      <ScoreCheckbox style={{ marginBottom: Spacing.s5 }} score='E' profit='55,41' />
      <ScoreCheckbox style={{ marginBottom: Spacing.s5 }} score='F' profit='55,41' />
    </View>
  ))
