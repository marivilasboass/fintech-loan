import React from 'react'
import { storiesOf } from '@storybook/react-native'

import CountdownButton from './CountdownButton'
import View from '../View'

storiesOf('CountdownButton', module)
  .add('basic', () => (
    <View paddedHorizontally>
      <CountdownButton title='abacate' onPress={() => { alert('abacate') }} onRefreshNeeded={() => alert('needRefresh')} />
    </View>
  ))
