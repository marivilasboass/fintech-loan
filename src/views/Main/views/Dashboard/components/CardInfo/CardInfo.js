import React, { PureComponent } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { View, Colors, Spacing, Typography, InfoIcon } from '~/newUI'

const styles = StyleSheet.create({
  infoCard: {
    justifyContent: 'center',
    paddingLeft: Spacing.s3,
    marginVertical: Spacing.s3
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  value: {
    marginVertical: 4
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4
  },
  emptyIcon: {
    height: 12,
    marginBottom: 10
  }
})

export default class CardInfo extends PureComponent {
  render () {
    const { title, infoTitle, value, valueDescription, description, info, style, titleColor, onPressInfo } = this.props
    return (
      <TouchableWithoutFeedback onPress={() => onPressInfo ? onPressInfo({ title: infoTitle || title, text: info }) : {}}>
        <View style={[styles.infoCard].concat(style)}>
          <View style={styles.titleContainer}>
            <Typography.T1 color={titleColor || Colors.mutualBlue}>{title}</Typography.T1>
            { info
              ? (
                <View style={{ marginLeft: 5 }}>
                  <InfoIcon />
                </View>
              )
              : <View style={styles.emptyIcon} />
            }
          </View>
          { valueDescription
            ? (
              <View style={styles.valueContainer}>
                <Typography.T2 variant={'semibold'} style={{ marginRight: 4 }}>{value}</Typography.T2>
                <Typography.T6 variant={'semibold'} color={Colors.warmGray}>{valueDescription}</Typography.T6>
              </View>
            )
            : value
              ? <Typography.T2 variant={'semibold'} style={styles.value}>{value}</Typography.T2>
              : null
          }
          { description
            ? <Typography.T6 color={Colors.warmGray}>{description}</Typography.T6>
            : null
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
