import React from 'react'
import { storiesOf } from '@storybook/react-native'
import HeaderComponent from './HeaderComponent'

storiesOf('HeaderComponent', module)
  .add('basic', () => (
    <HeaderComponent />
  ))
