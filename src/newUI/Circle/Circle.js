import React from 'react'
import { StyleSheet } from 'react-native'

import View from '../View'
import Shadow from '../Shadow'

const styles = StyleSheet.create({
  circleInnerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#e7e7e7',
    borderWidth: 1
  }
})

export default class Circle extends React.PureComponent {
  static defaultProps = {
    Component: View
  }

  render () {
    const { Component, size, children, activeColor, hasShadow, activeStyle, ...props } = this.props
    return (
      <Component {...props}>
        <Shadow
          width={size} height={size} radius={size / 2} y={0} x={0}
          layout='circle' innerStyle={[styles.circleInnerStyle, activeStyle]}
          opacity={hasShadow ? 1 : 0}
        >
          {children}
        </Shadow>
      </Component>
    )
  }
}
