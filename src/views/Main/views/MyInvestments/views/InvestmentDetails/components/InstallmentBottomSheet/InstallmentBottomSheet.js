import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import moment from 'moment'

import { BottomSheet, View, Typography, Colors, Message, Spacing, TitleAndValueRow, DashedLine, Button, Tag } from '~/newUI'
import { isPaid, isInstallmentPaidLate, isInstallmentLate } from '~/utils/installmentsHelpers'
import format from '~/services/format'
import math from 'mathjs'

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.s6
  },
  row: {
    paddingVertical: Spacing.s1
  },
  infos: {
    paddingVertical: Spacing.s6
  },
  icon: {
    marginRight: Spacing.s6
  },
  button: {
    marginTop: Spacing.s8
  }
})

export default class InstallmentBottomSheet extends React.PureComponent {
  renderFineText = () => {
    const { installment } = this.props
    const { totalFineAmountCents } = installment
    const formattedFine = format('currency', math.divide(totalFineAmountCents, 100))
    return `${formattedFine} (2%)`
  }

  renderStatus = () => {
    const { installment } = this.props
    const paid = isPaid(installment)
    if (!paid) {
      return (
        <Typography.T2 align='center' color={Colors.warmGray}>
          {isInstallmentLate(installment) ? 'Parcela em atraso aguardando pagamento' : 'Aguardando pagamento'}
        </Typography.T2>
      )
    }
    return <Typography.T2 align='center' color={Colors.warmGray}>Parcela paga em {moment(installment.paymentDate).format('DD/MM/YYYY')}</Typography.T2>
  }

  renderInfo = () => {
    const { installment } = this.props
    const paidLate = isInstallmentPaidLate(installment)
    const paymentDate = moment(installment.paymentDate)
    const dueDate = moment(installment.dueDate)
    const daysLate = paymentDate.diff(dueDate, 'days')
    if (!paidLate) {
      return null
    }
    return (
      <Message variant='info'>
        <Typography.T3 align='center'>
          O pagamento desta parcela foi realizado com {daysLate} dia(s) de atraso, gerando juros e multa.
        </Typography.T3>
      </Message>
    )
  }

  renderTag = ({ style, children }) => (
    <View style={style}>
      <Tag align='flex-end'>
        <Typography>
          <Typography.T4 color={Colors.warmGray}>(+) </Typography.T4>
          <Typography.T3>{children}</Typography.T3>
        </Typography>
      </Tag>
    </View>
  )

  renderTaxes = () => {
    const { installment } = this.props
    const { totalMoraAmountCents } = installment
    if (!isInstallmentPaidLate(installment)) {
      return null
    }
    return (
      <React.Fragment>
        <View style={styles.infos}>
          <TitleAndValueRow style={styles.row} title={{ component: this.renderTag, text: 'Multa' }} value={{ text: this.renderFineText() }} />
          <TitleAndValueRow style={styles.row} title={{ component: this.renderTag, text: 'Juros' }} currency value={{ text: format('newCurrency', totalMoraAmountCents / 100) }} />
        </View>
        <DashedLine />
      </React.Fragment>
    )
  }

  renderButton = () => {
    const { installment } = this.props
    if (!isPaid(installment)) {
      return null
    }
    return (
      <Button
        small
        link
        secondary
        actionLink
        style={styles.button}
        iconLeft={{ name: 'Download', style: styles.icon, type: 'svg' }}
        title='Comprovante de pagamento'
      />
    )
  }

  render () {
    const { active, onPress, totalInstallments, installment, installmentIndex } = this.props
    const { initialAmountDueCents, dueDate, amountCents, amountPaidCents } = installment
    const value = isPaid(installment) ? amountPaidCents : amountCents
    return (
      <BottomSheet active={active} onPress={onPress}>
        <ScrollView>
          <View style={styles.container} paddedHorizontally>
            <Typography.H2 align='center' color={Colors.warmGray} variant='light'>
              R$ <Typography.H2 color={Colors.nightRider} format='newCurrency'>{(value / 100) || 0}</Typography.H2>
            </Typography.H2>
            {this.renderStatus()}
            {this.renderTaxes()}
            <View style={styles.infos}>
              <TitleAndValueRow style={styles.row} title={{ text: 'Parcela' }} value={{ text: `${installmentIndex + 1} de ${totalInstallments}` }} />
              <TitleAndValueRow style={styles.row} title={{ text: 'Vencimento' }} value={{ component: Typography.T1, text: moment(dueDate).format('DD/MM/YYYY') }} />
              <TitleAndValueRow style={styles.row} title={{ text: 'Valor original' }} currency value={{ text: format('newCurrency', initialAmountDueCents / 100 || 0) }} />
            </View>
            {this.renderInfo()}
          </View>
        </ScrollView>
      </BottomSheet>
    )
  }
}
