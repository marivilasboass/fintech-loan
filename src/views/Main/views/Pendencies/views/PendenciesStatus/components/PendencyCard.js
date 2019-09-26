import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Shadow, View, Text, Touch, Icon } from '~/newUI'
import Colors from '~/newUI/Colors'

import PendencyProgressIcon from './PendencyProgressIcon'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16
  },
  text: {
    flex: 1,
    marginRight: 'auto',
    flexDirection: 'column'
  },
  title: {
    marginBottom: 4
  }
})

export default class PendencyCard extends Component {
  render () {
    const { title, description, progress, status, onPress, style } = this.props
    const enabled = status === 'rejected' || status === 'pending'

    return (
      <Shadow x={3} y={3} layout='fillWidth' radius={10} height={74} outerStyle={style}>
        <Touch onPress={enabled ? onPress : f => f}>
          <View style={styles.container}>
            <View style={styles.text}>
              <Text variant='semibold' style={styles.title}>{title}</Text>
              <Text.T4 color={Colors.warmGray}>{description}</Text.T4>
            </View>
            <PendencyProgressIcon status={status} progress={progress} />
            <Icon type='svg' name='ChevronRight' style={{ marginLeft: 14, alignSelf: 'center' }} />
          </View>
        </Touch>
      </Shadow>
    )
  }
}
