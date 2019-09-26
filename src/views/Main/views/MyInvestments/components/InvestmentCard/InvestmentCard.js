import React from 'react'
import moment from 'moment'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import format from '~/services/format'
import LoanCardHeader from '~/components/LoanCardHeader'
import { Colors, Typography, Spacing } from '~/newUI'
import { fullNameAbbreviation } from '~/utils/stringHelper'
import { getStatusInfo } from '~/services/investmentStatuses'

const styles = StyleSheet.create({
  component: {
    marginBottom: Spacing.s6,
    borderColor: Colors.lineGray,
    borderWidth: 1,
    borderRadius: 5
  },
  footer: {
    paddingVertical: Spacing.s5,
    borderTopWidth: 1,
    borderTopColor: Colors.dashed,
    flexDirection: 'row',
    marginHorizontal: Spacing.s6,
    justifyContent: 'space-between'
  }
})

export default class InvestmentCard extends React.Component {
  shouldComponentUpdate (nextProps) {
    return this.props.item !== nextProps.item
  }

  getNumberOfInstallments = (investment) => {
    const { effectStatus, activeNegotiation, initialNumberOfInstallments } = investment
    if (effectStatus === 'finished') {
      return activeNegotiation.numberOfInstallments
    }
    return initialNumberOfInstallments
  }

  render () {
    const { item, onPress } = this.props
    const { totalFinancedAmountCents, borrower, totalReceivedCents, investedAt, paymentStatus, loan } = item
    const { scoreFull, score } = loan
    const title = fullNameAbbreviation(borrower.nickname)
    const received = totalReceivedCents / 100
    const status = getStatusInfo(item)
    const header = { title,
      subtitle: status.name,
      description: `Investido em ${moment(investedAt).format('DD/MM/YYYY')}` }
    const footer = [
      {
        text: 'Você investiu',
        value: `${format('currency', totalFinancedAmountCents / 100)}`
      },
      {
        text: 'Já recebeu',
        value: `${format('currency', received)}`
      },
      {
        text: 'Prazo',
        value: `${this.getNumberOfInstallments(item)} meses`
      }
    ]
    const scoreColor = Colors[`score${score}`]

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.component}>
          <LoanCardHeader
            titleColor={Colors.mutualBlue}
            scoreFull={scoreFull}
            borrower={borrower}
            error={paymentStatus === 'late'}
            score={score}
            value={totalReceivedCents}
            total={totalFinancedAmountCents}
            {...header}
          />

          { footer && (
            <View style={styles.footer}>
              {footer.map((info, index) => {
                return (
                  <View key={index}>
                    <View>
                      <Typography.T4 adaptSize color={Colors.warmGray}>{info.text}</Typography.T4>
                    </View>
                    <View>
                      <Typography.T4 adaptSize variant={'bold'} color={scoreColor}>{info.value}</Typography.T4>
                    </View>
                  </View>
                )
              })}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
