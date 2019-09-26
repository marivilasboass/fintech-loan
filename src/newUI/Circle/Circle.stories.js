import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Circle from './Circle'
import { Text } from '~/newUI'

storiesOf('Circle', module)
  .add('basic', () => (
    <Circle size={40}><Text>12x</Text></Circle>
  ))
