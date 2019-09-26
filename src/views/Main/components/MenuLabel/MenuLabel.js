import React from 'react'
import { StyleSheet } from 'react-native'
import * as SvgIcons from '~/newUI/Icons'
import * as UI from '~/UI'
import { Colors, Typography, View } from '~/newUI'

const { Touch, Icon: MutualIcon } = UI

const counterSize = 25

const styles = StyleSheet.create({
  icon: {
    color: Colors.primary,
    fontSize: 20
  },
  iconPlaceholder: {
    width: 25
  },
  containerWrapper: {
    flex: 1,
    // paddingRight: 15,
    paddingLeft: 30
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dashed
  },
  title: {
    flex: 1
  },
  arrowStyle: {
    opacity: 0.8,
    marginRight: 15
  },
  counter: {
    width: counterSize,
    height: counterSize,
    borderRadius: counterSize / 2,
    backgroundColor: Colors.brightBlue,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class MenuLabel extends React.PureComponent {
  render () {
    const { icon, title, onPress, notices } = this.props
    const color = icon ? Colors.primary : Colors.dark
    const iconElement = icon
      ? <MutualIcon style={[styles.iconPlaceholder, styles.icon]} type={icon} />
      : <View />
    const label = (
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          {iconElement}
          <Typography.H6 variant='regular' style={[styles.title, { color }]} bold={icon}>{title}</Typography.H6>
          { !!notices && (
            <View style={styles.counter}>
              <Typography.T4 variant={'bold'} color={'white'}>{notices}</Typography.T4>
            </View>
          ) }
          <SvgIcons.ChevronRight style={styles.arrowStyle} />
        </View>
      </View>
    )

    if (onPress) {
      return (
        <Touch onPress={onPress}>
          <View>
            {label}
          </View>
        </Touch>
      )
    }

    return label
  }
}
