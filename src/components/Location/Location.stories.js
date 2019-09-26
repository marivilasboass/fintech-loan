import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Location from './Location'
import { Alert } from 'react-native'

storiesOf('Location', module)
  .add('Basic screen', () => (
    <Location
      onLocation={location => Alert.alert('Location', JSON.stringify(location))}
    />
  ))
