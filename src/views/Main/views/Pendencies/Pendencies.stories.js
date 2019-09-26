import React from 'react'

import { storiesOf } from '@storybook/react-native'

import PedenciesStatus from './views/PendenciesStatus'
import ProgressHeader from '~/components/Headers/ProgressHeader'
import PersonalView from './views/Personal'
import BankView from './views/Bank'
import IncomeView from './views/Income'

storiesOf('Views - Pendências', module)
  .add('lista', () => (
    <PedenciesStatus />
  ))
  .add('progress header', () => (
    <ProgressHeader progress={50} />
  ))
  .add('dados pessoais', () => (
    <PersonalView />
  ))
  .add('dados bancários', () => (
    <BankView />
  ))
  .add('renda', () => (
    <IncomeView />
  ))
