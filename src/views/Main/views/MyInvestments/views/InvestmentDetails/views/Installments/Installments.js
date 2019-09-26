import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { View, Colors, Row, Spacing, Typography } from '~/newUI'
import { InstallmentList } from './components'
import { isInAnalysis } from '~/utils/investmentsHelpers'
import { LoadingIndicator } from '../../../../components'

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff'
  },
  table: {
    paddingVertical: Spacing.s6
  },
  col1: {
    width: 65
  },
  col2: {
    width: 95
  },
  col3: {
    width: 120
  }
})

export default class Installments extends React.PureComponent {
  render () {
    const { installments, screenProps, loading } = this.props
    const { investment } = screenProps.navigation.state.params
    const installmentsToList = isInAnalysis(investment) ? investment.installments : installments
    return (
      <View style={styles.content}>
        <LoadingIndicator active={loading} />
        <ScrollView>
          <View paddedHorizontally style={styles.table}>
            <Row>
              <Typography.T3 style={styles.col1} align='left' color={Colors.warmGray}>PARCELA</Typography.T3>
              <Typography.T3 style={styles.col2} align='center' color={Colors.warmGray}>VENCIMENTO</Typography.T3>
              <Typography.T3 style={styles.col3} align='right' color={Colors.warmGray}>VALOR</Typography.T3>
            </Row>
            <InstallmentList colsStyles={styles} installments={installmentsToList} />
          </View>
        </ScrollView>
      </View>
    )
  }
}
