import React from 'react'
import { StyleSheet } from 'react-native'

import Colors from '../Colors'
import View from '../View'
import Text from '../Text'
import Icon from '../Icon'
import Spacing from '../Spacing'

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    flexDirection: 'row'
  },
  icon: {
    paddingTop: Spacing.s6,
    paddingLeft: Spacing.s6
  },
  content: {
    paddingVertical: Spacing.s2,
    paddingHorizontal: Spacing.s6,
    flex: 1
  },
  contentWithTitle: {
    paddingVertical: Spacing.s4,
    paddingHorizontal: Spacing.s4
  }
})

export default class Message extends React.PureComponent {
  render () {
    const { title, variant, children, style, innerContainer, ...props } = this.props

    const [ icon, color, backgroundColor ] = (
      variant === 'error' ? [ 'alert', Colors.cinnabar, Colors.veryLightRed ]
      : variant === 'success' ? [ 'check', Colors.darkPastelGreen, Colors.veryLightGreen ]
      : variant === 'info' ? [ null, Colors.brightBlue, Colors.veryLightBlue ]
      : variant === 'warning' ? [ 'warning', Colors.black, '#ffe3e3' ]
      : [ '?', Colors.text, Colors.veryLightGray ]
    )

    const containerStyle = [ styles.container, { backgroundColor } ].concat(style)
    const contentStyle = [ styles.content, title && icon && styles.contentWithTitle ]
    const textAlign = !(title && icon) ? 'center' : undefined

    return (
      <View {...props} style={containerStyle}>
        {title && icon && (
          <View style={styles.icon}>
            <Icon color={color} type='svg' name={icon} size={42} />
          </View>
        )}
        <View style={contentStyle}>
          {title && icon && <Text.H5 color={color}>{title}</Text.H5>}
          <Text align={textAlign}>{children}</Text>
          {innerContainer}
        </View>
      </View>
    )
  }
}
