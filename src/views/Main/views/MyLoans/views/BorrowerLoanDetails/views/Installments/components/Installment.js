import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment-timezone'
import Collapsible from 'react-native-collapsible'

import { Text, Colors, Button } from '~/UI'
import format from '~/services/format'

const getStatusColor = installment =>
  installment.status === 'paid' ? Colors.green
  : installment.status === 'partiallyPaid' ? Colors.yellow
  : installment.status === 'unpaid' && installment.late ? Colors.red
  : Colors.yellow

const iconSize = 30
export const styles = StyleSheet.create({
  lastElement: {
    borderBottomWidth: 0
  },
  iconContainer: {
    width: iconSize,
    height: iconSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  rowElement: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  element: {
    borderColor: Colors.border,
    borderBottomWidth: 1
  },
  col1: {
    width: iconSize,
    paddingVertical: 5
  },
  col2: {
    textAlign: 'left',
    paddingTop: 5,
    flexWrap: 'wrap',
    paddingVertical: 5,
    flex: 1
  },
  col3: {
    textAlign: 'left',
    paddingTop: 5,
    flexWrap: 'wrap',
    paddingVertical: 5,
    flex: 1
  },
  col4: {
    textAlign: 'left',
    paddingTop: 5,
    flexWrap: 'wrap',
    paddingVertical: 5,
    flex: 1
  },
  col5: {
    width: iconSize,
    paddingVertical: 5
  },
  collapsibleContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  collapsibleContent: {
    flexGrow: 1
  },
  collapsibleContentTitle: {
    alignItems: 'flex-end',
    marginRight: 5
  },
  invoiceButton: {
    marginBottom: 5
  }
})

const amountCentsToString = (amountCents) => format('currency', amountCents ? amountCents / 100 : 0)

export default class Installment extends React.Component {
  render () {
    const { installment, invoice, i, totalInstallments, isBorrower, open, selectInvoice, navigateToViewInvoice } = this.props
    const isLastElement = i + 1 < totalInstallments
    const canHaveInvoiceButton = isBorrower

    return (
      <View style={isLastElement ? styles.element : styles.lastElement}>
        <View style={styles.rowElement}>
          <View style={styles.col1}>
            <View style={styles.iconContainer}>
              <Icon
                reverse
                name='lens'
                color={Colors.white}
                reverseColor={getStatusColor(installment)}
                size={10}
              />
            </View>
          </View>
          <Text light style={styles.col2}>
            {`${i + 1} de ${totalInstallments}`}
          </Text>
          <Text light type='currency' style={styles.col3}>
            {installment.amountCents / 100}
          </Text>
          <Text light style={styles.col4}>
            {moment.tz(installment.dueDate, 'America/Sao_Paulo').format('DD/MM/YY')}
          </Text>
          <TouchableOpacity onPress={selectInvoice(installment)} style={styles.col5}>
            <View style={styles.iconContainer}>
              <Icon
                reverse
                name={open ? 'arrow-drop-down' : 'arrow-drop-up'}
                color={Colors.white}
                reverseColor={Colors.primary}
                size={18}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={open}>
          <View style={styles.collapsibleContainer}>
            <View style={[styles.collapsibleContent, styles.collapsibleContentTitle]}>
              <Text>Parcela principal</Text>
              <Text>Multa por atraso</Text>
              <Text>Juros de mora</Text>
              {isBorrower && (<Text>Honorários advocatícios</Text>)}
              {isBorrower ? (<Text>Valor pago</Text>) : (<Text>Valor recebido</Text>)}
            </View>
            <View style={styles.collapsibleContent}>
              <Text light>{amountCentsToString(installment.initialAmountDueCents)}</Text>
              <Text light>{amountCentsToString(installment.totalFineAmountCents)}</Text>
              <Text light>{amountCentsToString(installment.totalMoraAmountCents)}</Text>
              {isBorrower && (<Text light>{amountCentsToString(installment.totalCollectionFeeAmountCents)}</Text>)}
              <Text light>{amountCentsToString(installment.amountPaidCents)}</Text>
            </View>
          </View>
          { canHaveInvoiceButton && (
            <Button
              title='Boleto'
              rightIcon={{ name: 'arrow-forward' }}
              style={styles.invoiceButton}
              disabled={!invoice}
              loading={!invoice && installment.status !== 'legalCollection'}
              onPress={() => navigateToViewInvoice(invoice)} />
          )}
        </Collapsible>
      </View>
    )
  }
}
