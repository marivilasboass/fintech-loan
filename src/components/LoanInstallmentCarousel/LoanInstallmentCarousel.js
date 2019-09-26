import React from 'react'
import { StyleSheet } from 'react-native'
import moment from 'moment'

import { Colors, Typography, View, Spacing, Row } from '~/newUI'
import { ChevronRight } from '~/newUI/Icons'
import CarouselCard from '../CarouselCard'
import { isCurrent } from '~/utils/installmentsHelpers'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: Spacing.s3,
    paddingLeft: Spacing.s6
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusCircle: {
    width: 6,
    height: 6,
    borderWidth: 0,
    borderRadius: 3,
    marginRight: 10,
    backgroundColor: Colors.mercury
  },
  current: {
    backgroundColor: Colors.darkYellow
  },
  late: {
    backgroundColor: Colors.darkRed
  }
})

export default class LoanInstallmentCarousel extends React.PureComponent {
  renderItem = (installment) => {
    const { dueDate, late, amountCents } = installment
    const dueDateStr = moment(dueDate).format('[Vence dia] DD [de] MMMM')
    const circleStyle = [
      styles.statusCircle,
      isCurrent(dueDate) && styles.current,
      late && styles.late
    ]
    return (
      <View style={styles.container}>
        <Row>
          <View>
            <View style={styles.title}>
              <View style={circleStyle} />
              <Typography.H5 variant='regular' adaptSize>R$ <Typography.H5 format='newCurrency'>{ amountCents / 100 }</Typography.H5></Typography.H5>
            </View>
            <Typography.T4 adaptSize numberOfLines={1}>Pagamento em {late ? 'atraso' : 'aberto'}</Typography.T4>
            <Typography.T4 adaptSize color={Colors.warmGray}>{dueDateStr}</Typography.T4>
          </View>
          <ChevronRight />
        </Row>
      </View>
    )
  }
  render () {
    const { data, onPress } = this.props
    return (
      <CarouselCard data={data} onPress={onPress} showContent={this.renderItem} {...this.props} />
    )
  }
}
