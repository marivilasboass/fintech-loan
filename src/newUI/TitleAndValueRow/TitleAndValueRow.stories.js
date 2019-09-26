import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import TitleAndValueRow from './TitleAndValueRow'

storiesOf('TitleAndValueRow', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .add('basic', () => (
    <View>
      <TitleAndValueRow title={{ text: 'Investiment' }} value={{ text: '210,00' }} />
    </View>
  ))
  .add('currency', () => (
    <View>
      <TitleAndValueRow currency title={{ text: 'Investiment' }} value={{ text: '210,00' }} />
    </View>
  ))
