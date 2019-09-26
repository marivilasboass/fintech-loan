import React from 'react'
import { StyleSheet } from 'react-native'

import { Typography, Spacing, Colors, Password, BottomSheet, View } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.s7,
    paddingHorizontal: Spacing.s6
  },

  title: {
    marginBottom: Spacing.s2
  },

  subtitle: {
    marginBottom: Spacing.s12,
    paddingHorizontal: Spacing.s8
  },

  password: {
    marginBottom: Spacing.s10
  }

})

export default class ConfirmPasswordBottomSheet extends React.PureComponent {
  render () {
    const { title, subtitle, onChange, value, onAdvance, loading, btnTitle, active, onClose } = this.props
    return (
      <BottomSheet active={active} onPress={onClose}>
        <View>
          <View style={styles.container}>
            <Typography.H5 color={Colors.marineBlue} align='center' style={styles.title}>{title}</Typography.H5>
            <Typography.T4 align='center' style={styles.subtitle}>
              {subtitle}
            </Typography.T4>

            <Password value={value} style={styles.password} onChange={(password) => onChange(password)} />
          </View>
          <BottomSheet.Button
            title={btnTitle}
            small onPress={onAdvance} loading={loading}
          />
        </View>
      </BottomSheet>
    )
  }
}
