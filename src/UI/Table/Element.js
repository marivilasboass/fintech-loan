import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'

import Colors from '../Colors'
import Touch from '../Touch'
import Text from '../Text'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  component: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderColor: Colors.border,
    borderBottomWidth: 1
  },
  onlyContent: {
    justifyContent: 'center'
  },
  content: {
    flexDirection: 'row'
  },
  last: {
    borderBottomWidth: 0
  }
})

export default class Element extends React.Component {
  render () {
    const { style, children, title, last, onPress, ...otherProps } = this.props

    const passedStyle = [
      styles.component,
      style,
      title === undefined && styles.onlyContent,
      last && styles.last
    ]

    const childrenIsText =
      React.Children.count(children) === 1 &&
      (typeof children === 'string' || typeof children === 'number')

    return (
      <Touch onPress={onPress}>
        <View style={styles.container}>
          <View style={passedStyle} {...otherProps} >
            {title && (
              <Text bold>
                {title}
              </Text>
            )}
            <View style={styles.content}>
              {childrenIsText
                ? <Text light>{children}</Text>
                : children
              }
            </View>
          </View>
          {onPress !== undefined &&
            <Icon name={'navigate-next'} color={Colors.primary} />
          }
        </View>
      </Touch>
    )
  }
}
