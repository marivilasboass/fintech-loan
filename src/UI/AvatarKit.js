import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Colors } from '~/newUI'

const styles = StyleSheet.create({
  overlayContainer: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: 'transparent'
  },
  title: {
    color: Colors.primary
  }
})

export default class AvatarKit extends React.PureComponent {
  render () {
    const { picture, icon, size, style, ...otherProps } = this.props

    const sizeProp = size
      ? { [size]: true }
      : { medium: true }

    return (
      <Avatar
        overlayContainerStyle={[styles.overlayContainer].concat(style)}
        titleStyle={styles.title}
        rounded
        source={picture ? { uri: picture } : null}
        icon={icon || { name: 'account-circle' }}
        activeOpacity={0.7}
        {...sizeProp}
        {...otherProps}
      />
    )
  }
}
