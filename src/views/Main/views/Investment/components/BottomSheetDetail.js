import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { BottomSheet, View, ListItem, Text, Spacing, Colors } from '~/newUI'
import { getScoreLetter, getRiskText, getChanceText } from '~/services/score'

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingTop: Spacing.s7,
    paddingBottom: Spacing.s10,
    paddingLeft: Spacing.s6,
    paddingRight: Spacing.s7
  },

  partition: {
    backgroundColor: Colors.lineGray,
    height: 1,
    marginVertical: Spacing.s4
  }
})

export default class BottomSheetDetail extends PureComponent {
  choosesTextBasedOnAverage = (average) => {
    switch (average) {
    case 'belowAverage':
      return 'Renda abaixo da média em relação aos demais tomadores.'
    case 'aboveAverage':
      return 'Renda acima da média em relação aos demais tomadores.'
    default:
      return 'Renda dentro da média em relação aos demais tomadores.'
    }
  }

  render () {
    const {
      relativeIncomeRange, loan, rangeIncome,
      monthlyCommitmentWithInstallmentPercent, monthlyCommitmentPercent, availableIncomePercent, ...restProps
    } = this.props

    const scoreColor = Colors[`score${getScoreLetter(loan.scoreFull)}`]

    return (
      <BottomSheet {...restProps}>
        <ScrollView style={styles.bottomSheetContainer}>
          <Text.T2 color={scoreColor} align='center' style={{ marginBottom: Spacing.s7 }}>
            Investimento de <Text.T2 variant='bold' color={scoreColor}>{getRiskText(loan.scoreFull)}</Text.T2>
          </Text.T2>
          <ListItem>Score {loan.scoreFull}</ListItem>
          <ListItem>{getChanceText(loan.scoreFull)}</ListItem>
          { getScoreLetter(loan.scoreFull) !== 'F' && <ListItem>Nome limpo, sem restrição no SPC e Banco Central.</ListItem> }
          <View style={styles.partition} />
          <ListItem>
            Faixa mensal de <Text format='currencyRounded'>{rangeIncome.start}</Text> - <Text format='currencyRounded'>{rangeIncome.finish}</Text>.
          </ListItem>
          <ListItem>{ this.choosesTextBasedOnAverage(relativeIncomeRange) }</ListItem>
          <ListItem>Após esse empréstimo terá <Text format='percentageRounded'>{monthlyCommitmentWithInstallmentPercent}</Text> da renda declarada comprometida.</ListItem>
          <ListItem>
            { rangeIncome.finish ? (
              <Text>
                De uma renda mensal entre <Text format='currencyRounded'>{rangeIncome.start}</Text> e <Text format='currencyRounded'>{rangeIncome.finish}</Text>,{' '}
              </Text>
            ) : (
              <Text>
                De uma faixa de renda mensal de <Text format='currencyRounded'>{rangeIncome.start}</Text>,{' '}
              </Text>
            ) }

            <Text format='percentageRounded'>{monthlyCommitmentPercent}</Text> está comprometido com outros financiamentos.

          </ListItem>
        </ScrollView>
      </BottomSheet>
    )
  }
}
