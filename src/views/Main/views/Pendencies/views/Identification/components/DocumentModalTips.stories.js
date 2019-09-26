import React from 'react'

import { storiesOf } from '@storybook/react-native'

import DocumentModalTips from './DocumentModalTips'

storiesOf('DocumentModalTips', module)
  .add('default', () => (
    <DocumentModalTips
      isVisible
      backAction={() => {}}
      closeModalTips={() => {}}
    />
  ))
