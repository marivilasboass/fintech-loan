import React, { PureComponent } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo'
import { Colors, Spacing, Text, Row } from '~/newUI'

import background from './images/traces.png'

const styles = StyleSheet.create({
  heightBar: {
    height: 11
  },

  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Spacing.s2,
    overflow: 'hidden'
  },

  graphic: {
    borderRadius: 12.5,
    overflow: 'hidden',
    backgroundColor: Colors.lightGray,
    paddingVertical: Spacing.s2,
    marginVertical: Spacing.s5
  },

  backgroundGradient: {
    height: 11,
    marginHorizontal: Spacing.s2,
    overflow: 'hidden',
    borderRadius: 6
  },

  monthlyExpensesBar: {
    position: 'absolute',
    height: 11,
    left: 0
  },

  freeIncomeBar: {
    position: 'absolute',
    height: 11,
    right: 0
  },

  descriptionIncome: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: Spacing.s3
  },

  descriptionIncomeInstallment: {
    alignItems: 'flex-start'
  }
})

const colors = [Colors.lightGreen, Colors.darkPastelGreen]
const colorsRed = [Colors.lightRed, Colors.cinnabar]

export default class MonthlyIncome extends PureComponent {
  render () {
    const { commitmentPercent, installmentValuePercent, availableIncomePercent } = this.props

    return (
      <View>
        <View style={styles.graphic}>
          <LinearGradient colors={colors} style={styles.backgroundGradient}>
            <ImageBackground source={background} style={styles.heightBar} imageStyle={{ top: 2 }}>
              <LinearGradient
                style={[
                  styles.monthlyExpensesBar,
                  { width: `${commitmentPercent * 100}%` }
                ]}
                colors={colorsRed}
              />
              <LinearGradient
                style={[
                  styles.freeIncomeBar,
                  { width: `${availableIncomePercent * 100}%` }
                ]}
                colors={colors} />
            </ImageBackground>
          </LinearGradient>
        </View>
        <Row style={styles.descriptionIncome}>
          <LinearGradient style={[styles.circle, { marginTop: -16 }]} colors={colorsRed} />
          <Text>
            <Text.T4 variant='bold' format='percentageRounded' color={Colors.nightRider}>{commitmentPercent}</Text.T4>
            <Text.T4 color={Colors.nightRider}> da renda comprometida com outros {'\n'} financiamentos</Text.T4>
          </Text>
        </Row>

        <Row style={[styles.descriptionIncome, styles.descriptionIncomeInstallment]}>
          <LinearGradient colors={colors} style={[styles.circle, { top: 4 }]}>
            <ImageBackground source={background} style={styles.circle} />
          </LinearGradient>
          <Text>
            <Text.T4 variant='bold' format='percentageRounded' color={Colors.nightRider}>{installmentValuePercent}</Text.T4>
            <Text.T4 color={Colors.nightRider}> da renda comprometida para pagar a parcela {'\n'} desse empréstimo</Text.T4>
          </Text>
        </Row>

        <Row style={styles.descriptionIncome}>
          <LinearGradient style={styles.circle} colors={colors} />
          <Text.T4 variant='bold' format='percentageRounded' color={Colors.nightRider}>{availableIncomePercent}</Text.T4>
          <Text.T4 color={Colors.nightRider}> da renda está livre</Text.T4>
        </Row>
      </View>
    )
  }
}
