import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Row, Text, Spacing, Colors } from '~/newUI'
import * as SvgIcons from '~/newUI/Icons'

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
    opacity: 0.35
  },

  alignEnd: {
    alignItems: 'flex-end'
  },

  alignCenter: {
    alignItems: 'center'
  }
})

export default class Error extends React.PureComponent {
  render () {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Row style={styles.container}>
            <View style={styles.alignEnd}>
              <Text.T3 color={Colors.white} style={styles.opacityText}>SALDO DISPONÍVEL</Text.T3>
              <Text.T2 variant='light' color={Colors.white} style={styles.alignCenter}>
                R$&nbsp;
                <Text fontSize={28} color={Colors.white} style={styles.opacityText}>——&nbsp;</Text>
                <SvgIcons.Reload color={Colors.white} width={18.5} height={20} />
              </Text.T2>
            </View>
            <View>
              <Text.T4 style={styles.opacityText} color={Colors.white}>EM ANÁLISE</Text.T4>
              <Text.T4 variant='light' color={Colors.white} style={styles.alignCenter}>
                R$&nbsp;
                <Text fontSize={18} color={Colors.white} style={styles.opacityText}>——&nbsp;</Text>
              </Text.T4>
            </View>
          </Row>
        </TouchableOpacity>
      </View>
    )
  }
}
