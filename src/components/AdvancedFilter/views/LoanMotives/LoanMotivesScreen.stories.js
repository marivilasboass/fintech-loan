import React from 'react'
import LoanMotivesScreen from './LoanMotivesScreen'
import { storiesOf } from '@storybook/react-native'

storiesOf('LoanMotives', module)
  .add('basic', () => (
    <LoanMotivesScreen motives={[]} />
  ))
