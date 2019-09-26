import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import { Touch, Text, Colors } from '~/UI'
import { getStatusInfo } from '~/services/loanStatuses'

import LoanOwnersHeader from '../LoanOwnersHeader'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10
  },
  avatarsContainer: {
    flex: 3
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  line: {
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 5
  },
  statusTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 5
  },
  statusFirstLine: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  statusSecondLine: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  valuesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  bottomContainar: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    flex: 1
  },
  valueText: {
    flex: 1,
    flexDirection: 'row'
  },
  values: {
    flex: 8,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

export default class OwnerLoanCard extends React.PureComponent {
  getLoanDescription = () => {
    const { publishedAt, createdAt, effectedAt } = this.props

    if (effectedAt) {
      const effectedAtDate = moment(effectedAt)
      return `Data de recebimento: ${effectedAtDate.format('DD/MM/YYYY')} as ${effectedAtDate.format('HH:mm')}`
    }

    if (publishedAt) {
      const publishedAtDate = moment(publishedAt)
      return `Data de publicação: ${publishedAtDate.format('DD/MM/YYYY')} as ${publishedAtDate.format('HH:mm')}`
    }

    const createdAtDate = moment(createdAt)
    return `Data de solicitação: ${createdAtDate.format('DD/MM/YYYY')} as ${createdAtDate.format('HH:mm')}`
  }

  render () {
    const {
      style,
      borrower,
      marketplaceStatus,
      initialSimulation,
      finalizedSimulation,
      numberOfInstallments,
      onPress
    } = this.props

    const simulationToUse = finalizedSimulation || initialSimulation
    const { name: statusName, color: statusColorName } = getStatusInfo(this.props)
    const statusColor = Colors[statusColorName]
    const description = this.getLoanDescription()

    let totalAmount
    let installmentAmount
    if (simulationToUse) {
      totalAmount = simulationToUse.totalAmountCents / 100
      installmentAmount = simulationToUse.installmentAmountCents / 100
    }

    return (
      <Touch onPress={onPress}>
        <View style={[styles.container, style]}>

          <LoanOwnersHeader
            style={styles.avatarsContainer}
            borrower={borrower}
            marketplaceStatus={marketplaceStatus}
          />

          <View style={styles.line} />
          <View style={styles.statusContainer}>
            <View style={styles.statusTextContainer}>
              <View style={styles.statusFirstLine}>
                <Icon
                  name='controller-record'
                  size={14}
                  color={statusColor}
                  type='entypo'
                />
                <Text>{' '}</Text>
                <Text size='small' style={{ color: statusColor }}>{statusName}</Text>
              </View>
              <View style={styles.statusSecondLine}>
                <Text size='small' >{description}</Text>
              </View>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.bottomContainar}>
            <View style={styles.valuesContainer}>
              <View style={styles.values}>
                {simulationToUse ? (
                  <React.Fragment>
                    <Text primary bold type='currency'>{totalAmount}</Text>
                    <Text>{' '}</Text>
                    <View style={styles.valueText}>
                      <Text primary>{`em ${numberOfInstallments}x de`}</Text>
                      <Text>{' '}</Text>
                      <Text primary type='currency'>{installmentAmount}</Text>
                    </View>
                  </React.Fragment>
                ) : null}
              </View>
              <Icon style={styles.iconContainer}
                name='chevron-right'
                size={40}
                color={Colors.primary}
                type='material-community'
              />
            </View>
          </View>
        </View>
      </Touch>
    )
  }
}
