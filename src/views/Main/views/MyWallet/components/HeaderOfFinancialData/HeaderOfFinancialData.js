import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Row, Text, Spacing, Colors, FinanceText } from '~/newUI'

import Error from './components/Error'

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.marineBlue,
    paddingVertical: Spacing.s7
  },

  container: {
    paddingLeft: Spacing.s10,
    paddingRight: Spacing.s13,
    alignItems: 'center'
  },

  opacityText: {
    opacity: 0.8
  }

})

export default class HeaderOfFinancialData extends React.PureComponent {
  render () {
    const { balance, isScroll, hasError, committedBalance, loading, reload } = this.props

    const textCommomProps = { color: Colors.white, align: 'right' }
    const inAnalysisTextCommonProps = { color: Colors.white, align: 'center' }
    const style = { marginTop: isScroll }

    if (hasError) {
      return (<Error onPress={reload} />)
    }

    return (
      <View style={[ styles.header, style ]}>
        <Row style={styles.container}>
          <View>
            <Text.T3 variant='light' style={styles.opacityText} color={Colors.white}>SALDO DISPONÍVEL</Text.T3>
            <FinanceText
              loading={loading}
              style={{ textAlign: 'right' }}
              currencyProps={{ variant: 'light', fontSize: 20, ...textCommomProps }}
              cashProps={{ variant: 'heavy', fontSize: 28, ...textCommomProps }}
              centsProps={{ variant: 'heavy', fontSize: 20, ...textCommomProps }}
            >
              {balance}
            </FinanceText>
          </View>
          <View>
            <Text.T4 variant='light' style={styles.opacityText} {...inAnalysisTextCommonProps}>EM ANÁLISE</Text.T4>
            <FinanceText
              loading={loading}
              style={{ textAlign: 'center' }}
              currencyProps={{ variant: 'light', fontSize: 14, ...inAnalysisTextCommonProps }}
              cashProps={{ fontSize: 18, ...inAnalysisTextCommonProps }}
              centsProps={{ fontSize: 18, ...inAnalysisTextCommonProps }}
            >
              {committedBalance}
            </FinanceText>
          </View>
        </Row>
      </View>
    )
  }
}
