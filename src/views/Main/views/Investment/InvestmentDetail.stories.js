import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import InvestmentDetail from './InvestmentDetail'

storiesOf('Detail', module)
  .addDecorator(getStory => <View>{getStory()}</View>)
  .add('normal', () => (
    <InvestmentDetail loan={{
      score: 'B',
      investorProfitTotalValue: 380.72,
      investorProfitTotalPercent: 25,
      numberOfInstallments: 12,
      installmentValue: 156,
      payDay: 20,
      totalAmount: 1872,
      financedAmount: 1491.28,
      borrowerScoreData: {
        monthlyCommitmentPercent: 0.20,
        monthlyCommitmentWithInstallmentPercent: 0.90,
        monthlyLimitPercent: 0.10,
        rangeIncomeCents: {
          start: 300000,
          finish: 500000
        }
      },
      borrower: {
        nickname: 'Andressa Almeida',
        age: 45,
        largeProfilePicture: 'https://osegredo.com.br/wp-content/uploads/2017/09/O-que-as-pessoas-felizes-t%C3%AAm-em-comum-site-830x450.jpg'
      }
    }} />
  ))
