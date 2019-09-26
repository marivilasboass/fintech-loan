import React from 'react'
import { StyleSheet } from 'react-native'

import View from '../View'
import Touch from '../Touch'
import Row from '../Row'
import Colors from '../Colors'
import Spacing from '../Spacing'
import { isCurrent, getFirstInstallmentToReceive } from '~/utils/installmentsHelpers'
import * as R from 'ramda'

const containerHeight = 28
const installmentHeight = 8

const styles = StyleSheet.create({
  container: {
    height: containerHeight,
    borderRadius: containerHeight / 2,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  installment: {
    height: installmentHeight,
    borderRadius: installmentHeight / 2,
    marginHorizontal: Spacing.s1 / 2,
    backgroundColor: Colors.mercury
  },
  paid: {
    backgroundColor: Colors.darkGreen
  },
  current: {
    backgroundColor: Colors.darkYellow
  },
  late: {
    backgroundColor: Colors.darkRed
  }
})

export default class InstallmentsProgressBar extends React.PureComponent {
  static defaultProps = {
    installments: []
  }

  state = {
    width: 0
  }

  renderInstallment = () => {
    const { installments } = this.props
    const { width } = this.state
    const totalWidth = width - (installments.length * 4)
    const installmentWidth = totalWidth / installments.length
    return installments.map((installment) => {
      const { status, late, dueDate } = installment
      const current = isCurrent(dueDate)
      const style = [
        styles.installment,
        { width: installmentWidth < 0 ? 0 : installmentWidth },
        (current && installment._id) && styles.current,
        late && styles.late,
        status === 'paid' && styles.paid
      ]
      return (
        <View key={installment._id || installment.dueDate} style={style} />
      )
    })
  }

  getInstallmentToShow = () => {
    const { installments } = this.props

    const firstToReceive = getFirstInstallmentToReceive(installments)
    if (firstToReceive) {
      return firstToReceive
    }
    return R.last(installments)
  }

  render () {
    const { onPress } = this.props
    const installment = this.getInstallmentToShow()
    return (
      <Touch onPress={() => onPress(installment)}>
        <View>
          <Row style={styles.container} onLayout={({ nativeEvent }) => this.setState({ width: nativeEvent.layout.width - 16 })}>
            {this.renderInstallment()}
          </Row>
        </View>
      </Touch>
    )
  }
}
