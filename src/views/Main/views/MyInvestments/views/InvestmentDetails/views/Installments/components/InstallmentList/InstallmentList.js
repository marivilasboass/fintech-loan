import React from 'react'
import moment from 'moment'
import { StyleSheet } from 'react-native'

import { View, Typography, Row, Spacing, DashedLine, Touch, Colors } from '~/newUI'
import { ChevronRight } from '~/newUI/Icons'
import { isCurrent, isInstallmentLate, isPaid } from '~/utils/installmentsHelpers'

const styles = StyleSheet.create({
  installment: {
    paddingVertical: Spacing.s5
  },
  value: {
    justifyContent: 'flex-end'
  },
  installmentValue: {
    color: Colors.nightRider
  },
  paid: {
    color: Colors.darkGreen
  },
  current: {
    color: Colors.darkYellow
  },
  late: {
    color: Colors.darkRed
  }
})

export default class InstallmentList extends React.PureComponent {
  renderList = () => {
    const { selectInstallment, colsStyles, installments } = this.props
    const { col1, col2, col3 } = colsStyles
    const numberOfInstallments = installments.length
    return installments.map((installment, index) => {
      const { dueDate, amountCents, amountPaidCents } = installment
      const installmentStyle = [
        styles.installmentValue,
        isCurrent(dueDate) && styles.current,
        isInstallmentLate(installment) && styles.late,
        isPaid(installment) && styles.paid
      ]
      const value = isPaid(installment) ? amountPaidCents : amountCents
      return (
        <Touch key={`${index}_${dueDate}`} onPress={() => selectInstallment(installment)}>
          <View>
            <Row style={styles.installment} key={Math.random()}>
              <Typography.T2 color={Colors.nightRider} style={col1} align='left'>{index + 1} de {numberOfInstallments}</Typography.T2>
              <Typography.T2 color={Colors.nightRider} style={col2} align='center'>{moment(dueDate).format('DD/MM/YYYY')}</Typography.T2>
              <Row style={[col3].concat(styles.value)}>
                <Typography>
                  <Typography.T2 align='right' style={installmentStyle} variant='light'>R$ </Typography.T2>
                  <Typography.T1 align='right' style={installmentStyle} format='newCurrency'>{value / 100}</Typography.T1>
                </Typography>
                <ChevronRight style={{ marginLeft: Spacing.s1 }} />
              </Row>
            </Row>
            <DashedLine />
          </View>
        </Touch>
      )
    })
  }

  render () {
    return (
      <View>
        {this.renderList()}
      </View>
    )
  }
}
