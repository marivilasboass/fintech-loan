import React from 'react'
import { StyleSheet } from 'react-native'

import { Button, Row, Shadow, Spacing, Colors } from '~/newUI'

const styles = StyleSheet.create({
  row: {
    padding: Spacing.s1
  },

  addMoneyButton: {
    flex: 1,
    height: 48
  },

  withdrawButton: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.brightBlue,
    marginLeft: Spacing.s1
  },

  fontSizeButton: {
    fontSize: 16
  },

  fontColorDisabledButton: {
    color: 'rgba(43,43,43,0.5)'
  },

  bgDisabledButton: {
    backgroundColor: Colors.mercury
  }
})

export default class AddAndWithdrawMoneyButtons extends React.PureComponent {
  render () {
    const { balance, onPress } = this.props
    return (
      <Shadow layout='auto' radius={0.1} color={Colors.black} opacity={0.05} y={3}>
        <Row style={styles.row}>
          <Button
            style={styles.addMoneyButton}
            textStyle={styles.fontSizeButton}
            title='Adicionar dinheiro'
            onPress={() => onPress('addMoney')}
          />
          <Button
            style={[ styles.withdrawButton, !balance && styles.bgDisabledButton ]}
            textStyle={[ styles.fontSizeButton, !balance && styles.fontColorDisabledButton ]}
            title='Sacar para conta'
            disabled={!balance}
            onPress={() => onPress('withdraw')}
          />
        </Row>
      </Shadow>
    )
  }
}
