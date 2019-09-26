import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Text from '~/newUI/Text'
import Summary from '~/components/Summary'

storiesOf('Summary', module)
  .add('basic', () => (
    <Summary>
      <Summary.Card>
        <Text>Valor do empréstimo 1</Text>
      </Summary.Card>
      <Summary.Card>
        <Text>Valor do empréstimo 2</Text>
      </Summary.Card>
      <Summary.Card>
        <Text>Valor do empréstimo 3</Text>
      </Summary.Card>
    </Summary>
  ))
