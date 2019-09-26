import React from 'react'
import { StyleSheet } from 'react-native'

import Colors from '../Colors'
import Text from '../Text'
import View from '../View'
import Touch from '../Touch'
import Icon from '../Icon'
import Spacing from '../Spacing'
import ActivityIndicator from '../ActivityIndicator'

const buttonHeight = Spacing.s13

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: buttonHeight,
    borderRadius: 6,
    backgroundColor: Colors.primary
  },
  text: {
    fontFamily: 'lato-bold',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.white
  },
  bold: {
    fontFamily: 'lato-bold'
  },
  disabled: {
    backgroundColor: Colors.disabled
  },
  disabledLink: {
    color: Colors.disabled
  },
  inverted: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1
  },
  invertedSecondary: {
    backgroundColor: Colors.white,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 6
  },
  invertedText: {
    color: Colors.primary
  },
  invertedSecondaryText: {
    color: Colors.secondary,
    fontFamily: 'lato-regular'
  },
  secondary: {
    backgroundColor: Colors.secondary,
    height: buttonHeight,
    borderRadius: buttonHeight / 2
  },
  secondaryText: {
    fontFamily: 'lato-semibold'
  },
  link: {
    backgroundColor: Colors.white,
    height: 24
  },
  actionLink: {
    borderWidth: 1,
    borderColor: Colors.brightBlue,
    height: 44,
    borderRadius: 22
  },
  linkText: {
    color: Colors.brightBlue
  },
  smallText: {
    fontSize: 16
  },
  content: {
    flexDirection: 'row'
  },
  icon: {
    marginLeft: 8,
    marginRight: 8
  },
  iconContainer: {
    alignSelf: 'flex-end'
  },

  fixedOnBottom: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 0
  }
})

export default class Button extends React.PureComponent {
  render () {
    const { style, bold, textStyle, title, inverted,
      secondary, link, disabled, onPress, loading,
      iconLeft, iconRight, small, position, children, actionLink } = this.props

    const isDisabled = loading || disabled

    const buttonStyles = [
      styles.button,
      secondary && styles.secondary,
      link && styles.link,
      actionLink && styles.actionLink,
      inverted && (secondary ? styles.invertedSecondary : styles.inverted),
      (isDisabled && !link) && styles.disabled,
      (isDisabled && link) && styles.disabledLink,
      position === 'fixedOnBottom' && styles.fixedOnBottom,
      style
    ]

    const textStyles = [
      styles.text,
      secondary && styles.secondaryText,
      link && styles.linkText,
      inverted && (secondary ? styles.invertedSecondaryText : styles.invertedText),
      bold && styles.bold,
      small && styles.smallText,
      textStyle
    ]

    const iconColor = link ? Colors.brightBlue : Colors.white
    const leftIconProps = {
      ...iconLeft,
      color: iconColor,
      iconStyle: styles.icon,
      containerStyle: styles.iconContainer,
      key: 'iconLeft'
    }
    const rightIconProps = {
      ...iconRight,
      color: iconColor,
      iconStyle: styles.icon,
      containerStyle: styles.iconContainer,
      key: 'iconRight'
    }

    const content = loading ? (
      <ActivityIndicator size={32} color={iconColor} />
    ) : (
      <View style={styles.content}>
        {iconLeft && <Icon {...leftIconProps} />}
        { !children ? <Text key='text' style={textStyles}>{title}</Text> : children }
        {iconRight && <Icon {...rightIconProps} />}
      </View>
    )

    return (
      <Touch disabled={isDisabled} onPress={onPress}>
        <View style={buttonStyles}>
          {content}
        </View>
      </Touch>
    )
  }
}
