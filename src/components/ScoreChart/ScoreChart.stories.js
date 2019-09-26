import React from 'react'
import { storiesOf } from '@storybook/react-native'
import ScoreChart from './ScoreChart'

const scores = [ 5, 5, 5, 5, 5 ]

storiesOf('ScoreChart', module)
  .add('basic', () => (
    <ScoreChart scores={scores} title='Score' />
  ))
