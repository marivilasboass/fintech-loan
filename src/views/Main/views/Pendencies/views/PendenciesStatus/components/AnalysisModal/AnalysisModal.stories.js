import React from 'react'

import { storiesOf } from '@storybook/react-native'

import AnalysisModal from './AnalysisModal'

storiesOf('AnalysisModal', module)
  .add('default', () => (
    <AnalysisModal />
  ))
