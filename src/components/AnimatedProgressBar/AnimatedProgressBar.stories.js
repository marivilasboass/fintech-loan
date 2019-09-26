import React from 'react'
import AnimatedProgressBar from './AnimatedProgressBar'
import { storiesOf } from '@storybook/react-native'

storiesOf('AnimatedProgressBar', module)
  .add('basic', () => (
    <AnimatedProgressBar />
  ))
