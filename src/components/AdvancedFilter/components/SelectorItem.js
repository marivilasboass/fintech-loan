import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Shadow } from '~/newUI'

const styles = StyleSheet.create({
  circleInnerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#e7e7e7',
    borderWidth: 1
  }
})

export default class SelectorItem extends React.PureComponent {
  static defaultProps = {
    Component: View
  }

  render () {
    const { Component, size, children, activeColor, hasShadow, activeStyle, radius, shape, ...props } = this.props
    const radiusValue = shape === 'circle' ? size / 2 : radius || 1
    return (
      <Component {...props}>
        <Shadow
          width={size} height={size} radius={radiusValue} y={0} x={0}
          layout={shape} innerStyle={[styles.circleInnerStyle, activeStyle]}
          opacity={hasShadow ? 1 : 0}
        >
          {children}
        </Shadow>
      </Component>
    )
  }
}
