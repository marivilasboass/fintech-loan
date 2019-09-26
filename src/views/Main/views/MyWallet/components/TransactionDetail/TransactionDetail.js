import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import moment from 'moment'

import { BottomSheet, Text, Spacing, FinanceText, Colors, Row } from '~/newUI'
import Placeholder from '../Placeholder'
import mutualPicture from './images/thumb.png'

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.s7,
    paddingBottom: Spacing.s8,
    paddingHorizontal: Spacing.s6
  },

  dateText: {
    paddingLeft: Spacing.s6 - 2,
    marginTop: Spacing.s2
  },

  profileImage: {
    borderWidth: 1,
    borderRadius: 25,
    width: 50,
    height: 50,
    marginRight: Spacing.s4,
    alignItems: 'center',
    justifyContent: 'center'
  },

  row: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Spacing.s8,
    paddingTop: Spacing.s6,
    marginBottom: Spacing.s3,
    borderTopWidth: 1,
    borderTopColor: Colors.dashed
  },

  title: {
    marginTop: Spacing.s1
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
})

export default class TransactionDetail extends React.PureComponent {
  componentDidUpdate (prevProps) {
    const { transaction, fetchUser } = this.props
    const prevTransactionBorrowerId = prevProps.transaction && prevProps.transaction.borrowerId
    if (transaction && transaction.borrowerId && (transaction.borrowerId !== prevTransactionBorrowerId)) {
      fetchUser(transaction.borrowerId)
    }
  }

  renderSource = (source, borderColor) => (
    <View>
      <Row style={styles.row}>
        <View style={[{ borderColor }, styles.profileImage]}>
          <Image {...source.imageProps} style={styles.image} />
        </View>
        <View>
          <Text color={Colors.marineBlue} variant='bold'>{source.nickname}</Text>
          <Text color={Colors.warmGray} style={styles.title}>{source.title}</Text>
        </View>
      </Row>
    </View>
  )

  sourceOfMoney = ({ transactionValueType, transactionType, title }) => {
    const { smallProfilePicture, getUserById, transaction } = this.props
    const borrower = getUserById(transaction.borrowerId)

    const mutualTransactionTypes = ['ADD_FUNDS_AVAILABLE', 'WITHDRAWAL_REFUSED', 'INVESTMENT_REFUSED', 'WITHDRAWAL_CREATED', 'BORROWER_WITHDRAW_MONEY', 'BORROWER_RECEIVED_MONEY']
    const investorTransactionTypes = ['WITHDRAWAL_ACCEPTED', 'INVESTMENT_FULFILLED']
    const borderColor = transactionValueType === 'INCREASE' ? Colors.green : Colors.cinnabar
    const isMutual = mutualTransactionTypes.includes(transactionType)
    const isInvestor = investorTransactionTypes.includes(transactionType)

    if (isMutual) {
      return this.renderSource({ nickname: 'Mutual', title, imageProps: { source: mutualPicture } }, borderColor)
    }

    if (isInvestor) {
      return this.renderSource({ nickname: 'Você', title, imageProps: { source: { uri: smallProfilePicture } } }, borderColor)
    }

    return this.renderSource({ ...borrower, title, imageProps: { source: { uri: borrower.smallProfilePicture } } }, borderColor)
  }

  render () {
    const { transaction, getUserById, ...otherProps } = this.props

    const hasBorrower = transaction && transaction.borrowerId
    const borrower = hasBorrower && getUserById(transaction.borrowerId)
    const isLoadingBorrower = hasBorrower && !borrower

    return (
      <BottomSheet active={!!transaction} {...otherProps}>
        <View style={styles.container}>
          { !transaction || isLoadingBorrower
            ? <Placeholder />
            : (
              <React.Fragment>
                <FinanceText
                  type={transaction.transactionValueType}
                  withOperator={{ variant: 'light', fontSize: 28 }}
                  currencyProps={{ variant: 'light', fontSize: 28, color: Colors.warmGray }}
                  cashProps={{ variant: 'heavy', fontSize: 28, color: Colors.nightRider }}
                  centsProps={{ variant: 'heavy', fontSize: 28, color: Colors.nightRider }}
                  children={transaction.transactionValueCents / 100}
                />

                <Text color={Colors.warmGray} style={styles.dateText}>
                  { moment(transaction.transactionDate).format('[Em] LLL') }
                </Text>

                {this.sourceOfMoney(transaction)}

                <Text.T4 color={Colors.nightRider}>{transaction.description}</Text.T4>
              </React.Fragment>
            )}
        </View>
      </BottomSheet>
    )
  }
}
