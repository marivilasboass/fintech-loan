import React from 'react'
import { View, StyleSheet } from 'react-native'
import moment from 'moment'
import { Text } from '~/UI'
import Table, { Element } from '~/UI/Table'

import ScoreElement from './components/ScoreElement'

const styles = StyleSheet.create({
  table: {
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  scoreElement: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
})

export default class LoanDetails extends React.PureComponent {
  getDataToDisplay = () => {
    const { loan } = this.props

    const { requestedAmountCents, numberOfInstallments, bestPayDay, scoreFull, initialSimulation, finalizedSimulation } = loan
    const requestedAmount = requestedAmountCents / 100
    const bestPayDayFormatted = moment(bestPayDay).format('DD')

    const simulationToUse = finalizedSimulation || initialSimulation

    if (!simulationToUse) {
      return {
        requestedAmount,
        numberOfInstallments,
        installmentAmount: null,
        bestPayDay: bestPayDayFormatted,
        interestTotalAmount: null,
        totalAmount: null,
        scoreFull: null
      }
    }

    const { installmentAmountCents, interestTotalAmountCents, totalAmountCents } = simulationToUse
    const installmentAmount = installmentAmountCents / 100
    const interestTotalAmount = interestTotalAmountCents / 100
    const totalAmount = totalAmountCents / 100

    return ({
      requestedAmount,
      numberOfInstallments,
      installmentAmount,
      bestPayDay,
      interestTotalAmount,
      totalAmount,
      scoreFull
    })
  }

  render () {
    const {
      requestedAmount,
      numberOfInstallments,
      installmentAmount,
      bestPayDay,
      interestTotalAmount,
      totalAmount,
      scoreFull
    } = this.getDataToDisplay()

    return (
      <View>
        <Table style={styles.table}>
          <Element title='Valor solicitado'>
            <Text light type='currency'>{requestedAmount}</Text>
          </Element>

          <Element title='Parcelas'>
            <Text light>{`${numberOfInstallments}x`}</Text>
            <Text light>{' '}</Text>
            {installmentAmount ? (
              <Text light type='currency'>{installmentAmount}</Text>
            ) : null }
          </Element>

          <Element title='Vencimento'>
            <Text light>{`${bestPayDay} de cada mês`}</Text>
          </Element>

          {interestTotalAmount ? (
            <Element title='Total em juros'>
              <Text light type='currency'>{interestTotalAmount}</Text>
            </Element>
          ) : null}

          {totalAmount ? (
            <Element title='Total a pagar' last>
              <Text light type='currency'>{totalAmount}</Text>
            </Element>
          ) : null}
        </Table>
        <ScoreElement style={styles.scoreElement} scoreFull={scoreFull} />
      </View>
    )
  }
}
