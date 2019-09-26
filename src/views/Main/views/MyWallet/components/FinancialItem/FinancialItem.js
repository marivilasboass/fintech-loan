import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { View, Row, Shadow, Text, Colors, FinanceText, Spacing, Icon } from '~/newUI'
import moment from 'moment'
import R from 'ramda'

const styles = StyleSheet.create({
  dateRow: {
    justifyContent: 'center',
    marginTop: Spacing.s8,
    marginBottom: Spacing.s5
  },
  container: {
    marginHorizontal: Spacing.s5
  },
  dateContainer: {
    paddingHorizontal: Spacing.s2,
    paddingBottom: Spacing.s1,
    paddingTop: Spacing.s1 - 2
  },
  dotted: {
    borderColor: Colors.dashed,
    borderBottomWidth: 1,
    paddingBottom: Spacing.s5,
    marginBottom: Spacing.s5
  },
  arrow: {
    marginLeft: Spacing.s2
  },
  row: {
    flexDirection: 'row'
  }
})

export default class FinancialItem extends React.Component {
  shouldComponentUpdate ({ item: nextItem }) {
    const { item } = this.props
    return !R.equals(item, nextItem)
  }

  dateFormat = (date) => {
    const momentDate = moment(date)

    if (momentDate.calendar().includes('Hoje')) {
      return momentDate.format('[Hoje,] DD [de] MMMM').toUpperCase()
    }

    return momentDate.format('DD [de] MMMM').toUpperCase()
  }

  render () {
    const { item, onTransactionDetail } = this.props
    const smallLightFont = { variant: 'light', fontSize: 13 }

    return (
      <View style={styles.container}>
        <Row style={styles.dateRow}>
          <Shadow layout='auto' color={Colors.black} opacity={0.10} y={1} radius={11}>
            <Row style={styles.dateContainer}>
              <Text color={Colors.warmGray} variant='semibold' fontSize={13}>
                {this.dateFormat(item.date)} •&nbsp;
              </Text>
              <Text color={Colors.warmGray} {...smallLightFont}>
                SALDO <FinanceText
                  color={Colors.warmGray}
                  currencyProps={smallLightFont}
                  cashProps={smallLightFont}
                  centsProps={smallLightFont}>{item.totalAmountCents / 100}
                </FinanceText>
              </Text>
            </Row>
          </Shadow>
        </Row>
        {
          item.events.map((transaction, index, array) => (
            <TouchableOpacity key={transaction._id} onPress={() => onTransactionDetail(transaction)}>
              <Row style={[(array.length >= 1 && array.length - 1 !== index) && styles.dotted]}>
                <Text.T4>{transaction.title}</Text.T4>
                <View style={styles.row}>
                  <FinanceText
                    type={transaction.transactionValueType}
                    withOperator={{ variant: 'light', fontSize: 14 }}
                    currencyProps={{ variant: 'light', fontSize: 14 }}
                    cashProps={{ variant: 'semibold', fontSize: 14 }}
                    centsProps={{ variant: 'semibold', fontSize: 14 }}
                  >
                    {transaction.transactionValueCents / 100}
                  </FinanceText>
                  <Icon
                    color={Colors.veryLightGray}
                    name='ChevronSlim'
                    direction='right'
                    style={styles.arrow}
                    type='svg'
                  />
                </View>
              </Row>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
}
