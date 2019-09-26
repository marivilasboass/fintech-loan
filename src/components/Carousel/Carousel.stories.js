import React from 'react'
import Index from './index'
import { storiesOf } from '@storybook/react-native'

storiesOf('Carousel', module)
  .add('basic', () => (
    <Index />
  ))
