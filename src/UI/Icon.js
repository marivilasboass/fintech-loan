import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Touch from './Touch'
import Text from './Text'

const icons = {
  loading: '\ue81c',
  checked: '\ue804',
  reload: '\ue802',
  erase: '\ue801',
  camera: '\ue800',
  io: '\ue803',
  arrowRight: '\ue805',
  arrowLeft: '\ue806',
  arrowDown: '\ue807',
  arrowTop: '\ue808',
  reload2: '\ue809',
  settings: '\ue80f',
  settings2: '\ue80d',
  settings3: '\ue80e',
  settingsMenu: '\uf1de',
  arrowTopMini: '\ue812',
  arrowLeftMini: '\ue813',
  arrowRightMini: '\ue814',
  arrowDownMini: '\ue811',
  lock: '\ue80a',
  unlock: '\ue80b',
  user: '\ue80c',
  userPlus: '\ue810',
  users: '\ue815',
  bad: '\ue81a',
  average: '\ue818',
  good: '\ue819',
  great: '\ue817',
  excelent: '\ue81b',
  cash: '\ue821',
  account: '\ue822',
  star: '\ue823',
  bell: '\ue824',
  sliders: '\ue825',
  investment: '\ue826',
  money: '\ue827',
  myAccount: '\ue828',
  chat: '\ue829'
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'mutual-icons',
    backgroundColor: 'transparent'
  }
})

export default class Icon extends Component {
  render () {
    const { type, style, onPress, containerStyle, ...other } = this.props

    const icon = (
      <Text style={[styles.icon].concat(style)} {...other}>
        {icons[type] || icons.bad}
      </Text>
    )

    if (onPress) {
      return (
        <Touch onPress={onPress}>
          <View style={containerStyle}>
            { icon }
          </View>
        </Touch>
      )
    }

    if (containerStyle) {
      return (
        <View style={containerStyle}>
          { icon }
        </View>
      )
    }

    return icon
  }
}
