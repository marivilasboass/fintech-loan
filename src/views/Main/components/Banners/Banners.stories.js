import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import Banners from './Banners'
import { COMPLETE_REGISTRATION_STEPS, SOME_PENDENCY_REJECT } from './BannersFactory'

storiesOf('Banners', module)
  .addDecorator(getStory => <View>{getStory()}</View>)
  .add('lack of information', () => (<Banners bannerType={COMPLETE_REGISTRATION_STEPS} />))
  .add('profile error', () => (<Banners bannerType={SOME_PENDENCY_REJECT} />))
