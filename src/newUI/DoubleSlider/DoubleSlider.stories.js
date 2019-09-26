import React from 'react'
import { storiesOf } from '@storybook/react-native'
import DoubleSlider from './DoubleSlider'

storiesOf('DoubleSlider', module)
  .add('basic', () => (
    <DoubleSlider min={500} max={50000} values={[500, 50000]} step={500} />
  ))
