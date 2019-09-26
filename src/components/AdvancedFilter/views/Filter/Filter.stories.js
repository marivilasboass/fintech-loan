import React from 'react'
import FilterContainer from './FilterContainer'
import { storiesOf } from '@storybook/react-native'
import { withKnobs, boolean } from '@storybook/addon-knobs'

storiesOf('Filter', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <FilterContainer short={boolean('Short', false)} />
  ))
