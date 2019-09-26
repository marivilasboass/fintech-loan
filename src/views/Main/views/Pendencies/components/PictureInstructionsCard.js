import React from 'react'
import { StyleSheet } from 'react-native'

import { Shadow, View, Text, Button, Colors } from '~/newUI'
import IconWithText from './IconWithText'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25
  },
  header: {
    marginHorizontal: 25
  },
  button: {
    marginHorizontal: 25,
    marginTop: 32
  },
  iconButton: {
    marginTop: 4,
    marginLeft: 8
  },
  row: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default class PictureInstructionsCard extends React.Component {
  render () {
    const { children, title, message, onPress, buttonStyle } = this.props
    const hasChildren = React.Children.count(children) !== 0

    return (
      <Shadow x={3} y={3} layout='fillWidth' radius={10}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text.H4 align='center' color={Colors.darkestGray} >{title}</Text.H4>
            <Text.T3 align='center' color={Colors.darkestGray}>{message}</Text.T3>
          </View>
          {hasChildren && (
            <View style={styles.row}>
              {children}
            </View>
          )}
          <Button
            onPress={onPress}
            secondary
            small
            title='Abrir câmera'
            iconRight={{ name: 'camera', type: 'svg', style: styles.iconButton }} style={[styles.button].concat(buttonStyle)} />
        </View>
      </Shadow>
    )
  }
}

PictureInstructionsCard.IconWithText = IconWithText
