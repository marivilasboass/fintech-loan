import React from 'react'
import { Alert } from 'react-native'
import { View, Spacing } from '~/newUI'

import { storiesOf } from '@storybook/react-native'

import ScoreButton from './ScoreButton'

const mockOnPress = () => Alert.alert('onPress')

storiesOf('ScoreButton', module)
  .addDecorator((getStory) => (<View style={{ margin: Spacing.s6 }}>{getStory()}</View>))
  .add('A', () => (
    <ScoreButton scoreFull={'A'} onPress={mockOnPress} />
  ))
  .add('C+', () => (
    <ScoreButton scoreFull={'C+'} onPress={mockOnPress} />
  ))
  .add('F-', () => (
    <ScoreButton scoreFull={'F-'} onPress={mockOnPress} />
  ))
