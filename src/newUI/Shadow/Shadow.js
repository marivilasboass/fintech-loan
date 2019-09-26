import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { BoxShadow } from 'react-native-shadow'

import Colors from '../Colors'

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.solitude
  }
})

export default class Shadow extends PureComponent {
    static defaultProps = {
      width: null,
      height: null,
      color: Colors.lightGray,
      border: 0,
      radius: 4,
      opacity: 0.9,
      x: 0,
      y: 2,
      layout: 'fixed'
    }

    constructor (props) {
      super(props)
      const { layout, width, height } = props

      this.state = {
        layoutWidth: layout === 'fill' || layout === 'fillWidth' || layout === 'auto' || layout === 'autoWidth' ? undefined : width,
        layoutHeight: layout === 'fill' || layout === 'fillHeight' || layout === 'auto' || layout === 'autoHeight' ? undefined : height
      }
    }

    handleLayout = (ev) => {
      this.setState({
        layoutWidth: ev.nativeEvent.layout.width,
        layoutHeight: ev.nativeEvent.layout.height
      })
    }

    render () {
      const { children, layout, width, height, radius, outerStyle, innerStyle, ...props } = this.props
      const { layoutWidth, layoutHeight } = this.state

      if (layout === 'fixed' && (!width || !height)) {
        throw new Error('Shadow with fixed layout expected height and width')
      }

      if (layout !== 'fixed' && (layoutWidth === undefined || layoutHeight === undefined)) {
        const params = { width, height }
        if (layout === 'fill') {
          params.width = params.height = '100%'
        } else if (layout === 'fillWidth') {
          if (width) {
            throw new Error('Shadow with fillWidth layout should not receive width')
          }
          params.width = '100%'
        } else if (layout === 'fillHeight') {
          if (height) {
            throw new Error('Shadow with fillHeight layout should not receive height')
          }
          params.height = '100%'
        } else if (layout === 'auto') {
          if (width || height) {
            throw new Error('Shadow with auto layout should not receive width and height')
          }
          params.width = null
          params.height = null
        } else if (layout === 'autoWidth') {
          if (width) {
            throw new Error('Shadow with autoWidth layout should not receive width')
          }
          params.width = null
        } else if (layout === 'autoHeight') {
          if (height) {
            throw new Error('Shadow with auto layout should not receive height')
          }
          params.height = null
        }
        return <View style={[outerStyle, params]} onLayout={this.handleLayout}>{children}</View>
      }

      return (
        <BoxShadow setting={{ ...props, width: layoutWidth, height: layoutHeight, radius, style: outerStyle }}>
          <View
            width={layout === 'auto' || layout === 'autoWidth' ? null : layoutWidth}
            height={layout === 'auto' || layout === 'autoHeight' ? null : layoutHeight}
            style={[styles.content, innerStyle, { borderRadius: radius }]}>
            {children}
          </View>
        </BoxShadow>
      )
    }
}
