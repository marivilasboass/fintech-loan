import React from 'react'
import { storiesOf } from '@storybook/react-native'
import ToKnowYouBetter from './ToKnowYouBetter'

const action = console.log // eslint-disable-line no-console

const fakeProps = {
  navigation: {
    goBack: () => action('Go back')
  },
  screenProps: {
    navigation: {
      navigate: (screen) => action(`Navigate to ${screen}`)
    }
  }
}

storiesOf('ToKnowYouBetter', module)
  .add('basic', () => (
    <ToKnowYouBetter {...fakeProps} />
  ))
