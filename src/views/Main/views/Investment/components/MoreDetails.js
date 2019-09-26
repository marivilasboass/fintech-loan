import React, { PureComponent } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { View, Colors, Row, Text, Spacing } from '~/newUI'
import * as SvgIcons from '~/newUI/Icons'
import { getRiskText } from '~/services/score'

const styles = StyleSheet.create({
  detailButton: {
    marginTop: Spacing.s3,
    justifyContent: 'center'
  }
})

export default class MoreDetails extends PureComponent {
  render () {
    const { loan, onPress, titleProps, style } = this.props
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress}>
          <Text.T2 {...titleProps} variant='bold'>Score {loan.scoreFull}</Text.T2>
          <Text align='center' color={Colors.nightRider}>Investimento de {getRiskText(loan.scoreFull)}.</Text>
          <Row style={styles.detailButton}>
            <Text.T4 variant='bold' color={Colors.brightBlue}>Mais detalhes</Text.T4>
            <SvgIcons.ChevronRounded color={Colors.warmGray} style={{ left: 8, top: 2 }} />
          </Row>
        </TouchableOpacity>
      </View>
    )
  }
}
