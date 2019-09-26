import React from 'react'
import { storiesOf } from '@storybook/react-native'

import LoanInstallmentCarousel from './LoanInstallmentCarousel'

const data = [{ dueDate: '2019-05-03', late: true, totalAmountToReceiveCents: 19000 }]

storiesOf('LoanInstallmentCarousel', module)
  .add('Basic screen', () => (
    <LoanInstallmentCarousel data={data} onPress={(item) => alert(JSON.stringify(item))} />
  ))
